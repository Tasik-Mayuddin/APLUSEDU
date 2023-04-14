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
As a tutor, you can register on APlusEdu, create a profile, and set your subjects and levels taught. You set your availability, then wait for parents to send you requests, and you can chat with them to discuss details like payment and zoom links. 

![1](https://user-images.githubusercontent.com/88143539/231831702-02cfd67e-73ae-4f4a-97d5-46ae8a1bd221.png)

![2](https://user-images.githubusercontent.com/88143539/231831725-8c3986a3-d058-49c8-a26e-f6a147e2cb32.png)

![3](https://user-images.githubusercontent.com/88143539/231831744-407512e2-c44b-4da7-8cdd-b574be307ea2.png)

![4](https://user-images.githubusercontent.com/88143539/231831759-c93c721b-f278-4375-86b9-9050ad86671f.png)

### Parents
As a parent, you can register on APlusEdu, add your child's d
etails (name, level, and subjects they need help with). For each child, you will be presented with a list of tutors based on the matching criteria of subject and level compatibility with tutors. You will also see the tutor's profile summary and basic details provided by the tutor. You can check the availability of a tutor (it shows the parent the availability set by the tutor earlier, along with already booked timeslots) and submit a request for a certain time based on the tutor's availability.

![5](https://user-images.githubusercontent.com/88143539/231831938-3110a7a2-6af1-4267-8adb-f2d2754be45a.png)

![6](https://user-images.githubusercontent.com/88143539/231831963-0d54a6e8-5cca-408b-88ea-b64d54ae9c74.png)

![7](https://user-images.githubusercontent.com/88143539/231831976-e6ef9d0e-836e-4154-8d63-ce2d23d1830b.png)

![8](https://user-images.githubusercontent.com/88143539/231831994-cc8df3d5-ad47-470b-bde0-551547743652.png)

![9](https://user-images.githubusercontent.com/88143539/231832001-9bb369d2-8496-402a-bbd7-b2dda7c78fa3.png)

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
