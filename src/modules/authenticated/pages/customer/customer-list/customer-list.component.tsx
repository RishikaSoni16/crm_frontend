import React, { useEffect, useState, useCallback } from "react";
import addIcon from '../../../../../../src/assets/img/add.png';
import uploadIcon from '../../../../../../src/assets/img/upload.png';
import downloadIcon from '../../../../../../src/assets/img/download.png';
import EditIcon from '../../../../../../src/assets/img/edit.png';
import DeleteIcon from '../../../../../../src/assets/img/delete.png';
import ViewIcon from '../../../../../../src/assets/img/View.png';
import Search from '../../../../../../src/assets/img/search.png';
import Deletecustomer from "../delete-customer/deletecustomer.component";
import Downloadexcel from '../downloadCustomet-excel/downloadexcel.component';
import ViewCustomer from "../view-customer/viewCustomer.component";
import Createcustomer from "../create-customer/createcustomer.component";
import UserService from '../../../authenticated.service';
import CustomPagination, { PagingModel, PagingModelClass } from '../../../../../shared/pages/pagination.component';
import debounce from 'lodash.debounce';

const Listcustomer: React.FC = () => {
  const [showModel, setShowModel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [paginationObject, setPaginationObject] = useState<PagingModel>(new PagingModelClass());
  const [customerName, setCustomerName] = useState('');
  const [contactPersonName, setcontactPersonName] = useState('');
  const [segment, setSegment] = useState('');
  const [accountName, setAccountName] = useState('');
  const [customerIdToDelete, setCustomerIdToDelete] = useState<string | null>(null);

  const [showViewModel, setShowViewModel] = useState<boolean>(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleOpenViewCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowViewModel(true);
  };

  const fetchCustomer = async () => {
    try {
      const userService = new UserService();
      const url = `?pageNumber=${paginationObject.currentPage}&pageSize=${paginationObject.itemsPerPage}&searchTerm=${searchTerm}&customerName=${customerName}&contactPersonName=${contactPersonName}&segment=${segment}&accountName=${accountName}`;
      const response = await userService.listAllCustomers(url);
      if (response && response.data) {
        setCustomers(response.data.data);
        setPaginationObject(prev => ({
          ...prev,
          totalElements: response.data.totalRecordCount,
          totalPages: Math.ceil(response.data.totalRecordCount / paginationObject.itemsPerPage),
        }));
      } else {
        console.error('No customer data found');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const debouncedFetchCustomers = useCallback(
    debounce(() => fetchCustomer(), 100),
    [paginationObject.currentPage, searchTerm]
  );

  useEffect(() => {
    debouncedFetchCustomers();
  }, [searchTerm, filterTerm, paginationObject.currentPage, debouncedFetchCustomers]);

  useEffect(() => {
    if (filterTerm) {
      const lowercasedFilter = filterTerm.toLowerCase();
      const filteredData = customers.filter((customer) => {
        const combinedFields = [
          customer.customerName,
          customer.contactPersonName,
          customer.segment.segment,
          customer.accountName.accountName,
        ].join(',').toLowerCase();

        return combinedFields.includes(lowercasedFilter);
      });
      setFilteredCustomers(filteredData);
    } else {
      setFilteredCustomers(customers);
    }
  }, [filterTerm, customers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTerm(e.target.value);
    setIsDropdownVisible(true);
  };
  
  const handleDeleteClick = (userId: string) => {
    setCustomerIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteCustomer = async (userId: string) => {
    console.log('Attempting to delete user with ID:', userId);
    try {
      const userService = new UserService();
      const response = await userService.deleteCustomer(userId);
      console.log('Delete response:', response);
      if (response.status === 200) {
        alert(response.message);
        fetchCustomer(); // Refresh the list
      } else {
        alert('Failed to delete user: ' + response.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setShowDeleteModal(false);
      setCustomerIdToDelete(null);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setPaginationObject(prev => ({
      ...prev,
      currentPage: selectedPage,
    }));
  };

  return (
    <div className="flex flex-col h-screen p-4 relative">
      <div className="absolute top-4 left-4 right-4 flex items-center bg-[#F5F5F5] p-2 rounded w-full">
        <div className="relative mr-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2 pr-10 w-full max-w-xs"
          />
          <img
            src={Search}
            alt="Search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
          />
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Filter..."
            value={filterTerm}
            onChange={handleFilterChange}
            onFocus={() => setIsDropdownVisible(true)}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            className="border border-gray-300 rounded-md p-2 w-32"
          />
        </div>
        <div className="flex-grow"></div>
        <div className="flex space-x-6">
          <img
            src={addIcon}
            alt="Add"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {setShowModel(true); setSelectedCustomerId(null)}}
          />
          <img
            src={downloadIcon}
            alt="Download"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowDownload(true)}
          />
          <img src={uploadIcon} alt="Upload" className="w-8 h-8 cursor-pointer" />
        </div>
      </div>

      <div className="overflow-x left-4 right-4 mt-16 w-full">
        <table className="w-full divide-y">
          <thead className="bg-tableheading">
            <tr>
              <th className="segment-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Segment</th>
              <th className="accountName-width px-8 py-3 text-left text-xs font-medium uppercase tracking-wider">Account</th>
              <th className="customerName-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
              <th className="buildingNo-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Building</th>
              <th className="location-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
              <th className="mobile-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
              <th className="contactPersonName-width px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((data, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-tablerow'} hover:bg-gray-100`}
                >
                  <td className="segment-width px-6 py-4 whitespace-nowrap">{data.segment.segment}</td>
                  <td className="accountName-width px-12 py-4 whitespace-nowrap">{data.accountName.accountName}</td>
                  <td className="customerName-width px-6 py-4 whitespace-nowrap">{data.customerName}</td>
                  <td className="buildingNo-width px-6 py-4 whitespace-nowrap">{data.buildingNo}</td>
                  <td className="location-width px-6 py-4 whitespace-nowrap">{data.location}</td>
                  <td className="mobile-width px-6 py-4 whitespace-nowrap">{data.mobile}</td>
                  <td className="contactPersonName-width px-6 py-4 whitespace-nowrap">{data.contactPersonName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => {setShowModel(true); setSelectedCustomerId(data.id);} }
                    />
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDeleteClick(data.id)}
                    />
                    <img
                      src={ViewIcon}
                      alt="View"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleOpenViewCustomer(data.id)} // Ensure correct ID is passed
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomPagination
        totalPages={paginationObject.totalPages}
        currentPage={paginationObject.currentPage}
        onPageChange={handlePageChange}
      />

      {showModel && <Createcustomer customerId={selectedCustomerId} onClose={() => setShowModel(false)} />}
      {showDeleteModal && customerIdToDelete && (
        <Deletecustomer 
          onClose={() => setShowDeleteModal(false)} 
          userId={customerIdToDelete} 
          onDelete={handleDeleteCustomer}
        />
      )}
      {showDownload && <Downloadexcel onClose={() => setShowDownload(false)} />}
      {showViewModel && selectedCustomerId && (
        <ViewCustomer
          customerId={selectedCustomerId}
          onClose={() => setShowViewModel(false)}
        />
      )}
    </div>
  );
};

export default Listcustomer;
