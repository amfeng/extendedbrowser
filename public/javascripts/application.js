var globalUserName = null;


var Desktop = {
  userName: null,
  userId: -1,
  container: null,
  sampleInterval: 50, // ms
  windows: {},
  desktop: {
    width: -1,
    height: -1
  },
  killed: false,
  die: function () {
    this.killed = true;
  },
  init: function (userId, userName) {
    var self = this;
    
    this.userId = userId;
    this.userName = userName;
    this.container = $("#desktop");
    
    this.updateDesktopSize();
    
    this.load();
    
    var sample = function () {
      if (!self.killed) {
        setTimeout(function () {
          self.update(sample);
        }, self.sampleInterval);
      }
    };
    sample();
    
    $(window).resize(function () {
      self.updateDesktopSize();
    });
  },
  load: function () {
    var self = this;
    $.post("/ajax", {
      id: self.userId,
      width: self.desktop.width,
      height: self.desktop.height
    }, function (data) {
      self.handleWindowData(data.windows);
    }, "json");
  },
  update: (function () {
    // Used to optimize processing requests.
    var lastResponse = null;
    
    return function (callback) {
      var self = this;
    
      var windowsList = [];
      for (var id in self.windows) {
        if (self.windows.hasOwnProperty(id)) {
          var windowData = self.windows[id];
          if (windowData.new || windowData.changed) {
            windowsList.push(self.windows[id]);
          }
        }
      }
      
      $.post("/ajax", {
        id: this.userId,
        width: this.desktop.width,
        height: this.desktop.height,
        windows: windowsList
      }, function (data) {
        if (!lastResponse || data != lastResponse) {
          data = jQuery.parseJSON(data);
          if (data && data.windows) {
            $(data.windows).each(function () {
              var windowData = self.windows[this.id];
              if (windowData) {
                windowData.changed = false;
              }
            });
            self.handleWindowData(data.windows);
          }
        }
        callback();
      }, "text");
    };
  })(),
  handleWindowData: function (windows) {
    var self = this;
    $(windows).each(function (i) {
      if (self.windows[this.id]) {
        self.updateWindow(this);
      } else {
        self.createWindow(this);
      }
    });
  },
  updateWindow: function (data) {
    var windowData = this.windows[data.id];
    if (!windowData.new && !windowData.changing) {
      var el = $("#window-" + data.id);
      el.css({
        top: data.top + "px",
        left: data.left + "px",
        width: data.width + "px",
        height: data.height + "px"
      });
      if (windowData.html != data.html) {
        $(".content", el).html(data.html);
      }
      $.extend(windowData, data);
    }
  },
  createWindow: function (data) {
    var self = this;
    
    self.windows[data.id] = data;
    if (!data.changed) {
      data.changed = false;
    }
    
    var el = $("<div/>", {
      id: "window-" + data.id,
      className: "window",
      css: {
        top: data.top + "px",
        left: data.left + "px",
        width: data.width + "px",
        height: data.height + "px"
      }
    });
    var bg = $("<div/>", {
      className: "background"
    }).appendTo(el);
    var content = $("<div/>", {
      className: "content",
      html: data.html
    }).appendTo(el);
    el.appendTo(this.container);
    
    el.draggable({
      start: function (event, ui) {
        data.changing = true;
      },
      drag: function (event, ui) {
        var el = $(this);
      
        data.top = parseInt(el.css("top"), 10); // ui.position.top;
        data.left = parseInt(el.css("left"), 10); // ui.position.left;
        data.changed = true;
      },
      stop: function (event, ui) {
        var el = $(this);
      
        data.top = parseInt(el.css("top"), 10); // ui.position.top;
        data.left = parseInt(el.css("left"), 10); // ui.position.left;
        data.changed = true;
        data.changing = false;
      }
    });
  },
  updateDesktopSize: function () {
    this.container.css({
      height: $("#everything").height() - 81 + "px"
    });
    
    this.desktop.width = this.container.width();
    this.desktop.height = this.container.height();
  },
  requestWindow: function (callback) {
    $.post("/ajax/new", {
      id: this.userId,
    }, function (data) {
      callback(data);
    }, "json");
  }
  
};

