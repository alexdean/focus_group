class ApplicationController < ActionController::Base
  before_action :set_current_user

  def set_current_user
    if !cookies.signed[:uuid]
      cookies.signed[:uuid] = UUID.generate
    end

    @current_user = User.from_uuid(cookies.signed[:uuid])
  end
end
