class DesktopController < ApplicationController
  def index
    @user = User.find(params[:id])
    unless @user.active?
      flash[:error] = "You must provide a name!"
      redirect_to root_path
    end if false
  end

end
