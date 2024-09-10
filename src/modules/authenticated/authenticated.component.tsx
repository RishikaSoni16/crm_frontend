import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutePath from "../../core/constants/routes.constants";
import UserWrapperComponent from "./pages/users/user.component";
import CustomerWrapperComponent from "./pages/customer/customer.component";
import ComplaintWrapperComponent from "./pages/complaint/complaint.component";

import logo from "../../assets/img/LogoCRM.png";
import notification from "../../assets/img/notification.png";
import profile from "../../assets/img/profile.png";
import users from "../../assets/img/users.png";
import customers from "../../assets/img/customers.png";
import complaint from "../../assets/img/complaints.png";
import assign from "../../assets/img/assign.png";
import closure from "../../assets/img/closure.png";
import report from "../../assets/img/report.png";
import logout from "../../assets/img/logout.png";
import arrow from "../../assets/img/arrow.png"

const Authenticated: React.FC = () => {
  const [showComplaintOptions, setShowComplaintOptions] = useState(false);

  const toggleComplaintOptions = () => {
    setShowComplaintOptions(!showComplaintOptions);
  };

  const [showReportOptions, setShowReportOptions] = useState(false);

  const toggleReportOptions = () => {
    setShowReportOptions(!showReportOptions);
  };
  
  return (
    <div className="auth-layout h-screen overflow-hidden">
      <div className="flex items-center justify-between my-2">
        <img src={logo} alt="Logo" className="mx-4" />
        <h1 className="font-poppins text-2xl flex-1 text-center">
          CUSTOMER RELATIONSHIP MANAGEMENT
        </h1>
        <div className="flex space-x-5 mr-12 mt-2">
          <img src={notification} alt="notification" className="w-4 h-4 mt-1" />
          <div className="flex items-center space-x-0">
            <img src={profile} alt="profile" className="w-6 h-6" />
            <select className="rounded ml-2">
              <option>select</option>
            </select>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-4" />

      <div className="flex">
        <div className="sidebar bg-[#FFF9F5] h-full w-48 p-4">
          <ul>
            <div className="mt-4">
              <li>
                <Link
                  to={RoutePath.AUTHENTICATED_USER}
                  className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                >
                  <img
                    src={users}
                    alt="users"
                    className="mr-2 w-5 h-5 group-focus:invert group-hover:invert"
                  />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to={RoutePath.AUTHENTICATED_CUSTOMER}
                  className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                >
                  <img
                    src={customers}
                    alt="customers"
                    className="mr-2 group-focus:invert group-hover:invert"
                  />
                  Customers
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleComplaintOptions}
                  className="block py-2 px-4 w-full text-left group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                >
                  <img
                    src={complaint}
                    alt="complaint"
                    className="mr-2 group-hover:invert group-focus:invert"
                  />
                  Complaints
                  <img
                    src={arrow}
                    alt="arrow"
                    className="ml-2 mt-1 group-hover:invert group-focus:invert w-3 h-2"
                  />
                </button>
                {showComplaintOptions && (
                  <ul>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/allcomplaints`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        All Complaints
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/assign`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        {/* <img
                          src={assign}
                          alt="assign"
                          className="mr-3 group-hover:invert group-focus:invert"
                        /> */}
                        Assign
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/closure`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        {/* <img
                          src={closure}
                          alt="closure"
                          className="mr-2 group-hover:invert group-focus:invert"
                        /> */}
                        Closure
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={toggleReportOptions}
                  className="block py-2 px-4 w-full text-left group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                >
                  <img
                    src={report}
                    alt="report"
                    className="mr-2 group-hover:invert group-focus:invert"
                  />
                  Reports
                  <img
                    src={arrow}
                    alt="arrow"
                    className="ml-2 mt-1 group-hover:invert group-focus:invert w-3 h-2"
                  />
                </button>
                {showReportOptions && (
                  <ul>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/allcomplaints`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        1
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/assign`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        2
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${RoutePath.AUTHENTICATED_COMPLAINT}/closure`}
                        className="block py-2 px-4 group font-semibold bg-white border border-[#B0B0B0] hover:bg-[#0884FF] hover:text-white active:bg-[#0884FF] active:text-white focus:bg-[#0884FF] focus:text-white flex items-center"
                      >
                        3
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </div>
            <li className="mt-72">
              <hr className="border-gray-300 mt-4" />
              <button
                onClick={() => {
                  console.log("Logging out...");
                }}
                className="block py-2 px-4 w-full text-left group hover:bg-[#0884FF] hover:text-white flex items-center"
              >
                <img src={logout} alt="logout" className="mr-2 group-hover:invert" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route
              path={RoutePath.DEFAULT}
              element={<Navigate to={RoutePath.AUTHENTICATED_USER} />}
            />
            <Route
              path={`${RoutePath.AUTHENTICATED_USER}/*`}
              element={<UserWrapperComponent />}
            ></Route>
            <Route
              path={`${RoutePath.AUTHENTICATED_CUSTOMER}/*`}
              element={<CustomerWrapperComponent />}
            ></Route>
            <Route
              path={`${RoutePath.AUTHENTICATED_COMPLAINT}/*`}
              element={<ComplaintWrapperComponent />}
            >
              <Route path="assign" element={<UserWrapperComponent />} />
              <Route path="closure" element={<UserWrapperComponent />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Authenticated;
