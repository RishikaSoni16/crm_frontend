import "./App.css";
import { Routes, Route, BrowserRouter as Router,Navigate } from "react-router-dom";
import Auth from "./modules/auth/auth.component";
import LoginPage from "./modules/auth/pages/login/login.component";
import Authenticated from "./modules/authenticated/authenticated.component";
import Signup from "./modules/auth/pages/register/register.component";
import Createuser from "./modules/authenticated/pages/users/create-user/createuser.component";
import RoutePath from "./core/constants/routes.constants";

const App: React.FC = () => {

  return (
    <div className="site-wrapper">
      <Router>
        <Routes>
          <Route path={RoutePath.DEFAULT} element={<Navigate to={RoutePath.AUTH} />} />
          <Route path={`${RoutePath.AUTH}/*`} element={<Auth />}></Route>
          <Route path={`${RoutePath.AUTHENTICATED}/*`} element={<Authenticated />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
