import React from 'react';

export const VendorTableActionButtons = (cellContent,
    row,
    rowIndex,
    {
        OnAddCategory,setSelectedCategory,
        onClickVendorItemAddButton,
        deleteData
    }
    ) => {
    const onClickVendorItemEdit = (row) => {
       setSelectedCategory(row) 
       onClickVendorItemAddButton()
    }

    const onClickDeleteData = (row) => {
        setSelectedCategory(row) 
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
