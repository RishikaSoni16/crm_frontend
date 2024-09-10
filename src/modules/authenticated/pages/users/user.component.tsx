import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutePath from "../../../../core/constants/routes.constants";
import Createuser from "./create-user/createuser.component";
import Listuser from "./user-list/user-list.component";

const UserWrapperComponent: React.FC = () => {
  return (
    <div className="user-layout">
     <Routes>
        <Route path={RoutePath.DEFAULT} element={<Navigate to={RoutePath.AUTHENTICATED_USER_LIST} />} />
        <Route path={RoutePath.AUTHENTICATED_USER_LIST} element={<Listuser />}></Route>
      </Routes>
    </div>
  );
};

export default UserWrapperComponent;
