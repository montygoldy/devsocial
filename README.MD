#Dev Connector
MERN stack application for small social network with authentication, profiles, dashboard, posts.

Create a developer profile/portfolio, share posts and get help from other developers

##Main Technologies
###Client Side
React
Redux
Twitter Bootstap 4
React-Router
Server Side
Node.js / Express
MongoDB
JWT
Passport
###Setup
$ git clone https://github.com/user1990/devconnector-react-app.git
Go to project direction

###Install dependencies

$ npm i
$ npm run client-install
Create server/config/keys_dev.js file

Add your MongoDb URL & JWT secret

export default {
MONGO_URI: 'YOUR_MONGODB_URL',
JWT_SECRET: 'SOME_RANDOM_STRING',
};
For Github profile add client/config/keys.js file

export default {
githubClientId: 'YOUR_GITHUB_CLIENT_ID',
githubClientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
};
Run app

$ npm run dev
