class HomeController < ApplicationController
  def index
  end

  def admin
    @issue = Issue.fetch

    if ENV['ADMIN_KEY'] && params[:key] == ENV['ADMIN_KEY']
      @issue.q = params[:q] if params[:q]
      @issue.min = params[:min] if params[:min]
      @issue.max = params[:max] if params[:max]
      @issue.save
    end
  end
end
