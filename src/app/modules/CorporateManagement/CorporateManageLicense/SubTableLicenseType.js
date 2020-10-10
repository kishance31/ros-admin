import React from 'react';

const SubTableLicenseType = ({ row }) => {
  return (
    <>
      {row.purchasedLicenses.map((license, index) => (
        <div key={index}>{license.type}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenseType row={row} />;
