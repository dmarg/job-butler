Job Butler
========
Fullstack Academy Capstone Project --
This is a tool for job seekers to optimize their job search process.
[jobbutler.me](http://jobbutler.me)

Overview
----
Job Butler helps to provide a platform for job seekers to optimize and simplify their job search process. A significant portion of the process often involves repetitive, but ultimately necessary tasks, and some of Job Butler's core functionalities take aim at two major unsolved problems: 1) inefficient aggregation and management of individual job applications, and 2) the repetitive nature of email correspondence from beginning to end of each application.


1. Tracking
  * Track your pursuits on a tracking system linked to Job Butler's web crawler. This feature will populate job details on your spreadsheet with a simple input of a job posting's URL from popular job search platforms like LinkedIn, StackOverflow, AngelList, Indeed, and Dice.

2. Templating
  * Reduce time spent on repetitive correspondence with your contacts by creating customizable templates. Further customize each template with our templating engine that will search through each template for user indicated text fields to be updated for each email. Once the text fields are updated, easily inject the updated template into your Gmail with a click of a button and find the email ready to go in your Drafts folder.

3. Sharing
  * Share your pursuits with mentors, peers, and other users with read-only access to your pursuits. This will enable your job search advocates to provide advice based on real-time, up-to-date statuses of each of your job pursuits.




Main Technologies Used
----
* Node.js
* AngularJS
* Express
* MongoDB
* Gmail API
* Request
* Cheerio


Screenshots
----


![Main Page](http://i.imgur.com/8dSuWzn.png)


![Job Listings](http://i.imgur.com/nlRuSHW.png)


![Templates](http://i.imgur.com/CAYzJ54.png)


![Add Pursuit](http://i.imgur.com/D7dbM3Z.png)


Challenges
----
* Creating a templating system to allow the user to fill out a form, replace template fields and inject that template into their gmail account drafts using the new Gmail API.
* Pre-populating the add pursuit form when a user inputs a link to a job posting with relevant job posting information in the correct fields.


Future improvements
----
* Continue to simplify the process of adding a pursuit by creating a Google Chrome extension.
* Integrating linkedin to find connections at companies your applying for.
* Make the crawler compatible with more job search platforms.
