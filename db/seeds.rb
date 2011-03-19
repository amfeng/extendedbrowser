# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)

a = User.create
b = User.create
c = User.create

a.toright = 2
b.toleft = 1
b.toright = 3
c.toleft = 2

a.save
b.save
c.save
