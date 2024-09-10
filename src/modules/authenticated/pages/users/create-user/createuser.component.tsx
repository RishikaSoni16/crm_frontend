import React, { useState, useEffect, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { ApiPageResponse } from "../../../../../core/models/api.models";
import RoutePath from "../../../../../core/constants/routes.constants";
import AuthenticatedService from "../../../authenticated.service";

// Modal Component
const Createuser: React.FC<{ onEdit:any , user:any,onClose: () => void }> = ({user,onEdit, onClose }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    role: 0,
    address: '',
    city: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    role: '',
    address: '',
    city: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {
      fullName: '',
      role: '',
      address: '',
      city: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number should contain only digits';
      isValid = false;
    }  else if (formData.mobile && (formData.mobile.toString().length > 10 || formData.mobile.toString().length < 6)) {
      newErrors.mobile = 'Minimum 6 & maximum 10 digits allowed';
      isValid = false;
    }

    if(user != null){
      return isValid;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
        return; // Stop submission if form is invalid
    }

    try {
        const authService = new AuthenticatedService();
        formData.role = parseInt(formData.role.toString());
        if(user != null){
          onEdit({ ...user, ...formData,userName:formData.fullName }); // Pass the updated user data to the onEdit handler
        }else{

        const resp = await authService.signUpUser(formData);
        if (resp.status === 200) {
          console.log('Calling onClose'); // Debugging
          onClose();
        } else {
            setFormData(prevData => ({
                ...prevData,
                pageError: resp.message
            }));
        }
      }
    } catch (error: any) {
        console.error("Error:", error);
    }
};
  const navigateByUrl = (url:string)=>{
    navigate(url);
  }

  const [roles, setRoles] = useState<{ id: number; role: string }[]>([]);
    useEffect(() => {
      if(!user){
         return
      }
        setFormData({
            fullName: user.userName,
            role: user.role.id,
            address: user.address,
            city: user.city,
            email: user.email,
            mobile: user.mobile,
            password: "",
            confirmPassword: '',
        });
    }, [user]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const authService = new AuthenticatedService();
                const rolesData = await authService.fetchRoles();
                console.log(rolesData)
                setRoles(rolesData.data); 
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);

  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-3/5 max-w-3xl font-montserrat mt-2 flex flex-col bg-white rounded-md px-10 py-8 shadow-2xl'>
        <h1 className='text-xl mb-6 border-b-2 border-bordercolor w-full'>
        {user == null ? 'Edit' : 'Add'} USER
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
          <div className='grid grid-cols-4 gap-4'>
            <div className='flex flex-col'>
              <label className='text-md mb-1 flex items-center'>
                <span>Full Name</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.fullName && <span className='text-red-500 text-xs'>{errors.fullName}</span>}
            </div>
            <div className='flex flex-col'>
                            <label className='text-md mb-1 flex items-center'>
                                <span>Role</span>
                                <span className='text-red-500 ml-1'>*</span>
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleChange}
                                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
                            >
                                <option value="" disabled>Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.role}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className='text-red-500 text-xs'>{errors.role}</span>}
                        </div>
            <div className='flex flex-col'>
              <label className='text-md mb-1 flex items-center'>
                <span>Address</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.address && <span className='text-red-500 text-xs'>{errors.address}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-md mb-1 flex items-center'>
                <span>City</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.city && <span className='text-red-500 text-xs'>{errors.city}</span>}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <div className='flex flex-col'>
              <label className='text-md mb-1 flex items-center'>
                <span>Email</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-md mb-1 flex items-center'>
                <span>Mobile</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='number'
              
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.mobile && <span className='text-red-500 text-xs'>{errors.mobile}</span>}
            </div>

            { user==null &&(
              <>
                <div className='flex flex-col'>
                  <label className='text-md mb-1 flex items-center'>
                    <span>Password</span>
                    <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <input
                    type='password'
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='border border-gray-300 rounded-md px-2 py-1 text-sm'
                  />
                  {errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>}
                </div>
                <div className='flex flex-col'>
                  <label className='text-md mb-1 flex items-center'>
                    <span>Confirm Password</span>
                    <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <input
                    type='password'
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='border border-gray-300 rounded-md px-2 py-1 text-sm'
                  />
                  {errors.confirmPassword && <span className='text-red-500 text-xs'>{errors.confirmPassword}</span>}
                </div>
              </>
              )
            } 

          </div>

          <div className='flex justify-end space-x-4 mt-6'>
            <button
              type='submit'
              className='px-5 py-1 text-md text-white bg-customorange rounded-sm hover:bg-[#d96314]'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={onClose}
              className='px-5 py-1 text-md border border-black rounded-sm text-black hover:bg-gray-100'
            >
              Cancel
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
};



export default Createuser;