$(window).load(function () {
  var configDomEl = $("#desktop");
  var id = configDomEl.attr("data-user-id");
  var name = configDomEl.attr("data-user-name");
  Desktop.init(id, name);
  
  //TOOLTIP
	var style = 'easeOutExpo';
	var default_left = Math.round($('#menu li.selected').offset().left - $('#menu').offset().left);
	var default_top = $('#menu li.selected').height();

	//Set the default position and text for the tooltips
	$('#box').css({left: default_left, top: default_top});
	$('#box .head').html($('#menu li.selected').find('img').attr('alt'));				

	//if mouseover the menu item
	$('#menu li').hover(function () {
		
		left = Math.round($(this).offset().left - $('#menu').offset().left);

		//Set it to current item position and text
		$('#box .head').html($(this).find('img').attr('alt'));
		$('#box').stop(false, true).animate({left: left},{duration:500, easing: style});	


	//if user click on the menu
	}).click(function () {
		
		//reset the selected item
		$('#menu li').removeClass('selected');	
		
		//select the current item
		$(this).addClass('selected');

	});

	//If the mouse leave the menu, reset the floating bar to the selected item
	$('#menu').mouseleave(function () {

		default_left = Math.round($('#menu li.selected').offset().left - $('#menu').offset().left);

		//Set it back to default position and text
		$('#box .head').html($('#menu li.selected').find('img').attr('alt'));				
		$('#box').stop(false, true).animate({left: default_left},{duration:1500, easing: style});	
		
	});
	
	//Draggable, Droppable
	$(".icon_wrapper").css({
	  opacity: 0
	}).draggable({
	  start: function (event, ui) {
	    $(this).css({
	      opacity: 0.5
	    });
	  },
	  stop: function (event, ui) {
	    $(this).css({
	      opacity: 0,
		    top: "0px",
		    left: "0px"
	    });
	  }
	});
	$("#desktop").droppable({
			drop: function(event, ui) {
			  var draggedIcon = $(event.originalTarget).closest(".icon_wrapper");
			  if (draggedIcon.size() > 0) {
			    // An "add" icon was dropped onto the desktop.
			    var populateWindow;
			    switch (draggedIcon.attr("id")) {
			    case "add_div":
			      populateWindow = function (data) {
			        data.width = 300;
			        data.height = 200;
			        data.html = "";
			        
			        Desktop.createWindow(data);
			      };
			      break;
			    case "add_doc":
			      populateWindow = function (data) {
			        
			        Desktop.createWindow(data);
			      };
			      break;
			    case "add_image":
			      populateWindow = function (data) {
			        data.width = 400;
			        data.height = 200;
			        data.html = '<form action="/pictures" enctype="multipart/form-data" method="post" target="upload-iframe">'
                        + '<label for="uploaded_data">Upload Picture:</label><br />'
                        + '<input name="window_id" type="hidden" value="' + data.id + '"/><br />'
                        + '<input name="picture[uploaded_data]" type="file" size="30"/><br />'
                        + '<input type="submit" value="Upload" />'
                        + '<input type="button" value="Cancel" />';
			        
			        Desktop.createWindow(data);
			      };
			      break;
			    case "add_web":
			      populateWindow = function (data) {
			        data.width = 550;
			        data.height = 375;
			        
			        var content = $("<div/>");
			        $("<input/>", {
			          type: "text",
			          value: ""
			        }).appendTo(content);
			        $("<input/>", {
			          type: "submit",
			          value: "Go",
			        }).appendTo(content);
			        $("<iframe/>", {
			          src: "http://www.google.com/",
			          width: 500,
			          height: 300
			        }).appendTo(content);
			        data.html = content.html();
			        
			        Desktop.createWindow(data);
			      };
			      break;
			    }
          Desktop.requestWindow(function (data) {
		        data.top = Math.round(ui.offset.top) - 200;
		        data.left = Math.round(ui.offset.left);
            data.changed = true;
            data.changing = false;
            data.new = true;
            populateWindow(data);
          });
        }
			}
	});
	
	$("#box").css('opacity', 0.0);
	$("#icons").hover(function(){ $("#box").css('opacity', 1.0); }, function(){ $("#box").css('opacity', 0.0); });
});
