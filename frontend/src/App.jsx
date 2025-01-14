import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editProfile" element={<EditProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;