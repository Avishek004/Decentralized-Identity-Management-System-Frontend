import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/common/Loader";
import SignUp from "./pages/Sign-Up";
import LogIn from "./pages/Log-In";

const LandingPage = lazy(() => import("./pages/Landing-Page"));

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
