class ApplicationController < ActionController::Base
  before_action :set_current_user

  def set_current_user
    if !cookies.signed[:uuid]
      cookies.signed[:uuid] = UUID.generate
    end
    @current_user = User.new(cookies.signed[:uuid])
  end
end
