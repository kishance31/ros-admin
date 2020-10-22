import React from 'react';
import { ToggleButton } from 'react-bootstrap';

export const EditButtons = (cellContent,
    row,
    rowIndex,
    {
        openModal,
        setSelectedLicense,
        ToggleButton
    }
    ) => {
    const onClickEdit = (row) => {
       openModal()
       setSelectedLicense(row)        
    }

    const ClickDeleteCategoryAsync = (row) => {
        setSelectedLicense(row)
        ToggleButton()
    }
    return (
        
        <>
        <a
            className="btn btn-success font-weight-bolder font-size-sm mr-3"
            onClick={() => onClickEdit(row)}
        >
            EDIT
        </a>
        
        <a
                className={row.status ? "btn btn-danger font-weight-bolder font-size-sm mr-3" : "btn btn_blue font-weight-bolder font-size-sm mr-3"}
                onClick={() => ClickDeleteCategoryAsync(row)}
            >
                {!row.active ? "ACTIVE": "DEACTIVE"}
                  
              
                </a>
    </> 
    )
}

