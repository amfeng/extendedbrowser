class Window < ActiveRecord::Base 
  belongs_to :user
  
  validates_presence_of :user_id
  
  def generateNotGots(user)
    users = []
    userLeft = user.userLeft
    userRight = user.userRight
    (userLeft ? users << userLeft : nil)
    (userRight ? users << userRight : nil)
    users.each do |u|
      Notgot.create(:window_id => self.id, :user_id => u.id)
    end
  end
    
end
