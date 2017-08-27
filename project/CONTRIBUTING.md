## Technology Stack
* Grails back-end
* React + Redux front-end
* Jest for testing
* SASS preprocessing
* Webpack for module bundling, minification and optimisation
* Babel transpilation

## How to Run From Source

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/)
2. Install [Grails 3](https://grails.org/download.html)
3. Install [Git](https://git-scm.com/downloads) and clone the repository
4. From the project root directory run the command: ```cd client && npm install```

### Front-end Development Worklow
1. Make sure you are in the client directory
2. run ```npm run dev``` to start the webpack dev server
3. navigate to http://localhost:8081/
4. make a change and save

### Back-end Development Workflow
1. From the client directory run ```npm run build```
3. From the root directory run ```grails run-app```
3. navigate to http://localhost:8080/
4. make a change and save
