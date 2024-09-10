import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import RoutePath from "../../../../core/constants/routes.constants";

const ComplaintWrapperComponent: React.FC = () => {
  return (
    <div className="user-layout">
     <Routes>
        <Route path={RoutePath.DEFAULT} element={<Navigate to={RoutePath.AUTHENTICATED_COMPLAINT_LIST} />} />
        {/* <Route path={RoutePath.AUTHENTICATED_COMPLAINT_LIST} element={<Createcomplaint />}></Route> */}
      </Routes>
    </div>
  );
};

export default ComplaintWrapperComponent;
