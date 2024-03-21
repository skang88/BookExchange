# Book Exchange Project

This project is a platform that allows students to exchange, buy, and sell their books freely. Students can use their email account to sign up, search for books they want, contact the book owner, and exchange or buy books. When students want to exchange or sell a book for another book, students can post their book and make the post visible to other students. After the transaction is completed, students can change it to transaction completed status so that it is no longer displayed in search results. This platform was designed with Node.js as the backend, React as the front end, and MongoDB as the database. A JWT token is used for user authentication, and the token is issued upon login. Login status is maintained with the token without a login procedure unless the token expires, or a separate logout is performed. If students no longer wish to use a token, they can log out and delete the stored token. You can refer to the GitHub documentation for the code and details of this project.
Keywords: Book exchange, Node.js, React, MongoDB

## Overview of the Project
For this project, I named the domain Book Hub as a platform for ASU students to freely exchange their books, allowing them to buy, sell, and exchange. Students who sign up for this platform can view lists of books posted by other students and negotiate the prices they set for the books they want.

## Problem Statement

The problem is that it is difficult for students to freely exchange their books with other students. This can be cumbersome because students usually must send texts to their acquaintances or ask them what books they have. Therefore, there is a need for a platform where students can search, register, and exchange the books they want, and this is the motivation for starting this project.


## Scope and Limitations
The scope of this project includes registering and logging in to use the platform, authentication using JWT tokens, and registering, editing, and deleting books to exchange books. Limitations include strengthening login convenience and security using OAuth2.0, and not being able to use https using OpenSSL, which may leave security vulnerabilities.

# System Design

## Architecture Diagrams

<img width="452" alt="image" src="https://github.com/skang88/BookExchange/assets/142484222/d8c2bf08-726a-41d7-bc0a-46348cf498e7">


## Flowcharts

The following shows the basic book API and Login API. When registering or deleting a book, user identification is performed using a JWT token. After the user is identified, the owner of the book can be identified by parsing the username to see who registered the book. And JWT tokens are given when you sign up or log in.

Figure 1
Book API flowchart
<img width="452" alt="image" src="https://github.com/skang88/BookExchange/assets/142484222/b7a9ca3e-b0ba-4686-8aa1-7d4a01fa7104">


 
Figure 2 
Login API Flowchart
<img width="421" alt="image" src="https://github.com/skang88/BookExchange/assets/142484222/c3453de6-8f9a-4592-85f2-25874da0dfe7">

 

Figure 3. Basic App structure
	The basic structure of the app is designed with an MVC structure. When an HTTP request is received, a view page is displayed through the router, and when a specific API is requested, data is exchanged with the database according to the controller and then displayed as a view page again to process the request.
 <img width="452" alt="image" src="https://github.com/skang88/BookExchange/assets/142484222/72500735-9aee-46de-a39a-ec9579d73ead">



## How to run the project in the CLI command

This project is a platform to exchange books for students.

To start this application, two server is needed. 

The front end server in the client folder, run command 
```
npm start
```

and the back end server in the server folder, 
```
npm start
```

## Implement in Cloud Service

SSH OCI instance connection with SSHkey

```
ssh -i ~/.ssh/id_rsa username@IP_address
```


Service Status Check
```
systemctl status [servicename]
systemctl status BookExchangeBackend
systemctl status BookExchangeFrontend
```

If node.js version is not matched OCI Linux OS update
```
sudo yum update
```

OCI Linux version check
```
cat /etc/oracle-release
cat /etc/os-release
uname -r
```

Node js version upgrade
reference: https://yum.oracle.com/oracle-linux-nodejs.html
```
# list available node versions
sudo dnf module list --all nodejs

# swich to version 20
sudo dnf module enable nodejs:20
sudo dnf update nodejs

# npm install 
npm install
sudo npm install -g npm@10.2.4
```

Firewall setting
```
sudo firewall-cmd --add-port=4000/tcp
sudo firewall-cmd --add-port=3000/tcp
```

Run as background (service)
```
sudo nano /etc/systemd/system/BookExchangeBackend.service
```

/etc/systemd/system/BookExchangeBackend.service 
```
[Unit]

Description=This is my backend server for Book Exchange Platform in OCI

# Documentation=https://github.com/skang88/BookExchange
# After=network.target

[Service]

ExecStart=/usr/bin/node /home/opc/BookExchange/server/server.js
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

Backend Service Start
```
sudo systemctl start BookExchangeBackend.service
sudo systemctl status BookExchangeBackend.service

```

/etc/systemd/system/BookExchangeFrontend.service 

```
which serve
```
serve 는 /usr/local/bin 에 위치하고 있어 서비스가 시작되지 않는다. 따라서 ExecStart 폴더를 수정하였다. 

```
[Unit] 
Description=My Book Exchange App Front End Service After=network.target 

[Service] 
ExecStart=/usr/local/bin/serve -s build WorkingDirectory=/home/opc/BookExchange/client/ 

RestartSec=10
Restart=always

[Install] 
WantedBy=multi-user.target
```

```

Frontend Service Start Service
sudo systemctl daemon-reload
sudo systemctl stop BookExchangeFrontend.service
sudo systemctl restart BookExchangeFrontend.service
sudo systemctl status BookExchangeFrontend.service

```
sudo systemctl stop BookExchangeFrontend.service
sudo systemctl start BookExchangeFrontend.service
sudo systemctl status BookExchangeFrontend.service
```

/usr/local/bin/serve
