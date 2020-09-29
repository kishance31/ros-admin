import React from 'react';

export const VendorTableActionButtons = (cellContent,
    row,
    rowIndex,
    {
        // OnAddCategory,setSelectedCategory,
        onClickVendorItemAddButton
    }
    ) => {
    const onClickVendorItemEdit = (row) => {
        onClickVendorItemAddButton()
    }

    return (
        
        <>
        <a
            className="btn btn-info font-weight-bolder font-size-sm mr-3"
            onClick={() => onClickVendorItemEdit(row)}
        >
            EDIT
        </a>
        
        <a
            className="btn btn-success font-weight-bolder font-size-sm mr-3"
            // onClick={() => OnEditButtonClick(row)}
        >
             ACTIVE
        </a>

        <a
            className="btn btn-danger font-weight-bolder font-size-sm mr-3"
            // onClick={() => ClickDeleteCategoryAsync(row)}
        >
            DEACTIVE
        </a>
    </> 
    )
}
