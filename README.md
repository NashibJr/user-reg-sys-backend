## RUNNING THE APPLICATION.

1. clone the application in any directory of your computer by running, git clone https://github.com/NashibJr/user-reg-sys-backend.git

2. change the directory of your computer to the application's directory
3. install the dependencies by running, npm install
4. open the application in vs code or any other text editor, create a .env file at the root of the app and then copy and paste these lines,
   DATABASE_URL = mongodb://127.0.0.1:27017/userRegSys
   JWT_SECRET = bnfsw32jhbnx@yu&nhh003ubhhsxxashghwj!9
5. start the application by running, npm run dev

## Libraries used.

1. bcrypt. This is a password hashing library for node.js
2. cookie-parser. This is a Parse HTTP request cookies. It is used to work with cookies in a nodejs app.
3. cors. This Cross-origin resource sharing (CORS) is a mechanism for integrating applications. CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.
4. dotenv. This is a dependency module used to run environment variables.
5. This is a nodejs frameword that provides robust features for nodejs application.
6. joi. Joi is a nodejs library that is used to validate form requests.
7. jsonwebtoken. This is used to generate random tokens for a particular payload.
8. mongoose. This provides a schema based solution to model the application's data.
9. nodemon. Nodemon is used to automatically run the nodejs application everytime a file is changed and saved.

## NB.

Please make sure the client app (frontend app) is on port 3000 i.e runs on http://localhost:3000 because it is the the one in the whitelist otherwise you'll have to ass the url in the whitelist, in the array of strings of the corsConfig object in the index.js file.
