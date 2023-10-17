# Book Exchange

This project is for the middleware programming class in the fall semester of 2023. This application allows students to exchange their books with other students.



## OCI setup

The application will be deployed on Oracle Cloud Infrastructure, and updates and deployment will be done using GitHub and Jenkins as a project pipeline.

OCI firewall settings
```
sudo firewall-cmd --add-port=4000/tcp
```

OCI service registration
```
sudo nano /etc/systemd/system/bookexchange.service
```

OCI service Start 
```
sudo systemctl start bookexchange.service
```

OCI service restart 
```
sudo systemctl restart bookexchange.service
```

OCI service stop
```
sudo systemctl stop bookexchange.service
```

OCI service status check
```
sudo systemctl status bookexchange.service
```

### Environment Variable??
