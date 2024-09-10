import React, { useState } from "react";
import logo from '../../../../../src/assets/img/logo.png';
import RoutePath from "../../../../core/constants/routes.constants";
import { ApiPageResponse } from "../../../../core/models/api.models";
import AuthService from "../../auth.sevice";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  // State to store form data and validation errors
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: 0,
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
    pageError:"",
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Perform form validation
    if (validateForm()) {
      // Simulate form data submission (replace with actual API call)
      console.log("Form submitted with data:", formData);
      // Clear form data after submission (optional)
      setFormData({
        fullname: "",
        email: "",
        role: 0,
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setErrors({
        fullname: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
        acceptTerms: "",
        pageError:""
      });

      try{
        // API Call
        const authService = new AuthService();
        authService.signUpUser(formData).then((resp:ApiPageResponse)=>{
          if(resp.status === 200){
            navigateByUrl(`${RoutePath.DEFAULT}`);
          } else {
            setErrors((prevError)=>({
              ...prevError,
              pageError: resp.message
            }))
          }
        });
      }catch{

      }
    } else {
      console.error("Form validation failed.");
    }
  };

  const navigateByUrl = (url:string)=>{
    navigate(url);
  }

  // Validate form inputs
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      fullname: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
      pageError:""
    };

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms & conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Check if email is in valid format
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: !formData[name as keyof typeof formData] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            <p className="text-lg lg:text-xl text-white mb-2">Already have an account?</p>
            <button onClick={()=> navigateByUrl(`/${RoutePath.AUTH}/${RoutePath.AUTH_LOGIN}`)} className="text-white px-8 py-2 lg:py-3 rounded-full font-semibold text-lg lg:text-xl border-2 border-white">Sign In</button>
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 bg-white flex flex-col justify-center px-6 lg:px-8 xl:px-16">
          <h1 className="text-xl font-bold italic mb-6">Company_Name / Logo</h1>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">WELCOME,</h1>
          <p className="text-md text-[#808080] mb-4">Please enter the credentials provided on the screen for a new account.</p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={"border-b border-gray-300 text-gray-999 text-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500" + (errors.fullname ? " border-red-500" : "")}
                placeholder="Full Name"
                style={{ fontWeight: 600 }}
              />
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={"border-b border-gray-300 text-gray-999 text-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500" + (errors.email ? " border-red-500" : "")}
                placeholder="Email"
                style={{ fontWeight: 600 }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={"border-b border-gray-300 text-customGray text-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500" + (errors.role ? " border-red-500" : "")}
                style={{ fontWeight: 600 }}
              >
                <option value="" disabled hidden>Role</option>
                <option value="admin">Admin</option>
                <option value="engineer">Engineer</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={"border-b border-gray-300 text-gray-999 text-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500" + (errors.password ? " border-red-500" : "")}
                placeholder="Password"
                style={{ fontWeight: 600 }}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={"border-b border-gray-300 text-gray-999 text-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500" + (errors.confirmPassword ? " border-red-500" : "")}
                placeholder="Confirm Password"
                style={{ fontWeight: 600 }}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={"mr-2" + (errors.acceptTerms ? " border-red-500" : "")}
              />
              <label htmlFor="acceptTerms" className="text-customGray text-md">Accept the Terms & Conditions, Privacy Policy.</label>
              {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg lg:text-xl hover:bg-white hover:text-orange-500 transition duration-300">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
