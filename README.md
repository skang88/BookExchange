# Book Exchange Project

This project is a platform that allows students to exchange, buy, and sell their books freely. Students can use their email account to sign up, search for books they want, contact the book owner, and exchange or buy books. When students want to exchange or sell a book for another book, students can post their book and make the post visible to other students. After the transaction is completed, students can change it to transaction completed status so that it is no longer displayed in search results. This platform was designed with Node.js as the backend, React as the front end, and MongoDB as the database. A JWT token is used for user authentication, and the token is issued upon login. Login status is maintained with the token without a login procedure unless the token expires, or a separate logout is performed. If students no longer wish to use a token, they can log out and delete the stored token. You can refer to the GitHub documentation for the code and details of this project.
Keywords: Book exchange, Node.js, React, MongoDB

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
sudo systemctl restart BookExchangeFrontend.service
sudo systemctl status BookExchangeFrontend.service

```
sudo systemctl start BookExchangeFrontend.service
sudo systemctl status BookExchangeFrontend.service
```

/usr/local/bin/serve
