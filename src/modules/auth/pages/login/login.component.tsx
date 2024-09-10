import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../../../src/assets/img/logo.png';
import AuthService from "../../auth.sevice";
import { ApiPageResponse } from "../../../../core/models/api.models";
import RoutePath from "../../../../core/constants/routes.constants";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    acceptTerms: "",
    pageError: ""
  });

  // Static credentials
  const STATIC_CREDENTIALS = {
    email: 'aarti@gmail.com',
    password: 'Aarti@123',
    userId: '1234'
  };

  const validateForm = () => {
    const errors = { email: "", password: "", acceptTerms: "", pageError:"" };
    let isValid = true;

    if (!formData.email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.clear();
    // Reset the pageError before submitting
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      pageError: ''
    }));

    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    try {
      const authService = new AuthService();
      authService.loginUser(formData).then((resp:ApiPageResponse)=>{
        if(resp.status === 200){
          navigateByUrl(`/${RoutePath.AUTHENTICATED}`);
        } else {
          setFormErrors((prevError)=>({
            ...prevError,
            pageError: resp.message
          }))
        }
      });
      
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const navigateByUrl = (url:string)=>{
    navigate(url);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left side */}
        <div className="lg:w-1/2 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
          <div className="text-white text-center lg:text-left px-6 lg:px-16">
            <img src={logo} alt="Logo" className="mb-4" style={{ maxWidth: '150px' }} />
            <p className="text-5xl lg:text-6xl font-bold mb-4">HELLO,</p>
            <p className="text-5xl lg:text-6xl font-bold mb-4">ORGANIZATION,</p>
            
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 bg-white flex flex-col justify-center px-6 lg:px-8 xl:px-16">
          <h1 className="text-xl font-bold italic mb-8">Company_Name / Logo</h1>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">WELCOME BACK,</h1>
          <p className="text-md text-[#808080] mb-8">Please enter the credentials for the login. Username ( Email Address) and your password.</p>

          {formErrors.pageError && <p className="text-red-500 text-sm mt-1 mb-2">* {formErrors.pageError}</p>}
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border-b text-gray-999 text-lg px-3 py-2 w-full focus:outline-none ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:border-orange-500`}
                placeholder="Email"
                style={{ fontWeight: 600 }}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div className="mb-8">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`border-b text-gray-999 text-lg px-3 py-2 w-full focus:outline-none ${formErrors.password ? 'border-red-500' : 'border-gray-300'} focus:border-orange-500`}
                placeholder="Password"
                style={{ fontWeight: 600 }}
              />
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-customGray text-md">Accept the Terms & Conditions, Privacy Policy.</label>
              {formErrors.acceptTerms && <p className="text-red-500 text-sm mt-1">{formErrors.acceptTerms}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg lg:text-xl hover:bg-white hover:text-orange-500 transition duration-300"
            >
              Login
            </button>
            <p className="text-md text-[#808080]">
              Forgotten Password? <span className="clickable-text text-black font-semibold">Click Here</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

