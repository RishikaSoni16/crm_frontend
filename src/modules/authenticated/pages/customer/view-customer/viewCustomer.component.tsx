import React, { useEffect, useState } from 'react';
import AuthenticatedService from "../../../authenticated.service";


interface Customer {
  id: number;
  customerName: string;
  buildingNo: string;
  contactPersonName: string;
  location: string;
  email: string;
  mobile: string;
  subDetails: string;
  amcFrom: string;
  amcTo: string;
  poNo: string;
  poValue: number;
  year: string;
  renewalEffect: number;
  billingValuePerQuarter: number;
  percentDefineAmcSpare: number;
  amountAllocatedAmcSpare: number;
  amountConsumed: number;
  consumedPercentage: number;
  amcStatus: { id: number; amcStatus: string };
  segment: { id: number; segment: string };
  amcType: { id: number; amcType: string };
  billingCycle: { id: number; billingCycle: string };
  agreedResponse: { id: number; agreedResponse: string };
  agreedResolution: { id: number; agreedResponse: string };
  sla: { id: number; sla: string };
  accountName: { id: number; accountName: string };
  amcSystem: Array<{ id: number; amcSystem: string }>;
  quarterMonthResponse: Array<{
    quarter: { id: number; quarterName: string };
    monthOfQuarter: Array<{ id: number; month: string }>;
    selectedMonthForQuarter: { id: number; month: string };
  }>;
}

interface ViewComponentProps {
  customerId: string;
  onClose: () => void;

}

// Define the ViewCustomer component
const ViewCustomer: React.FC<ViewComponentProps> = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const authService = new AuthenticatedService();
        const resp = await authService.fetchViewCustomer(customerId);

        if (resp.status === 200) {
        
          setCustomer(resp.data.data[0]);
        } else {
          setError('Failed to fetch customer details');
        }
      } catch (err) {
        setError('Unknown error occurred');
        console.error('Error fetching customer data:', err);
      } 
    };

    fetchCustomer();
  }, [customerId]);


  if (!customer) return <div>No customer data available</div>;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
  <div className='w-4/5 max-w-6xl font-montserrat mt-2 flex flex-col bg-white rounded-md py-4 shadow-2xl'>
    <div className='flex items-center justify-between w-full px-3'>
      <h1 className='text-xl'>CUSTOMER DETAILS</h1>
      <button
        onClick={onClose}
        className='border border-customorange py-1 px-6 rounded-md m-2'
      >
        Close
      </button>
    </div>
    <hr className='my-4 w-full border-t border-gray-300' />
    <div className='flex gap-4 px-3'>
      {/* Display customer data */}
      <div className='flex-1 border border-gray-300 p-4'>
        <div className='space-y-4'>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Name:</span>
            <span>{customer.customerName}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Building No:</span>
            <span>{customer.buildingNo}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Contact Person:</span>
            <span>{customer.contactPersonName}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Location:</span>
            <span>{customer.location}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Email:</span>
            <span>{customer.email}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Mobile:</span>
            <span>{customer.mobile}</span>
          </div>
          {/* Add more customer fields as needed */}
        </div>
      </div>

      <div className='flex-1 border border-gray-300 p-4'>
        <div className='space-y-4'>
          <div className='flex'>
            <span className='font-semibold w-1/3'>AMC From:</span>
            <span>{new Date(customer.amcFrom).toLocaleDateString()}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>AMC To:</span>
            <span>{new Date(customer.amcTo).toLocaleDateString()}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>PO No:</span>
            <span>{customer.poNo}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>PO Value:</span>
            <span>${customer.poValue}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Year:</span>
            <span>{customer.year}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Renewal Effect:</span>
            <span>{customer.renewalEffect}%</span>
          </div>
          {/* Add more customer fields as needed */}
        </div>
      </div>

      <div className='flex-1 border border-gray-300 p-4'>
        <div className='space-y-4'>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Billing Value Per Quarter:</span>
            <span>${customer.billingValuePerQuarter}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>AMC Spare Percentage:</span>
            <span>{customer.percentDefineAmcSpare}%</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Amount Allocated AMC Spare:</span>
            <span>${customer.amountAllocatedAmcSpare}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Amount Consumed:</span>
            <span>${customer.amountConsumed}</span>
          </div>
          <div className='flex'>
            <span className='font-semibold w-1/3'>Consumed Percentage:</span>
            <span>{customer.consumedPercentage}%</span>
          </div>
          {/* Add more customer fields as needed */}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ViewCustomer;
