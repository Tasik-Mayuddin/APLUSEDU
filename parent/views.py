from django.shortcuts import render

# Create your views here.

# Parent dashboard

def pDash(response):
    if response.user.account.user_role == "Parent":
        return render(response, 'parent/parent_dashboard.html')

# Parent's students

def pStud(response):
    if response.user.account.user_role == "Parent":
        







        return render(response, 'parent/parent_students.html')