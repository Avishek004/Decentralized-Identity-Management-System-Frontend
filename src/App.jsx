import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/common/Loader";

const LogIn = lazy(() => import("./pages/Log-In"));
const SignUp = lazy(() => import("./pages/Sign-Up"));
const UserInfo = lazy(() => import("./pages/User-Info"));
const LandingPage = lazy(() => import("./pages/Landing-Page"));
const EditUserInfo = lazy(() => import("./pages/Edit-User-Info"));

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/edit-user-info" element={<EditUserInfo />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
