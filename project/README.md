## How to Run From Source

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/)
2. Install Yarn: ```npm install -g yarn```
3. Install [Grails 3](https://grails.org/download.html)
4. Install [Git](https://git-scm.com/downloads) and clone the repository
5. Install [MySQL](https://dev.mysql.com/downloads/mysql/) and create a database called ```calendar``` running on localhost:3306 with username ```root``` and password ```1234```
6. Connect to the calendar database: ```mysql --user=root --password calendar```
7. From the project root directory, run the command: ```source initialise.sql```
8. From the project client directory, run the command: ```yarn install```

### Development Workflow
1. From the server directory run ```grails run-app```
2. From the client directory run ```npm start```
3. Navigate to http://localhost:3000/
4. Make a change and save

#### Notes
* After you make a change inside the client folder and save, webpack dev server will automatically reload the page with your changes
* After you make a change in the server folder, you may need to manually stop the Grails server and run ```grails run-app``` again. At least on Windows. Fix pending.
* The Grails server runs on port 8080

### Git Workflow
* Do not make commits directly to the develop or master branches. Instead create your own branch from develop, for whatever feature you are currently on, and then once you have finished, merge with develop
* It is advised that you do not share branches with other developers