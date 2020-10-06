import React from 'react';

const SubTableLicenseNo = ({ row }) => {
  return (
    <>
      {row.licenseType.map((license, index) => (
        <div key={index}>{license.noOfLicense}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenseNo row={row} />;
