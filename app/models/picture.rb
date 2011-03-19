class Picture < ActiveRecord::Base

  has_attachment  :storage => :file_system,
                  :path_prefix => 'public/images/pictures/',
                  :content_type => :image,
                  :max_size => 20.megabytes

                  validates_as_attachment

end
