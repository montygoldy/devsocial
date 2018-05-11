# Dev Connector

MERN stack application for small social network with authentication, profiles, dashboard, posts.

Create a developer profile/portfolio, share posts and get help from other developers

## Main Technologies

### Client Side

* [x] **[React](https://github.com/facebook/react)**
* [x] **[Redux](https://github.com/reactjs/redux)**
* [x] **[Twitter Bootstap 4](https://github.com/twbs/bootstrap/tree/v4-dev)**
* [x] **[React-Router](https://github.com/ReactTraining/react-router)**

### Server Side

* [x] **[Node.js / Express](https://github.com/expressjs/express)**
* [x] **[MongoDB](https://github.com/mongodb/mongo)**
* [x] **[JWT](https://github.com/auth0/node-jsonwebtoken)**
* [x] **[Passport](http://www.passportjs.org/)**

### Setup

```bash
$ git clone https://github.com/user1990/devconnector-react-app.git
```

Go to project direction

Install dependencies

```bash
$ npm i
$ npm run client-install
```

Create server/config/keys_dev.js file

Add your MongoDb URL & JWT secret

```bash
export default {
  MONGO_URI: 'YOUR_MONGODB_URL',
  JWT_SECRET: 'SOME_RANDOM_STRING',
};
```

For Github profile add client/config/keys.js file

```bash
export default {
  githubClientId: 'YOUR_GITHUB_CLIENT_ID',
  githubClientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
};
```

Run app

```bash
$ npm run dev
```
