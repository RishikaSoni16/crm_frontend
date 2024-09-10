
import React, { useState,useRef, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiPageResponse } from "../../../../../core/models/api.models";
import RoutePath from "../../../../../core/constants/routes.constants";
import AuthenticatedService from "../../../authenticated.service";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa';
import { DateUtils } from "../../../../../core/constants/date-converter.constant";

// Modal Component
const Createcustomer: React.FC<{  customerId:any, onClose: () => void }> = ({customerId, onClose }) => {
  interface AmcSystem {
    id: number;
    amcSystem: string;
  }
  const navigate = useNavigate();
  const [months,setMonths]= useState([]);
  const [formData, setFormData] = useState<{
    segment: number,
    accountName: number,
    customerName: string,
    buildingNo: string,
    location: string,
    subDetails: string,
    contactPersonName: string,
    mobile: string,
    email: string,
    amcType: number,
    amcFrom: Date | null,
    amcTo: Date | null,
    q1: number,
    selectedMonthForq1: number,
    amcStatus: number,
    poNo: string,
    poValue: string,
    year: string,
    billingCycle: number,
    renewalEffect: string,
    sla: number,
    agreedResponse: number,
    agreedResolution: number,
    // billingValuePerQuarter: number,
    billingValuePerQuarter: string,
    amcSystem: number,
    percentDefineAmcSpare: string,
    amountAllocatedAmcSpare: string,
    // amountConsumed: number,
    amountConsumed: string,
    consumedPercentage: string,
  }>({
    segment: 0,
    accountName: 0,
    customerName: '',
    buildingNo: '',
    location: '',
    subDetails: '',
    contactPersonName: '',
    mobile: '',
    email: '',
    amcType: 0,
    amcFrom: null,
    amcTo: null,
    q1: 0,
    selectedMonthForq1: 0,
    amcStatus: 0,
    poNo: '',
    poValue: '',
    year: '',
    billingCycle: 0,
    renewalEffect: '',
    sla: 0,
    agreedResponse: 0,
    agreedResolution: 0,
    billingValuePerQuarter: '',
    amcSystem: 0,
    percentDefineAmcSpare: '',
    amountAllocatedAmcSpare: '',
    amountConsumed: '',
    consumedPercentage: '',
  });


  const [errors, setErrors] = useState({
    segment: '',
    accountName: '',
    customerName: '',
    buildingNo: '',
    location: '',
    subDetails: '',
    contactPersonName: '',
    mobile: '',
    email: '',
    amcType: '',
    amcFrom: '',
    amcTo: '',
    q1: '',
    selectedMonthForq1: '',
    amcStatus: '',
    poNo: '',
    poValue: '',
    year: '',
    billingCycle: '',
    renewalEffect: '',
    sla: '',
    agreedResponse: '',
    agreedResolution: '',
    billingValuePerQuarter: '',
    amcSystem: '',
    percentDefineAmcSpare: '',
    amountAllocatedAmcSpare: '',
    amountConsumed: '',
    consumedPercentage: '',
  });

  // Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
 
  const handleCheckboxChange = (id: number) => {
    setSelectedAmcSystems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(amcId => amcId !== id)
        : [...prevSelected, id]
    );
  };
 
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
 

  const handleFromDateChange = async (date: Date | null) => {
    setFormData({ ...formData, amcFrom: date });
    const dt = DateUtils.formatDate(date)
    const authService = new AuthenticatedService();
      const resp = await authService.fetchMonthByAMCFrmDate(dt);
        setMonths(resp);
  };
  
  useEffect(()=>{
    calculateRenewaEffect();
    calculateAmtAllocatedFor();
    calculateBillingValuePer();  
  },[formData.poValue])



  useEffect(()=>{
  calculateRenewaEffect();
},[formData.year])



useEffect(()=>{


  calculateBillingValuePer();
},[formData.billingCycle])

useEffect(()=>{

  calculateAmtAllocatedFor();  
},[formData.percentDefineAmcSpare])



