import React, { useEffect, useState, useCallback } from 'react';
import UserService from '../../../authenticated.service'; 
import Createuser from '../create-user/createuser.component';
import Deleteuser from '../delete-user/deleteuser.component';
import Downloadexcel from '../download-excel/downloadexcel.component';
import addIcon from '../../../../../../src/assets/img/add.png';
import EditIcon from '../../../../../../src/assets/img/edit.png';
import DeleteIcon from '../../../../../../src/assets/img/delete.png';
import Search from '../../../../../../src/assets/img/search.png';
import CustomPagination, { PagingModel, PagingModelClass } from '../../../../../shared/pages/pagination.component';
import debounce from 'lodash.debounce'; // Import debounce

const Listuser: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const [userToEdit, setUserToEdit] = useState<any | null>(null);
    const [paginationObject, setPaginationObject] = useState<PagingModel>(new PagingModelClass());
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch users from API
    const fetchUsers = async () => {
        try {
            const userService = new UserService();
            const url = `?page=${paginationObject.currentPage}&size=${paginationObject.itemsPerPage}&search=${searchTerm}`;
            const response = await userService.listAllUsers(url);
            if (response && response.data) {
                setUsers(response.data.data);
                setPaginationObject(prev => ({
                    ...prev,
                    totalElements: response.data.totalRecordCount,
                    totalPages: Math.ceil(response.data.totalRecordCount / paginationObject.itemsPerPage),
                }));
            } else {
                console.error('No user data found');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Debounced version of fetchUsers
    const debouncedFetchUsers = useCallback(
        debounce(() => fetchUsers(), 100), // Debounce time in ms
        [paginationObject.currentPage, searchTerm]
    );

    // Use effect to call debounced fetchUsers when searchTerm or currentPage changes
    useEffect(() => {
        debouncedFetchUsers();
    }, [searchTerm, paginationObject.currentPage, debouncedFetchUsers]);

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handle delete button click
    const handleDeleteClick = (userId: string) => {
        setUserIdToDelete(userId);
        setShowDeleteModal(true);
    };

    // Handle edit button click
    const handleEditClick = (user: any) => {
        setUserToEdit(user);
        setShowCreateModal(true);
    };

    // Handle user deletion
    const handleDeleteUser = async (userId: string) => {
        try {
            const userService = new UserService();
            const response = await userService.deleteUser(userId);
            if (response.status === 200) {
                alert(response.message);
                fetchUsers();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setShowDeleteModal(false);
            setUserIdToDelete(null);
        }
    };
    // Handle user editing
    const handleEditUser = async (user: any) => {
        try {
            const userService = new UserService();
            const response = await userService.updateUser(user);
            if (response.status === 200) {
                alert(response.message);
                fetchUsers();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error editing user:', error);
        } finally {
            setShowCreateModal(false);
            setUserToEdit(null);
        }
    };

    // Handle page change
    const handlePageChange = (selectedPage: number) => {
        setPaginationObject(prev => ({
            ...prev,
            currentPage: selectedPage,
        }));
    };
    
    return (
        <div className="flex flex-col h-screen pl-4 pr-4 relative">
            {/* Search and Filter Box */}
            <div className="absolute top-1 left-4 right-4 flex items-center bg-[#F5F5F5] p-2 rounded w-full">
                <div className="relative mr-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded-md p-2 pr-10 w-full max-w-xs"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <img
                        src={Search}
                        alt="Search"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                    />
                </div>
                <div className="flex-grow"></div>
                <div className="flex space-x-6">
                    <img
                        src={addIcon}
                        alt="Add"
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => {setShowCreateModal(true);}}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="table-container mt-16">
                <table className="w-full divide-y">
                    <thead className="bg-tableheading">
                        <tr>
                            <th className="username-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                            <th className="role-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                            <th className="address-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                            <th className="city-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">City</th>
                            <th className="email-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="mobile-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                            <th className="action-column px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((data, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-tablerow'} hover:bg-gray-100`} 
                                >
                                    <td className="username-column px-4 py-2 whitespace-nowrap">{data.userName}</td>
                                    <td className="role-column px-4 py-2 whitespace-nowrap">{data.role.role}</td>
                                    <td className="address-column px-4 py-2 whitespace-nowrap">{data.address}</td>
                                    <td className="city-column px-4 py-2 whitespace-nowrap">{data.city}</td>
                                    <td className="email-column px-4 py-2 whitespace-nowrap">{data.email}</td>
                                    <td className="mobile-column px-4 py-2 whitespace-nowrap">{data.mobile}</td>
                                    <td className="action-column px-4 py-2 whitespace-nowrap flex space-x-2">
                                        <button
                                            onClick={() => handleEditClick(data)}
                                            className="flex items-center justify-center p-2 hover:bg-blue-100"
                                        >
                                            <img 
                                                src={EditIcon}
                                                alt="Edit"
                                                className="w-4 h-4"
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(data.id)}
                                            className="flex items-center justify-center p-2 hover:bg-red-100"
                                        >
                                            <img
                                                src={DeleteIcon}
                                                alt="Delete"
                                                className="w-4 h-4"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-2">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination-container mt-4">
                    <CustomPagination
                        currentPage={paginationObject.currentPage}
                        totalPages={paginationObject.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Modal Components */}
            {showCreateModal && <Createuser user={userToEdit} 
                    onEdit={handleEditUser} onClose={() => setShowCreateModal(false)} />}
            {showDeleteModal && userIdToDelete && (
                <Deleteuser 
                    onClose={() => setShowDeleteModal(false)} 
                    userId={userIdToDelete} 
                    onDelete={handleDeleteUser}
                />
            )}
          
            {showDownload && <Downloadexcel onClose={() => setShowDownload(false)} />}
        </div>
    );
};

export default Listuser;
