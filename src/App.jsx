import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      {/* all the routing will work relative to this path of basename='/' */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* if we go to '/login' path directly we won't be able to see login component
           coz inside body comp. login comp. will render, we have to give space to render children   */}
            {/* parent render these children in an outlet, we need to give an outlet where these children's can render */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
