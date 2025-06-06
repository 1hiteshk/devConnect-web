import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import {
  AboutUs,
  ContactUs,
  PrivacyPolicy,
  RefundPolicy,
  ShippingPolicy,
  TermsAndConditions,
} from "./components/Pages";

function App() {
  return (
    <>
      {/* all the routing will work relative to this path of basename='/' */}
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* if we go to '/login' path directly we won't be able to see login component
           coz inside body comp. login comp. will render, we have to give space to render children   */}
            {/* parent render these children in an outlet, we need to give an outlet where these children's can render */}
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
