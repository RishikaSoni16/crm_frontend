import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutePath from "../../../../core/constants/routes.constants";
import Listcustomer from "./customer-list/customer-list.component";



const CustomerWrapperComponent: React.FC = () => {
  return (
    <div className="user-layout">
     <Routes>
        <Route path={RoutePath.DEFAULT} element={<Navigate to={RoutePath.AUTHENTICATED_CUSTOMER_LIST} />} />
        <Route path={RoutePath.AUTHENTICATED_USER_LIST} element={<Listcustomer />}></Route>
      </Routes>
    </div>
  );
};

export default CustomerWrapperComponent;
