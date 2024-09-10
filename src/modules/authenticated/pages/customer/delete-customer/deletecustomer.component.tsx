import React from 'react';
import Deletepopup from '../../../../../../src/assets/img/deletepopup.png';

interface DeletecustomerProps {
    onClose: () => void;
    userId: string;
    onDelete: (userId: string) => Promise<void>; // Ensure onDelete returns a Promise
}

const Deletecustomer: React.FC<DeletecustomerProps> = ({ onClose, userId, onDelete }) => {
    const handleDelete = async () => {
        console.log('Deleting user with ID:', userId);
        try {
          await onDelete(userId); 
          alert('User deleted successfully');
      } catch (error) {
          console.error('Error deleting user:', error);
      } finally {
          onClose(); 
      }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-1/3 max-w-3xl font-montserrat mt-2 flex flex-col bg-white'>
                <div className="m-4 rounded-md border-2 border-dashed border-gray-400 px-10 py-8 shadow-2xl">
                    <div className='flex flex-col items-center'>
                        <img src={Deletepopup} alt="Delete Popup" className='w-10 h-12 mb-4' />
                        <p className='text-center text-lg font-semibold mb-4'>Do you want to delete this record?</p>
                        <div className='flex justify-center items-center w-full mt-2'>
                            <button 
                                onClick={handleDelete} 
                                className='bg-customorange rounded-sm hover:bg-[#d96314] text-white py-1 px-6 m-2'
                            >
                                Delete
                            </button>
                            <button 
                                onClick={onClose} 
                                className='border border-customorange py-1 px-6 rounded-sm m-2'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deletecustomer;
