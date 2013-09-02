# Resume management system (RMS)

## RESTful route and features

```
/login                                GET           login page
/login                                POST          handle login request
/logout                               POST          handle logout request
/sign_up                              GET           sign_up page
/sign_up                              POST          handle sign_up request
/password                             GET           password-changing page
/password                             POST          handle password-changing request
/resumes                              GET           resume list page
/resumes/new                          GET           resume creation page
/resumes/new                          POST          save new resume
/resumes/:id                          GET           view resume by id
/resumes/:id                          DELETE        delete a resume
/resumes/:id                          POST          edit resume base information
/resumes/:resume_id/projects/new      POST          handle adding new project
/resumes/:resume_id/projects/:id      POST          handle project editting
/resumes/:resume_id/projects/:id      DELETE        handle deleting project record
/resumes/:resume_id/education/new     POST          handle adding new education record
/resumes/:resume_id/education/:id     POST          handle education record editting
/resumes/:resume_id/education/:id     DELETE        handle deleting education record
```


## User history

- If user has not signed in, go to login page
- User can logout after login
- When user login successfully, show user's resume list
- Click "Add resume" to go to resume creation page
- User can delete resume by id
- Click every resume link, user can view resume detail
- In the resume detail page, user can edit resume, include editing base info, adding and editing education record (or project).


## Models


### user

```
id              int             not null   pk  auto_increment
email           varchar(255)    not null   unique
password        varchar(255)    not null                        (hash ?)
name            varchar(255)    not null
```


### resume

```
id              int             not null   pk  auto_increment
name            varchar(255)    not null
email           varchar(255)    null
age             int             null
gender          varchar(255)    null
address         varchar(255)    null
user_id         int                        fk
```


### education

```
id              int             not null   pk  auto_increment
range           varchar(255)    null
school          varchar(255)    null
major           varchar(255)    null
resume_id       int                        fk
```


### project

```
id              int             not null   pk  auto_increment
range           varchar(255)    null
company         varchar(255)    null
description     varchar(255)    null
resume_id       int                        fk
```


## Skills

- [Nodejs](http://nodejs.org/)
- [Express](http://expressjs.com/)
- Jade: [http://jade-lang.com/](http://jade-lang.com/) or [https://github.com/visionmedia/jade](https://github.com/visionmedia/jade)
- Less: [http://www.lesscss.net/article/home.html](http://www.lesscss.net/article/home.html) or [http://lesscss.org/](http://lesscss.org/)
- [passport](https://github.com/jaredhanson/passport)
- [password-hash](https://github.com/davidwood/node-password-hash)
