class User < ActiveRecord::Base
  has_many :notgots
  
  def active?
    name if !name.blank? and updated_at > 90.seconds.ago
  end
  
  def windows
    windows = []
    Window.all.each do |w|
      u = w.user
      if u == self
        windows << {:id => w.id, :top => w.top, :left => w.left, :width => w.width, :height => w.height, :html => w.html}
      elsif u.userLeft == self
        left = self.width + w.left
        windows << {:id => w.id, :top => w.top, :left => left, :width => w.width, :height => w.height, :html => w.html}
      elsif u.userRight == self
        left = w.left - w.user.width
        windows << {:id => w.id, :top => w.top, :left => left, :width => w.width, :height => w.height, :html => w.html}
      end
    end
    windows
  end
  
  def userLeft
    User.find(self.toleft) rescue false
  end
  
  def userRight
    User.find(self.toright) rescue false
  end
  
end
