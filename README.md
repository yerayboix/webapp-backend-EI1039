# webapp-backend

This is the repository of the backend development with Node.js for the webapp project from the subjects EI1039 and EI1048 at Jaume I University.

## Local Setup

To run the project locally:

1. Install [Node v18.12.1 LTS](https://nodejs.org/en/) if you don't have it already.

1. Check your npm version with the following command:

   ```
   $ npm -v
   ```

   If your version is prior to v8.19.2 then you must update to the proper version with the following command:

   ```
   $ npm i npm@8.19.2
   ```

1. Clone this repository by running the following command and navigate to the cloned repository directory:

   ```
   $ git clone https://github.com/Team-EI1039EI1048-202223/webapp-backend.git
   ```

1. If you are a reviewer (a.k.a Miguel Matey - @matey97) you must checkout to the latest iteration, which is located at the branch named 'hito-entrega02'. Please run the following command to checkout this branch:

   ```
   $ git checkout hito-entrega02
   ```

1. Run the following command to install all the project dependencies with the Node-Package-Manager (npm):

   ```
   $ npm ci
   ```

1. Run the tests with Jasmine with the following command:

   ```
   $ npx jasmine
   ```

   You can also use the scripts configured at the package.json file. To run the Jasmine tests (tests are name inside Jasmine terminology as 'spec') run the following node script command:

   ```
   $ npm run test
   ```

   Both versions of the command are equivalent to each other.

1. Create a local file named ".env" with all the environment variables used in the project. Add the following code inside the file:

   ```
   REACT_APP_FIREBASE_API_KEY = AIzaSyBUgmYxNNlBjTW5G8Pv30NbVGK9NtpUSb4
   REACT_APP_FIREBASE_AUTH_DOMAIN = webapp-ei1039-48-2022-23.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID = webapp-ei1039-48-2022-23
   REACT_APP_FIREBASE_STORAGE_BUCKET = webapp-ei1039-48-2022-23.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 186487167397
   REACT_APP_FIREBASE_APP_ID = 1:186487167397:web:afa61abd9e66350473704c
   REACT_APP_FIREBASE_MEASUREMENT_ID = G-CH0Z2ZCDCK
   ```

1. Start the backend server with the following command:

   ```
   $ node app
   ```

   You can also start the backend server with the nodemon package (restarts the server every time a file is modified) with the following node script command:

   ```
   $ npm run dev
   ```

## External packages used in the project

- [Jasmine](https://jasmine.github.io/index.html). It is the framework for testing JavaScript code.

- [Nodemon](https://nodemon.io/). It is a utility that will monitor for any changes in the source code and automatically restart the server. Perfect for development.

- [Express](https://expressjs.com/). It is a minimalist web framework that provides a robust set of features for web and mobile applications, like the hability to create a robust API quick and easy.
