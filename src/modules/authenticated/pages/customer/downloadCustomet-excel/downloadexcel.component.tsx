import React, { useEffect } from "react";
import * as XLSX from 'xlsx';

const Downloadexcel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const ws = XLSX.utils.json_to_sheet([], {
      header: ['Segment', 'Account', 'Customer', 'Building', 'Location', 'Mobile', 'Contant Name', 'Status']
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'EmptyCustomerData.xlsx');
   onClose();
  }, [onClose]);

 return null;
};

export default Downloadexcel;
