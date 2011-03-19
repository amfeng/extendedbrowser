class WindowController < ApplicationController

  def index
    user_id = params[:id]
    height = params[:height] rescue false
    width = params[:width] rescue false
    windows = params[:windows] rescue false
      
    user = User.find(user_id) rescue false
    if user
      user.height = height
      user.width = width
      user.save
    end
    
    if windows and user
      windows.each_value do |w|
        window = Window.find(w[:id]) rescue false
        if window
          window.top = w[:top]
          window.left = w[:left]
          window.width = w[:width]
          window.height = w[:height]
          window.html = w[:html] unless w[:html].blank?
          window.user_id = user.id
          window.save
#          window.generateNotGots(user)
        end
      end
    end
    
    render :json => { :windows => (user ? user.windows : []) }
  end
  
  def new
    user_id = params[:id]
    w = Window.create(:user_id => user_id)
    render :json => { :id => w.id }
  end
  
end
