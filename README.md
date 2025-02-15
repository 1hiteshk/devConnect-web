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