# Food Explorer

## About

Food Explorer is a web application developed using technologies such as React.js on the [front-end](https://github.com/GabrielRiomar/backend_foodexplorer) and Node.js back-end that provides a browsing and food ordering experience for restaurant customers.

The administrator has access to create, edit, and delete dishes. New users need to register in order to use the services available on the platform.

## Technologies

- Nodejs
- bcryptjs
- cors
- dotenv
- express
- express-async-errors
- jest
- jsonwebtoken
- knex
- multer
- nodemon
- pm2
- sqlite
- sqlite3

## How to use

Clone o projeto para o local desejado em seu computador.

```bash
git clone https://github.com/GabrielRiomar/backend_foodexplorer.git
```

Execute

```bash
# Config the .env using the example
PORT =
AUTH_SECRET =

# Install dependencies
npm install

# And then start the developer env
npm run dev

```

[Food Explorer Deployed](https://food-explorer-grl.netlify.app/)

The server of this project has been hosted on Render, a free hosting service.
So it's important to point it out since being hosted on a free service, the back-end goes into a hibernation state after 15 minutes of inactivity. If a user tries to access the site and the back-end doesn't respond, it's necessary to wait for a moment as it will be "reinitializing" the services. This process can take up to 1 minute, depending on the server load on Render.

On the other hand, the front-end has been hosted on the Netlify platform, which allows hosting websites and web applications for free. For the front-end to work correctly, it's crucial that the back-end server is up and running and responding correctly. Otherwise, the front-end may display errors or unexpected behavior.
