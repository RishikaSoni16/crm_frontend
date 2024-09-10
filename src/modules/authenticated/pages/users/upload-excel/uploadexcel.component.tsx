// import React, { useRef } from "react";
// import browse from '../../../../../assets/img/browse.png';

// const Uploadexcel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleBrowseClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // Handle the file upload
//       console.log('Selected file:', file);
//     }
//   };

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
//       <div className='w-1/3 max-w-3xl font-montserrat mt-2 flex flex-col bg-white rounded-md px-10 py-8 shadow-2xl'>
//         <div className='border-dotted border-2 border-gray-400 w-full h-40 flex justify-center items-center flex-col'>
//           <img src={browse} alt="browse Image" className='mb-4 w-12 h-12'/>
//           <p>Drop your file here, or <span className="text-blue-500 cursor-pointer" onClick={handleBrowseClick}>browse</span></p>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleFileChange}
//             accept=".xls,.xlsx"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Uploadexcel;


import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import browse from '../../../../../assets/img/browse.png';

const Uploadexcel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0); // bytes per second
  const [uploadStartTime, setUploadStartTime] = useState<number>(0); // Start time in milliseconds

  useEffect(() => {
    if (uploadProgress === 100) {
      setUploadSpeed(0); // Reset speed when upload is complete
    }
  }, [uploadProgress]);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      setUploadProgress(0);
      setUploadStartTime(Date.now());

      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ?? 0;
            const loaded = progressEvent.loaded;
            
            const elapsedTime = (Date.now() - uploadStartTime) / 1000; // in seconds
            const speed = elapsedTime > 0 ? loaded / elapsedTime : 0; // bytes per second
            setUploadSpeed(speed);

            const progress = total > 0 ? Math.round((loaded * 100) / total) : 0;
            setUploadProgress(progress);
          }
        });
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Calculate estimated time remaining
  const getTimeRemaining = () => {
    if (uploadSpeed <= 0 || uploadProgress >= 100) return 'Calculating...';

    const totalBytes = (uploadProgress / 100) * (uploadSpeed * 10); // Estimate total bytes from progress
    const remainingBytes = totalBytes - uploadSpeed * (uploadProgress / 100);
    const timeRemaining = remainingBytes / uploadSpeed; // in seconds
    return Math.round(timeRemaining) + ' seconds remaining';
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-1/3 max-w-3xl font-montserrat mt-2 flex flex-col bg-white rounded-md px-10 py-8 shadow-2xl'>
        <div className='border-dotted border-2 border-gray-400 w-full h-40 flex justify-center items-center flex-col'>
          <img src={browse} alt="browse Image" className='mb-4 w-12 h-12'/>
          <p>Drop your file here, or <span className="text-blue-500 cursor-pointer" onClick={handleBrowseClick}>browse</span></p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".xls,.xlsx"
          />
        </div>
        {uploading && (
          <div className='mt-4 w-full'>
            <p className='text-gray-500 mb-2'>Uploading...</p>
            <div className='h-2 w-full bg-gray-200 rounded overflow-hidden'>
              <div
                className='h-full bg-blue-500 transition-all duration-300 ease-in-out'
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className='mt-2 text-sm text-gray-500'>{uploadProgress}%</p>
            <p className='text-sm text-gray-500'>{getTimeRemaining()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploadexcel;
