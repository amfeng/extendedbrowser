class WelcomeController < ApplicationController
  def index
    @users = User.all
  end

  def login
    @user = User.find(params[:commit])
    if @user
      active = @user.active?
      if active && params[:name] != active
        flash[:error] = "'#{active}' is already using this desktop."
        redirect_to :action => 'index'
      else
        @user.update_attribute(:name, params[:name])
        
        redirect_to :controller => 'desktop', :id => @user.id
      end
    end
  end

end
