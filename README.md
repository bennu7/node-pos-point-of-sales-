# Application for POS (Point Of Sales)

###  Introduction
This is a program POS can help using for restaurant, coffee shop, etc. This program can help you to manage your business. 

### Documentation
`https://documenter.getpostman.com/view/25296096/2s93eZyrgX` <br>
or import file `POS.postman_collection.json` to postman in folder documentation

###  Technology
- NodeJS
- ExpressJS
- PostgreSQL
- Sequelize
- JWT

###  Features
- [x] Authentication
> - [x] Login (Admin or Cashier)
> - [x] Logout
> - [x] Refresh token
- [x] Manage user (Admin)
- [x] Manage product (Admin)
- [x] Manage payment (Admin)
- [x] Manage category (Admin)
- [x] Manage order (Admin or Cashier)
- [x] Manage order product (Admin or Cashier)

###  How to install & run
IMPORTANT! before install dependencies or packages copy file .env.example to .env and change the value of the variable to suit your needs
1. Clone this repository
2. Install dependencies and packages `npm install`
3. Running data dummy `npm run starter`


© https://github.com/bennu7/node-pos-point-of-sales