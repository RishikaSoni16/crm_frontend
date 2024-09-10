import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/login.component";
import ForgotPage from "./pages/forgot-password/forgot.component";
import Signup from "./pages/register/register.component";
import RoutePath from "../../core/constants/routes.constants";

const Auth: React.FC = () => {

  return (
    <div className="auth-layout">
      <Routes>
        <Route path={RoutePath.DEFAULT} element={<Navigate to={RoutePath.AUTH_LOGIN} />} />
        <Route path={RoutePath.AUTH_LOGIN} element={<LoginPage />}></Route>
        <Route path={RoutePath.AUTH_SIGNUP} element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default Auth;
