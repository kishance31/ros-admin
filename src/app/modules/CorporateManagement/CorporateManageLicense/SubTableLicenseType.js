import React from 'react';

const SubTableLicenseType = ({ row }) => {
  console.log(row);
  return (
    <>
      {row.licenseType.map((license, index) => (
        <div key={index}>{license.type}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenseType row={row} />;
