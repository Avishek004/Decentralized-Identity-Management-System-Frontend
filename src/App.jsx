import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Loader from "./components/common/Loader";
import PrivateRoute from "./components/common/Private-Route";

const LogIn = lazy(() => import("./pages/Log-In"));
const SignUp = lazy(() => import("./pages/Sign-Up"));
const UserInfo = lazy(() => import("./pages/User-Info"));
const LandingPage = lazy(() => import("./pages/Landing-Page"));
const EditUserInfo = lazy(() => import("./pages/Edit-User-Info"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="user-info" element={<UserInfo />} />
              <Route path="edit-user-info" element={<EditUserInfo />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
