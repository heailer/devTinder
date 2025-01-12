import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<LogIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