const calculateRenewaEffect=()=>{
  let poNum:number = parseInt(formData.poValue);
    let yr:number = parseInt(formData.year);
  if(formData.poValue && !isNaN(poNum) && !isNaN(yr) && formData.year){
    let res:number = poNum -  yr;
    res = res / poNum;
    res = res * 100;
    setFormData({...formData,renewalEffect : res.toString()});
  }
  // result = purchase order value - year
  // res = result % purchase order valu
  // res = res*100
}
 const  calculateAmtAllocatedFor = ()=>{
      // res = POV % Define
      let poNum:number = parseInt(formData.poValue);
    let percentDefineAmcSpare:number = parseInt(formData.percentDefineAmcSpare);
  if(formData.poValue && !isNaN(poNum) && !isNaN(percentDefineAmcSpare) && formData.percentDefineAmcSpare){
    let res:number = poNum % percentDefineAmcSpare
    setFormData({...formData,amountAllocatedAmcSpare : res.toString()});
  }
  }

  const calculateBillingValuePer = () => {
    let poNum: number = parseInt(formData.poValue, 10);
    let billingCycle: number = formData.billingCycle;
  
    if (formData.poValue && !isNaN(poNum) && billingCycle) {
      const currentBillingCycle = billingCycles.find((e) => e.id === billingCycle);
      if (currentBillingCycle) {
        let res = poNum / 12;
        if (currentBillingCycle.billingCycle === 'Quarterly') {
          res = poNum / 4;
        }
        setFormData({ ...formData, billingValuePerQuarter: res.toString() });
      } else {
        console.error('Billing cycle not found.');
      }
    } else {
      console.error('Invalid PO Value or Billing Cycle.');
    }
  };
  

  const handleToDateChange = (date: Date | null) => {
    setFormData({ ...formData, amcTo: date });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const authService = new AuthenticatedService();
      if(customerId != null){
        const reqObj:any = {};
        Object.assign(reqObj,formData);
        reqObj.amcFrom = reqObj.amcFrom instanceof Date ? DateUtils.formatDate(reqObj.amcFrom) : DateUtils.formatDate(new Date(reqObj.amcFrom));
        reqObj.amcTo = reqObj.amcTo instanceof Date ? DateUtils.formatDate(reqObj.amcTo) : DateUtils.formatDate(new Date(reqObj.amcTo));
        delete reqObj.quarterMonthResponse;
        authService.editCustomer({...reqObj}); // Pass the updated user data to the onEdit handler
      }
      else{
        const requ:any = {};
        Object.assign(requ,formData);
  
        requ.amcSystem = [requ.amcSystem];
        requ.amcTo = DateUtils.formatDate(requ.amcTo);
        requ.amcFrom = DateUtils.formatDate(requ.amcFrom);
       
        const resp = await authService.createCustomer(requ);
        if (resp.status === 200) {
          navigateByUrl(`${RoutePath.AUTHENTICATED}`);
        } else {
          setFormData(prevData => ({
            ...prevData,
            pageError: resp.message
          }));
        }
      } 
      }
      catch (error: any) {
        console.error("Error:", error);
      }
  };


  const navigateByUrl = (url: string) => {
    navigate(url);
  }
  useEffect(() => {
    if(!customerId) {
       return
    }
    

    const fetchCustomer = async () => {
      try {
        const authService = new AuthenticatedService();
        const resp = await authService.fetchViewCustomer(customerId);

        if (resp.status === 200) {
          const requestObj = resp.data.data[0];
          requestObj.accountName = requestObj.accountName.id;
          requestObj.agreedResolution = requestObj.agreedResolution.id;
          requestObj.agreedResponse = requestObj.agreedResponse.id;
          requestObj.amcStatus = requestObj.amcStatus.id;
          requestObj.amcSystem = Array.isArray(requestObj.amcSystem) && requestObj.amcSystem ? requestObj.amcSystem.map((e:any)=> e.id):[];
          requestObj.amcType = requestObj.amcType.id;
          requestObj.billingCycle = requestObj.billingCycle.id;
          requestObj.segment = requestObj.segment.id;
          requestObj.sla = requestObj.sla.id;
          setFormData({...requestObj});
        } 
      } catch (err) {
        console.error('Error fetching customer data:', err);
      } 
    };

    fetchCustomer();
  }, [customerId]);

  const validate = () => {
    const newErrors = {
      segment: '',
      accountName: '',
      customerName: '',
      buildingNo: '',
      location: '',
      subDetails: '',
      contactPersonName: '',
      mobile: '',
      email: '',
      amcType: '',
      amcFrom: '',
      amcTo: '',
      q1: '',
      selectedMonthForq1: '',
      amcStatus: '',
      poNo: '',
      poValue: '',
      year: '',
      billingCycle: '',
      renewalEffect: '',
      sla: '',
      agreedResponse: '',
      agreedResolution: '',
      billingValuePerQuarter: '',
      amcSystem: '',
      percentDefineAmcSpare: '',
      amountAllocatedAmcSpare: '',
      amountConsumed: '',
      consumedPercentage: '',
    };
    let isValid = true;

    if (!formData.segment) {
      newErrors.segment = 'Segment is required';
      isValid = false;
    }
    if (!formData.accountName) {
      newErrors.accountName = 'Account Name is required';
      isValid = false;
    }
    if (!formData.customerName) {
      newErrors.customerName = 'Client Name is required';
      isValid = false;
    }
    if (!formData.buildingNo) {
      newErrors.buildingNo = 'Building Number is required';
      isValid = false;
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (!formData.subDetails) {
      newErrors.subDetails = 'Sub Details is required';
      isValid = false;
    }
    if (!formData.contactPersonName) {
      newErrors.contactPersonName = 'Contact Person is required';
      isValid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Contact Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Contact Number should contain only 10 digits';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'email ID is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'email ID is invalid';
      isValid = false;
    }
    if (!formData.amcType) {
      newErrors.amcType = 'AMC Type is required';
      isValid = false;
    }
    if (!formData.amcFrom) {
      newErrors.amcFrom = 'AMC From is required';
      isValid = false;
    }
    if (!formData.amcTo) {
      newErrors.amcTo = 'AMC To is required';
      isValid = false;
    }
    // if (!formData.q1) {
    //   newErrors.q1 = 'Q1 is required';
    //   isValid = false;
    // }
    if (!formData.selectedMonthForq1) {
      newErrors.selectedMonthForq1 = 'Month is required';
      isValid = false;
    }
    if (!formData.amcStatus) {
      newErrors.amcStatus = 'AMC Status is required';
      isValid = false;
    }
    if (!formData.poNo) {
      newErrors.poNo = 'Purchse Order Number is required';
      isValid = false;
    }
    if (!formData.poValue) {
      newErrors.poValue = 'Purchse Order Value is required';
      isValid = false;
    }
    if (!formData.year) {
      newErrors.year = 'Year(-1) is required';
      isValid = false;
    }
    if (!formData.billingCycle) {
      newErrors.billingCycle = 'Billing Cycle is required';
      isValid = false;
    }
    if (!formData.renewalEffect) {
      newErrors.renewalEffect = 'Renewal Effect is required';
      isValid = false;
    }
    if (!formData.sla) {
      newErrors.sla = 'SLA is required';
      isValid = false;
    }
    if (!formData.agreedResponse) {
      newErrors.agreedResponse = 'Agreed Response is required';
      isValid = false;
    }
    if (!formData.agreedResolution) {
      newErrors.agreedResolution = 'Agreed Resolution is required';
      isValid = false;
    }
    if (!formData.billingValuePerQuarter) {
      newErrors.billingValuePerQuarter = 'Billing Value per Quarter/Month is required';
      isValid = false;
    }
    if (!formData.amcSystem) {
      newErrors.amcSystem = 'System in AMC is required';
      isValid = false;       
    }
    if (!formData.percentDefineAmcSpare) {
      newErrors.percentDefineAmcSpare = '% Define for AMC Spare is required';
      isValid = false;
    }
    if (!formData.amountAllocatedAmcSpare) {
      newErrors.amountAllocatedAmcSpare = 'AMT Allocated for AMC Spare is required';
      isValid = false;
    }
    if (!formData.amountConsumed) {
      newErrors.amountConsumed = 'AMT Consumed is required';
      isValid = false;
    }
    if (!formData.consumedPercentage) {
      newErrors.consumedPercentage = 'Consumed % is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const [segments, setSegments] = useState<{ id: number; segment: string }[]>([]);
  const [accountNames, setAccountNames] = useState<{ id: number; accountName: string }[]>([]);
  const [amcTypes, setAmcTypes] = useState<{ id: number; amcType: string }[]>([]);
  const [amcStatuss, setAmcStatuss] = useState<{ id: number; amcStatus: string }[]>([]);
  const [slas, setSlas] = useState<{ id: number; sla: string }[]>([]);
  const [agreedResponses, setAgreedResponses] = useState<{ id: number; agreedResponse: string }[]>([]);
  const [agreedResolutions, setAgreedResolutions] = useState<{ id: number; agreedResolution: string }[]>([]);
  const [billingCycles, setBillingCycles] = useState<{ id: number; billingCycle: string }[]>([]);
  const [amcSystems, setAmcSystems] = useState<{ id: number; amcSystem: string }[]>([]);
  const [selectedAmcSystems, setSelectedAmcSystems] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

   const selectedAmcSystemNames = selectedAmcSystems
    .map(id => amcSystems.find(system => system.id === id)?.amcSystem)
    .filter(Boolean) // filter out undefined values in case something goes wrong
    .join(', ');

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const authService = new AuthenticatedService();
        const segmentsData = await authService.fetchSegments();
        console.log(segmentsData)
        setSegments(segmentsData.data);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };
    fetchSegments();

    const fetchAccountNames = async () => {
      try {
        const authService = new AuthenticatedService();
        const accountNamesData = await authService.fetchAccountNames();
        console.log(accountNamesData)
        setAccountNames(accountNamesData.data);
      } catch (error) {
        console.error("Error fetching Account Names:", error);
      }
    };
    fetchAccountNames();

    const fetchAmcTypes = async () => {
      try {
        const authService = new AuthenticatedService();
        const amcTypesData = await authService.fetchAmcTypes();
        console.log(amcTypesData)
        setAmcTypes(amcTypesData.data);
      } catch (error) {
        console.error("Error fetching AMC Types:", error);
      }
    };
    fetchAmcTypes();

    const fetchAmcStatus = async () => {
      try {
        const authService = new AuthenticatedService();
        const amcStatusData = await authService.fetchAmcStatus();
        console.log(amcStatusData)
        setAmcStatuss(amcStatusData.data);
      } catch (error) {
        console.error("Error fetching AMC Status:", error);
      }
    };
    fetchAmcStatus();

    const fetchSlas = async () => {
      try {
        const authService = new AuthenticatedService();
        const slaData = await authService.fetchSlas();
        console.log(slaData)
        setSlas(slaData.data);
      } catch (error) {
        console.error("Error fetching SLA:", error);
      }
    };
    fetchSlas();

    const fetchAgreedResponse = async () => {
      try {
        const authService = new AuthenticatedService();
        const agreedResponseData = await authService.fetchAgreedResponse();
        console.log(agreedResponseData)
        setAgreedResponses(agreedResponseData.data);
      } catch (error) {
        console.error("Error fetching Agreed Response:", error);
      }
    };
    fetchAgreedResponse();

    const fetchAgreedResolutions = async () => {
      try {
        const authService = new AuthenticatedService();
        const agreedResolutionData = await authService.fetchAgreedResolutions();
        console.log(agreedResolutionData)
        setAgreedResolutions(agreedResolutionData.data);
      } catch (error) {
        console.error("Error fetching Agreed Resolution:", error);
      }
    };
    fetchAgreedResolutions();
    const fetchBillingCycles = async () => {
      try {
        const authService = new AuthenticatedService();
        const billingCyclesData = await authService.fetchBillingCycles();
        console.log(billingCyclesData)
        setBillingCycles(billingCyclesData.data);
      } catch (error) {
        console.error("Error fetching Billing Cycles:", error);
      }
    };
    fetchBillingCycles();

    const fetchAmcSystems = async () => {
      try {
        const authService = new AuthenticatedService();
        const amcSystemsData = await authService.fetchAmcSystems();
        console.log(amcSystemsData)
        setAmcSystems(amcSystemsData.data);
      } catch (error) {
        console.error("Error fetching AMC Systems:", error);
      }
    };

    
    fetchAmcSystems();
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-5/6 max-w-8xl font-montserrat mt-2 flex flex-col bg-white rounded-md px-10 py-8 shadow-2xl'>
        <h1 className='text-xl mb-6 border-b-2 border-bordercolor w-full'>
          ADD CUSTOMER
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
          <div className='grid grid-cols-5 gap-4'>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Segment</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="segment"
                name="segment"
                value={formData.segment || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              ><option value="" disabled>Select Segment</option>
                {segments.map(segment => (
                  <option key={segment.id} value={segment.id}>
                    {segment.segment}
                  </option>
                ))}
              </select>
              {errors.segment && <span className='text-red-500 text-xs'>{errors.segment}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Account Name</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="accountName"
                name="accountName"
                value={formData.accountName || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select Account Name</option>
                {accountNames.map(accountName => (
                  <option key={accountName.id} value={accountName.id}>
                    {accountName.accountName}
                  </option>
                ))}
              </select>
              {errors.accountName && <span className='text-red-500 text-xs'>{errors.accountName}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Client Name</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.customerName && <span className='text-red-500 text-xs'>{errors.customerName}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Building Number</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="buildingNo"
                name="buildingNo"
                value={formData.buildingNo}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.buildingNo && <span className='text-red-500 text-xs'>{errors.buildingNo}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Location</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.location && <span className='text-red-500 text-xs'>{errors.location}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Sub Details</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="subDetails"
                name="subDetails"
                value={formData.subDetails}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.subDetails && <span className='text-red-500 text-xs'>{errors.subDetails}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Contact Person</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="contactPersonName"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.contactPersonName && <span className='text-red-500 text-xs'>{errors.contactPersonName}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Contact Number</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.mobile && <span className='text-red-500 text-xs'>{errors.mobile}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Mail ID</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='email'
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMC Type</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="amcType"
                name="amcType"
                value={formData.amcType || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select AMC Type</option>
                {amcTypes.map(amcType => (
                  <option key={amcType.id} value={amcType.id}>
                    {amcType.amcType}
                  </option>
                ))}
              </select>
              {errors.amcType && <span className='text-red-500 text-xs'>{errors.amcType}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMC From</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <div className="relative flex items-center border border-gray-300 ">
                <DatePicker
                  selected={formData.amcFrom}
                  onChange={handleFromDateChange}
                  dateFormat="dd MMM yyyy"
                  className="w-full py-1 px-3 focus:outline-none"
                />
                <div className="pr-3 flex items-center pointer-events-none">
                  <FaCalendarAlt
                    className="text-gray-400" />
                </div>
              </div>
              {errors.amcFrom && <span className='text-red-500 text-xs'>{errors.amcFrom}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMC To</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <div className="relative flex items-center border border-gray-300">
                <DatePicker
                  selected={formData.amcTo}
                  onChange={handleToDateChange}
                  dateFormat="dd MMM yyyy"
                  className="w-full py-1 px-3 focus:outline-none"
                />
                <div className="pr-3 flex items-center pointer-events-none">
                  <FaCalendarAlt
                    className="text-gray-400" />
                </div>
              </div>
              {errors.amcTo && <span className='text-red-500 text-xs'>{errors.amcTo}</span>}
            </div>
            {/* <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Q1</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="q1"
                name="q1"
                value={formData.q1}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
              </select>
              {errors.q1 && <span className='text-red-500 text-xs'>{errors.q1}</span>}
            </div> */}
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Month</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="selectedMonthForq1"
                name="selectedMonthForq1"
                value={formData.selectedMonthForq1}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select Month</option>
                {months && months.map((month:any) => (
                  <option key={month.id} value={month.id}>
                    {month.month}
                  </option>
                ))}
              </select>
              {errors.selectedMonthForq1 && <span className='text-red-500 text-xs'>{errors.selectedMonthForq1}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMC Status</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="amcStatus"
                name="amcStatus"
                value={formData.amcStatus || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select AMC Status</option>
                {amcStatuss.map(amcStatus => (
                  <option key={amcStatus.id} value={amcStatus.id}>
                    {amcStatus.amcStatus}
                  </option>
                ))}
              </select>
              {errors.amcStatus && <span className='text-red-500 text-xs'>{errors.amcStatus}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Purchase Order Number</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input 
                type='text'
                id="poNo"
                name="poNo"
                value={formData.poNo}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.poNo && <span className='text-red-500 text-xs'>{errors.poNo}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Purchase Order Value</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="poValue"
                name="poValue"
                value={formData.poValue}
                onChange={ (event) => {handleChange(event);}}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.poValue && <span className='text-red-500 text-xs'>{errors.poValue}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Year(-1)</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="year"
                name="year"
                value={formData.year}
                onChange={ (event) => {handleChange(event);}}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.year && <span className='text-red-500 text-xs'>{errors.year}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Billing Cycle</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="billingCycle"
                name="billingCycle"
                value={formData.billingCycle || ''}
                onChange={(event)=> {handleChange(event);}}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select Billing Cycle</option>
                {billingCycles.map(billingCycle => (
                  <option key={billingCycle.id} value={billingCycle.id}>
                    {billingCycle.billingCycle}
                  </option>
                ))}
              </select>
              {errors.billingCycle && <span className='text-red-500 text-xs'>{errors.billingCycle}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Renewal Effect</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="renewalEffect"
                name="renewalEffect"
                value={formData.renewalEffect}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.renewalEffect && <span className='text-red-500 text-xs'>{errors.renewalEffect}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>SLA</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="sla"
                name="sla"
                value={formData.sla || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select SLA</option>
                {slas.map(sla => (
                  <option key={sla.id} value={sla.id}>
                    {sla.sla}
                  </option>
                ))}
              </select>
              {errors.sla && <span className='text-red-500 text-xs'>{errors.sla}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Agreed Response</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="agreedResponse"
                name="agreedResponse"
                value={formData.agreedResponse || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select Agreed Response</option>
                {agreedResponses.map(agreedResponse => (
                  <option key={agreedResponse.id} value={agreedResponse.id}>
                    {agreedResponse.agreedResponse}
                  </option>
                ))}
              </select>
              {errors.agreedResponse && <span className='text-red-500 text-xs'>{errors.agreedResponse}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Agreed Resolution</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                id="agreedResolution"
                name="agreedResolution"
                value={formData.agreedResolution || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select Agreed Resolution</option>
                {agreedResolutions.map(agreedResolution => (
                  <option key={agreedResolution.id} value={agreedResolution.id}>
                    {agreedResolution.agreedResolution}
                  </option>
                ))}
              </select>
              {errors.agreedResolution && <span className='text-red-500 text-xs'>{errors.agreedResolution}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Billing Value per Quarter/Month</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              {/* <select
                id="billingValuePerQuarter"
                name="billingValuePerQuarter"
                value={formData.billingValuePerQuarter}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >

              </select> */}
              <input
                type='text'
                id="billingValuePerQuarter"
                name="billingValuePerQuarter"
                value={formData.billingValuePerQuarter}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.billingValuePerQuarter && <span className='text-red-500 text-xs'>{errors.billingValuePerQuarter}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>System in AMC</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              {/* <select
                id="amcSystem"
                name="amcSystem"
                value={formData.amcSystem || ''}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                <option value="" disabled>Select System in AMC</option>
                {amcSystems.map(amcSystem => (
                  <option key={amcSystem.id} value={amcSystem.id}>
                    {amcSystem.amcSystem}
                  </option>
                ))}
              </select> */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-48"
                >
                  {selectedAmcSystemNames || 'Select System in AMC'}
                </button>
 
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {amcSystems.map(amcSystem => (
                      <label key={amcSystem.id} className="flex items-center px-2 py-1">
                        <input
                          type="checkbox"
                          checked={selectedAmcSystems.includes(amcSystem.id)}
                          onChange={() => handleCheckboxChange(amcSystem.id)}
                          className="mr-2"
                        />
                        {amcSystem.amcSystem}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.amcSystem && <span className='text-red-500 text-xs'>{errors.amcSystem}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>% Define for AMC Spare</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="percentDefineAmcSpare"
                name="percentDefineAmcSpare"
                value={formData.percentDefineAmcSpare}
                onChange={(event)=>{handleChange(event);}}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.percentDefineAmcSpare && <span className='text-red-500 text-xs'>{errors.percentDefineAmcSpare}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMT Allocated for AMC Spare</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="amountAllocatedAmcSpare"
                name="amountAllocatedAmcSpare"
                value={formData.amountAllocatedAmcSpare}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.amountAllocatedAmcSpare && <span className='text-red-500 text-xs'>{errors.amountAllocatedAmcSpare}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>AMT Consumed</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              {/* <select
                id="amountConsumed"
                name="amountConsumed"
                value={formData.amountConsumed}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >

              </select> */}
              <input
                type='text'
                id="amountConsumed"
                name="amountConsumed"
                value={formData.amountConsumed}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.amountConsumed && <span className='text-red-500 text-xs'>{errors.amountConsumed}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-sm mb-1 flex items-center'>
                <span>Consumed %</span>
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                id="consumedPercentage"
                name="consumedPercentage"
                value={formData.consumedPercentage}
                onChange={handleChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              />
              {errors.consumedPercentage && <span className='text-red-500 text-xs'>{errors.consumedPercentage}</span>}
            </div>
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



export default Createcustomer;

