class PicturesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    w_id = params[:window_id]
    @picture = Picture.new(params[:picture])
    if @picture.save
      html = '<img src="'+@picture.public_filename+'"/>'
      w = Window.find(w_id) rescue false
      newW = Window.create(:html => html, :top => w.top, :left => w.left, :height => w.height, :width => w.width, :user_id => w.user_id)
      w.destroy
      responds_to_parent do
        render :update do |page|
          page << "$('#window-#{params[:window_id]}').remove();"
        end
      end
    end
  end

end
