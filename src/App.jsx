import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      {/* all the routing will work relative to this path of basename='/' */}
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* if we go to '/login' path directly we won't be able to see login component
           coz inside body comp. login comp. will render, we have to give space to render children   */}
              {/* parent render these children in an outlet, we need to give an outlet where these children's can render */}
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
