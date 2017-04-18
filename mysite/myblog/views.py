from django.shortcuts import render, redirect, get_object_or_404
from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction

from django.utils import timezone
# Decorator to use built-in authentication system
from django.contrib.auth.decorators import login_required

# Used to create and manually log in a user
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

from django.contrib.auth.views import password_reset, password_reset_confirm
from django.contrib.auth.forms import PasswordResetForm
#Helper function to guess a MIME type from a file name
from mimetypes import guess_type
from django.contrib.auth.tokens import default_token_generator


from myblog.models import *
from myblog.forms import *



@login_required
def home(request):
    messages = Message.objects.order_by('-pub_date')
    context = {
        'messages' : messages,
        'messageform' : MessageForm(),
        'myprofile' : Profile.objects.get(owner=request.user),
        'current_user' : request.user,
    }
    return render(request, 'myblog/home_page.html', context)
@login_required
@transaction.atomic
def edit_profile(request):
    profile_to_edit = get_object_or_404(Profile, owner=request.user)
    if request.method == 'GET':
        profileform = ProfileForm(instance=profile_to_edit)  # Creates form from the
        context = {'profileform' : profileform, }        # existing profile.
        return render(request, 'myblog/edit_my_profile.html', context)

    new_profile = ProfileForm(request.POST, request.FILES, instance=profile_to_edit)

    if not new_profile.is_valid():
        context = {'profileform' : new_profile,}
        return render(request, 'myblog/edit_my_profile.html', context)

    new_profile.save()
    return redirect(reverse('home'))
@login_required
def get_profile_photo(request):
    profile_get_photo = get_object_or_404(Profile, owner=request.user)
    if not profile_get_photo.picture:
        raise Http404
    content_type = guess_type(profile_get_photo.picture.name)
    return HttpResponse(profile_get_photo.picture, content_type=content_type)
@login_required
def get_message_photo(request, id):
    mes = Message.objects.get(id = id)
    if not mes.picture:
        raise Http404
    content_type = guess_type(mes.picture.name)
    return HttpResponse(mes.picture, content_type=content_type)

@login_required
@transaction.atomic
def post_new_massage_home(request):
    new_message = Message(user=request.user, pub_date=timezone.now(), profile=request.user.profile)
    messageform = MessageForm(request.POST,request.FILES, instance=new_message)

    if not messageform.is_valid():
        context = {'messageform' : messageform,
                   'messages' : Message.objects.order_by('-pub_date'),
                   'user_username_left' : request.user,
                   'user_first_name_left' : request.user.first_name,
                   'user_last_name_left':  request.user.last_name,
                   }
        return render(request,'myblog/home_page.html',context)
    messageform.save()

    return redirect(reverse('home'))

@transaction.atomic
def register(request):
    context = {}
    # Just display the registration form if this is a GET request
    if request.method == 'GET':
        context['registrationform'] = RegistrationForm()
        return render(request, 'myblog/register_page.html', context)
    registrationform = RegistrationForm(request.POST)
    context['registrationform'] = registrationform

    if not registrationform.is_valid():
        return render(request, 'myblog/register_page.html', context)

    new_user = User.objects.create_user(username=registrationform.cleaned_data['username'], \
                                        email=registrationform.cleaned_data['email1'], \
                                        password=registrationform.cleaned_data['password1'])
    new_user.is_active = True
    new_user.save()
    #create a blank profile
    new_profile = Profile(owner=new_user)
    new_profile.save()

    # Logs in & redirects
    new_user = authenticate(username=request.POST['username'], \
                            password=request.POST['password1'])
    login(request, new_user)
    return redirect('/myblog/')
