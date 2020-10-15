import React from 'react';

const SubTableLicenseNo = ({ row }) => {
  return (
    <>
      {row.purchasedLicenses.map((license, index) => (
        <div key={index}>{license.quantity}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenseNo row={row} />;
