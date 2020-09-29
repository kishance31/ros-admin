import React from 'react';

const SubTableLicenceType = ({ row }) => {
  return (
    <>
      {row.licenceType.map((licence, index) => (
        <div key={index}>{licence.type}</div>
      ))}
    </>
  );
};

export default (cell, row, rowIndex) => <SubTableLicenceType row={row} />;
