from django.conf.urls import include, url

import django.contrib.auth.views
import myblog.views
from django.conf import settings

##url dispatcher
urlpatterns = [
    url(r'^$', myblog.views.home, name='home'),
    url(r'^edit-profile', myblog.views.edit_profile, name='edit_profile'),
    url(r'^profile-photo', myblog.views.get_profile_photo, name='profile_photo'),
    url(r'^get_message_photo/(?P<id>\d+)$', myblog.views.get_message_photo, name='get_message_photo'),
    url(r'^post-new-massage-home', myblog.views.post_new_massage_home),
    url(r'^get-all-comments/(?P<id>\d+)$', myblog.views.get_all_comments),
    url(r'^add-comment/(?P<id>\d+)$', myblog.views.add_comment),
    url(r'^delete-my-message/(?P<id>\d+)$', myblog.views.delete_my_message, name='delete_my_message'),
    # Route for built-in authentication with our own custom login page
    url(r'^login$', django.contrib.auth.views.login, {'template_name':'myblog/log_in_page.html'}, name='login'),
    # Route to logout a user and send them back to the login page
    url(r'^logout$', django.contrib.auth.views.logout_then_login, name='logout'),
    url(r'^register$', myblog.views.register, name='register'),

]
