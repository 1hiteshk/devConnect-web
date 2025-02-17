# Connect2Dev

- created react + vite app
- removed unnecessary code 
- Installation of tailwind css
- Install Daisy UI
- create separate components
- react router dom for routing , at root level
- children routes and outlet (nested routing and rendering children in Outlet)
- created an outlet in Body component
- created a footer
- created a login page
- install axios
- CORS install in backend => add cors middleware to app with configurations : origin , credentials: true
- whenever making an api call so pass axios => { withCredentials : true }
- so it will send back the token in other api calls
- installation of redux toolkit ( react-redux @reduxjs/toolkit )
- configureStore => provider => createSlice => add reducer to store 
- utilize redux devtools docs extension
- login and see if the data is coming properly in the store
- cant access other routes without login
- if token is not present redirect to login page 
- logout functionality 
- profile page
- get the feed api data and add feed in redux store
- user Card component on feed
- edit profile feature
- show toast message on save of profile 
- see all my connections on a page 
- New page to see all the connection requests
- feature : accept/reject connection request 

- send/ignore the user card from feed page 
- sign up for new user
- E2E testing

Body
  Navbar
  / => feed
  /login => login
  /connections => Connections
  /profile => Profile

# Real time chat using WebSocket (Socket.io)
  - Built UI for chat window on `/chat/:targetUserId`
  - set up socket.io on both client api and server api
  - for frontend : `npm i socket.io-client`

# Deployment
- Sign up on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i command
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

* aws machine :-
- sudo :	Runs the command as superuser (root) because copying to /var/www/html/ requires admin privileges.
- scp :	Secure Copy Protocol - Used to securely copy files between servers or directories.
- -r	: Recursive mode - Copies all files and subdirectories inside dist/.
- dist/*	: Selects all files and folders inside dist/. The * wildcard means "everything inside dist/".
- /var/www/html/	: The destination directory where files will be copied. This is the default web server directory for Nginx/Apache.

- sudo systemctl restart nginx  # Only if server config changed or caching issues occur
- sudo systemctl reload nginx   # Safer option to refresh settings without downtime

