from django.db import models
from django.utils import timezone
# User class for built-in authentication module
from django.contrib.auth.models import User

class Profile(models.Model):
    owner = models.OneToOneField(User)
    first_name = models.CharField(max_length=100, default="", blank=True)
    last_name = models.CharField(max_length=100, default="", blank=True)
    age = models.IntegerField(blank=True, null=True)
    short_bio = models.CharField(max_length=420, default="", blank=True)
    picture = models.ImageField(upload_to="myblog-user-profile-photos", blank=True)
    def __str__(self):
        return self.first_name + " " + self.last_name

    @staticmethod
    def get_profile(owner):
        return Profile.objects.filter(owner=owner)

class Message(models.Model):
    profile = models.ForeignKey(Profile, default="")
    user = models.ForeignKey(User)
    pub_date = models.DateTimeField(default=timezone.now())
    picture = models.ImageField(upload_to="myblog-user-message-photos")
    def __str__(self):
        return self.user + "message"

class Comment(models.Model):
    message = models.ForeignKey(Message, default="", on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=32)
    commenter = models.ForeignKey(User)
    comment_date = models.DateTimeField(default=timezone.now())
    def __str__(self):
        return self.comment_text
