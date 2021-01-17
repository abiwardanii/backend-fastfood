# BACKEND

### Tools used to build this project
- Node.js v.14.15.0
- Express.js 
- PostgreSQL 13
- PgaAdmin 4
- Postman 
- JWT(JSON WEB TOKEN)
- Redis
- Multer
- Bcrypt(hash password)
- Cloudinary(optional)
- Winston(Log File)

### Modules
- [Morgan](https://www.npmjs.com/package/morgan)
- [Body-parse](https://www.npmjs.com/package/body-parser)
- [Node-postgre](https://node-postgres.com/)
- [ESLint](https://eslint.org/docs/user-guide/getting-started)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Redis](https://www.npmjs.com/package/redis)
- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [Winston](https://www.npmjs.com/package/winston)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### What is this project for?
This project is made to create a web API that can send requests with the get, post, put, del request method to postman processed with PostgreSQL

## Installation
- [node.js](https://nodejs.org/en/download/)
- [express.js](https://expressjs.com/en/starter/installing.html)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PgAdmin](https://www.pgadmin.org/download/)
- [Postman](https://www.postman.com/downloads/)

## PostgreSQL Tutorial
> :point_right: read this! [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

## Configuration ESLint
1. `npm install eslint --save-dev`
2. `node_modules\eslint\bin\eslint.js --init`
### Other Notes for ESList
>  `npm install -g eslint`

## Configuration for Winston
### The completed winston configuration file in winston.js

```
var appRoot = require('app-root-path');
var winston = require('winston');

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

// create a stream object with a 'write' function that will be used by morgan
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
```

### Configuration in your app.js
`app.use(morgan('combined', { stream: winston.stream }));`
