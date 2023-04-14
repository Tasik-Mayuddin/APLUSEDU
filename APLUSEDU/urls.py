"""APLUSEDU URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from register import views as rViews
from frontend.views import react
from main.models import Subject, Level, SubjectAndLevel

urlpatterns = []
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('', include('parent.urls')),
    path("chat/", include("chat.urls")),
    path('', include('django.contrib.auth.urls')),
    path('login/', rViews.login, name="login"),
    path('register/', rViews.register, name="register"),

    
    path('api/', include('api.urls')),

    # react

    re_path(r'^(?:.*)/?$', react)

]


    

# Create the subject and level models upon server deployment
def subjectsLevelsInit():
    subject_choices = ['Mathematics', 'English', 'Science', 'History', 'Accounting']
    level_choices = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Secondary 1', 'Secondary 2', 'Secondary 3', 'Secondary 4', 'Secondary 5']
    for subject in subject_choices:
        for level in level_choices:
            subject, _ = Subject.objects.get_or_create(name=subject)
            level, _ = Level.objects.get_or_create(name=level)
            SubjectAndLevel.objects.get_or_create(
                subject = subject,
                level = level,
            )
subjectsLevelsInit()
