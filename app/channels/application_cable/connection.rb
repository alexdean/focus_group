module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = User.from_uuid(cookies.signed[:uuid])
    end
  end
end
