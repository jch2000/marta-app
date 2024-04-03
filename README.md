# CSC 4710: MARTA App
## How to run app  
- Install node.js and npm 

### How to run src 
- Install dependencies for Front-end 
    - cd into my-app and run these commands
        - Install express   :`$ npm install express`
        - Install cors      : `$ npm install cors`
        - install react-dom : `$ npm i react-router-dom`
        - Install axios     : `$ npm install axios`
        - Install mysql     : `$ npm install mysql`
        - Install mui       : `$ npm install @mui/material @emotion/react @emotion/styled`
- After installing dependinces run : `$ npm start` to open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### How to run server
- Open another terminal along side the my-app one
- cd into server folder
    - Install dependencies by running these commands 
        - Install express   :`$ npm install express`
        - Install cors      : `$ npm install cors`
        - Install mysql     : `$ npm install mysql`
- After installing dependinces run : `$ node index.js` to run server for sql database + axios calls 
