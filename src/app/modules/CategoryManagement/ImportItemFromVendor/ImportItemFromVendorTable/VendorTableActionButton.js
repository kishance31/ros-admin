import React from 'react';

export const VendorTableActionButtons = (cellContent,
    row,
    rowIndex,
    {
        setSelectedProduct,
        onClickVendorItemAddButton,
        deleteData
    }
    ) => {
    const onClickVendorItemEdit = (row) => {
       setSelectedProduct(row) 
       onClickVendorItemAddButton()
    }

    const onClickDeleteData = (row) => {
        setSelectedProduct(row) 
        deleteData()
    }

    return (
        
        <>
        <a
            className="btn btn-success font-weight-bolder font-size-sm mr-3"
            onClick={() => onClickVendorItemEdit(row)}
        >
            EDIT
        </a>
        
        <a
            className="btn btn-danger font-weight-bolder font-size-sm mr-3"
            onClick={() => onClickDeleteData(row)}
        >
             DELETE
        </a>
    </> 
    )
}
