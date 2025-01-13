import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<LogIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
