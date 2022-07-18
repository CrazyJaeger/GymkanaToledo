# Project log ***Gymkana Toledo***

## Summary
This project is a small and simple web application that uses HTML, JS and CSS that aims to allow a *Gymkana* to take place in the city of Toledo. This was an "express" project, created in a short amount of time (an aproximate amount of 16MH).

## Context
This project's idea was actually a product of my friend Kaelamoran, who was part-taking in an internship as a high school teacher at the time. The class she was working in was going to carry out an excursion to the historical spanish city of Toledo. She had announced that she was going to organize a *Gymkana* style activity for the class, in order to make the visit more fun for the students, giving them an excuse to explore the city at their own pace while carrying out a fun game. This *Gymkana* aimed to guide the students (separated into groups) towards different important buildings in the city using quizzes and puzzles. Once located the building or structure the quizz was referencing, the students had to take a picture of the location with themselves in it in order to prove they had reached the right location.

About a month before the event took place, she was informed that she was not going to be allowed to go to the trip, meaning it would be impossible for her to control the event on site. Apart from this, there was also the issue that it would be difficult to control such a group of people at once, without accidentally giving clues or making a group look for her, thus penalizing their response time. She then came up with the idea of asking me to create a small application to ease the *Gymkana* and allow it to be controlled in a semi-automatic manner, something that became even more important, considering that she wasn't going to be on site during the time it was taking place.

After talking about it, and discovering that *GitHub* allowed users to host small websites, I had the idea of creating a small web application to allow this activity to take place within the boundaries she set. The plan was to create a series of screens that would allow students to read the questions, upload a picture of the location, and allow a teacher to remotely validate the image.

## Project development
This project had a small planning phase with my friend Kaela, who explained her expectations. From this short pase, we identified the following screens:

* A screen for teachers and students to log in
* A screen for students to read the quizzes and upload answers
* A screen for teachers to validate answers
* A screen for a leaderboard showing the student's group classification

Shortly after this conversation, I started working on a crude prototype for this web application. This phase was very slow as I was working with technology that was new to me, in particular, *GitHub's* website publishing. I was also going through a very big transition in my work-life, so I couldn't spend as much time on this project as I would have liked. This situation only got worse when Kaela was informed that she was not going to be able to go to Toledo the day the *Gymkana* was taking place. She sent me the quizzes, clues and solutions during this time, so I could include them in the database whenever I had one.

I eneded up doing a "programming marathon", finishing most of the project in a single night about a weekend before the event took place. The final result is what we see here. There were multiple aspects that had to be changed in order to speed up the completion time of the project, specially in regards to accounts and security, due to the time limitation and the lack of time to explore other safer storage solutions.

I ended up deciding on using *Google Firebase* realtime-database, as it was faster in comparison to the latest bersion of the *Firebase* database, although also not as safe. When it came down to security, I ended up deciding to do the following:

* Instead of allowing the users to create an account, I created a series of predefined accounts for each group and another account for the teachers invigillating the event.
* The database, actually stored as a JSON object, would be accessible via the HTTP REST service calls offered by *Firebase*.
* Most of the security would be handled by the frontend, saving a user token in the browser's *session storage*.

When a user trues to access a screen, the frontend checks if the user has a token and asks them to log in if they don't. Once logged in, the token is saved in the *session storage* so the user can freely move from screen to screen. Student tokens grant access to the student-accessible screens and teacher tokens grant access to the teacher-accessible screens. The only publicly accessible screens would be the frontpage and the leaderboard (as well as the log in page, of course).

All screens were created within the specifications and, considering that the database was quite vulnerable as it was easily accessible through REST without many more firewalls, it was decided to save the images using *b64*, as to not be directly visible by just looking at the, and I promised to delete the images less than 24 hours after the completion of the event as these are considered to be personal data under the GPDR of the EU.

## Conceptual overview of the project
In this section, we discuss the conceptual target behind the different screens. This overview defines the motives and reasons behind the existance of each screen, drawing an abstraction from more technical aspects of said screens, which we will see later on in the following section. We'll go step by step through the screens in the order the user is expected to see them.

### Frontpage

### Login page

### Gymkana page

### Validation page

### Leaderboard page

## Technical overview of the project

## Project conclusion

## Lessons learned