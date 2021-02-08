# BACKEND FastFood

### Technology
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
- Sequelize ORM

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
- [Sequelize ORM](https://sequelize.org/master/)

### Install Project
```
git clone https://github.com/abiwardanii/Backend-FastFood-CI-CD-with-Jenkins.git 
cd backend-fastfood
npm install
```

### Run Project
```
npm start
```

### APIs Auth
 | Method | Endpoint | Description |
 | --- | --- | --- |
 | POST | /auth/ | Login |

### APIs Category 
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /category/commit| Create category table |
| GET | /category | List of category |
| GET | /category/:id | List of specific category |
| POST | /category | Create New category |
| PUT | /category | Update a category  |
| DELETE | /category/drop | Delete category table |
| DELETE | /category | Delete a category  |

### APIs History 
| GET | /history/commit| Create history table |
| GET | /history | List of history |
| GET | /history/:id | List of specific history |
| POST | /history | Create New history |
| PUT | /history | Update a history  |
| DELETE | /history/drop | Delete history table |
| DELETE | /history | Delete a history  |

### APIs Product 
| GET | /product/commit| Create product table |
| GET | /product | List of product |
| GET | /product/:id | List of specific product |
| POST | /product | Create New product |
| PUT | /product | Update a product  |
| DELETE | /product/drop | Delete product table |
| DELETE | /product | Delete a product  |

### APIs User 
| GET | /user/commit| Create user table |
| GET | /user | List of user |
| POST | /user | Create New user |
| PUT | /user | Update a user  |
| DELETE | /user/drop | Delete user table |
| DELETE | /user | Delete a user  |



