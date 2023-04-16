# APLUSEDU - Find Tutors for Your Child
APlusEdu is a web application built on Django that helps parents find the right tutor for their child. Think of it as a matching app between tutors and parents. It presents parents with a list of tutors based on subjects, levels, and availability. This project was inspired by real world experience in the business of connecting tutors to parents. Therefore, the role of client, product manager, and full stack developer was assumed for this project. Check it out: https://aplusedu-django-deploy.herokuapp.com/, it is recommended to follow the [Usage](#usage) section, as there is a slight learning curve.

## Table of contents
* [How it Works](#how-it-works)
* [Features](#features)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Django ORM Architecture](#django-orm-architecture)
* [Conclusion](#conclusion)

## How it Works
![Tutor (Facebook Cover) (1)](https://user-images.githubusercontent.com/88143539/232281505-5d678840-1469-47f7-bdf8-27d30d5026eb.png)

APlusEdu matches tutors with parents based on the tutor's availability and the child's subject needs. A tutor can teach a variety of subjects and levels, while a parent may have one or more children who need help with specific subjects at a certain level. It is unrealistic to have a single tutor cater to every requirement of a child, hence, a child may be paired with multiple tutors. (i.e. Little Billy may get a unique teacher for each of the 3 subjects he needs help with)

## Features
- Tutor registration and profile creation
- Parent registration and child addition
- Matching of tutors with parents based on subject, level, and availability
- Chat feature between tutors and parents for discussion and details
- Acceptance and decline of request by the tutor
- Confirmed timeslots for the tutor

## Usage
This section contains a series of screenshots that summarize the key features in this web application from both a tutor's and parent's perspective. If you're following along this section as a tutorial, you can start by registering for an account at: https://aplusedu-django-deploy.herokuapp.com/register/

### Tutors
For users registered as a tutor, these images will walk you through everything you need to know, from setting up your profile, setting your subjects and levels, availability, etc.
<br/><br/>
![1](https://user-images.githubusercontent.com/88143539/232249160-eae1f3e4-b35b-471d-bc3d-465dd212f4db.png)


![2](https://user-images.githubusercontent.com/88143539/232249165-aba1c1b6-5a7a-4bfa-83d8-ae910db2400c.png)


![3](https://user-images.githubusercontent.com/88143539/232249167-9b7d5bd2-2e01-416b-a800-fbce295749aa.png)


![4](https://user-images.githubusercontent.com/88143539/232249169-8442e80c-d583-4cc0-b421-a5b522e32ddc.png)

<br/><br/>
### Parents
For users registered as a parent, these images will walk you through everything you need to know, from adding in details of your children, finding a tutor, sending a request, etc.
<br/><br/>
![5](https://user-images.githubusercontent.com/88143539/232249219-655997ab-ab50-469f-a91b-ac8f7d7a5b6a.png)


![6](https://user-images.githubusercontent.com/88143539/232249223-6475f354-fd43-4a27-af95-10a81777fba8.png)


![7](https://user-images.githubusercontent.com/88143539/232249227-f84aa640-f3cc-4900-8080-52fe6be9b012.png)


![Click 'Add Availability' to add availability, its shows up green on the timetable](https://user-images.githubusercontent.com/88143539/232283750-0a9c07db-03bc-4722-87a0-7905f03b0ba2.png)


![9](https://user-images.githubusercontent.com/88143539/232249232-e12d7ec5-eb34-4edc-9c50-7090a3ddf078.png)

### Chat
![10](https://user-images.githubusercontent.com/88143539/232249233-2f7054f9-76cf-4dfa-93dd-6e66cb57e7a8.png)
The 'Chat with Parents/Tutors' tab is shares the same UI between the tutor's and parent's perspective. As shown in the image above, an automated message is sent from the parent to the tutor upon request of a tutor. Additionally, specific chats can be accessed conveniently from the yellow 'Chat With..' buttons found on the 'Allocations' tab (from tutor's UI), and the child's page (from parent's UI)

## Technologies Used
- Django (for backend)
- MySQL (for database)
- React (for frontend)
- Django REST Framework (for building APIs to communicate with frontend)
- WebSockets (for chat)
- Heroku (for deployment)
- Amazon AWS S3 (for media file hosting)

## Django ORM Architecture 
This is the solution using Django's built in ORM to set up the relations in its associated relational database (MySQL in this project), minimizing/eliminating redundant data. In the initial stages of this project, a lot of effort was dedicated into ensuring the following architecture would provide scalability and optimized speed of database queries.
<img src="https://user-images.githubusercontent.com/88143539/231529852-2d22a5d1-590c-44aa-9a51-52c23dc1f02d.png" width="750" height="750">



## Conclusion
APlusEdu is an efficient way for parents to find tutors for their children, and for tutors to find students. It provides a seamless experience for both parties by matching them based on subject, level, and availability. Thanks for checking out my project! Avaiable at: https://aplusedu-django-deploy.herokuapp.com/
