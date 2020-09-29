import React from 'react';

const SubTableLicenceNo = ({ row }) => {
  return (
    <>
      {row.licenceType.map((licence, index) => (
        <div key={index}>{licence.noOfLicence}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenceNo row={row} />;
