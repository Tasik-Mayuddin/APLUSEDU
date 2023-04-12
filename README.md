# APLUSEDU - Find Tutors for Your Child
APlusEdu is a web application built on Django that helps parents find the right tutor for their child. It is like Tinder, but instead of matching based on interests, location, age, etc, it presents parents with a list of tutors based on subjects, levels, and availability.

## Table of contents
* [How it Works](#how-it-works)
* [Features](#features)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Django ORM Architecture](#django-orm-architecture)
* [Conclusion](#conclusion)

## How it Works
APlusEdu matches tutors with parents based on the tutor's availability and the child's needs. A tutor can teach a variety of subjects and levels, while a parent has one or more children who need help with specific subjects at a certain level.
![Tutor (Facebook Cover)](https://user-images.githubusercontent.com/88143539/231545411-348c867d-c5f0-4e0f-b601-772874f2fd77.png)
For example, Tutor John can teach maths for primary 1, primary 2, and primary 3, and science for primary 3, primary 4, and primary 6. On the other hand, Billy is in primary 3 and needs help with maths and science. APlusEdu matches Billy with tutors capable of teaching his needs (Tutor John is one of them). Billy's parent can check the tutor's availability and request a booking. Please view [usage screenshots](#usage) below to visualize this easily :)

## Features
- Tutor registration and profile creation
- Parent registration and child addition
- Matching of tutors with parents based on subject, level, and availability
- Chat feature between tutors and parents for discussion and details
- Acceptance and decline of request by the tutor
- Confirmed timeslots for the tutor
## Usage
### Tutors
As a tutor, you can register on APlusEdu, create a profile, and set your subjects and levels taught. You can also set your availability for each subject you teach. Parents can then send you requests, and you can chat with them to discuss details like payment and zoom links. You can accept or decline a request based on your availability.

### Parents
As a parent, you can register on APlusEdu, add your child's details (name, level, and subjects they need help with). For each child, you will be presented with a list of tutors based on the matching criteria of subject and level compatibility with tutors. You will also see the tutor's profile summary and basic details provided by the tutor. You can check the availability of a tutor (it shows the parent the availability set by the tutor earlier, along with already booked timeslots) and submit a request for a certain time based on the tutor's availability.

## Technologies Used
- Django
- MySQL
- React 
- DRF (for APIs to communicate with frontend)
- WebSockets (for chat)
- Heroku (for hosting)
- AWS s3 (for media file hosting)

## Django ORM Architecture 
This is the solution using Django's built in ORM to set up the relations in its associated relational database (MySQL in this project), minimizing/eliminating redundant data. In the initial stages of this project, a lot of effort was dedicated into ensuring the following architecture would provide optimized speed of database queries.
<img src="https://user-images.githubusercontent.com/88143539/231529852-2d22a5d1-590c-44aa-9a51-52c23dc1f02d.png" width="750" height="750">



## Conclusion
APlusEdu is an efficient way for parents to find tutors for their children, and for tutors to find students. It provides a seamless experience for both parties by matching them based on subject, level, and availability. Thanks for checking out my project!
