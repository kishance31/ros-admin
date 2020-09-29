import React from 'react';
import { useDispatch } from 'react-redux'
import { ClickDeleteCategoryAsync } from '../../../../actions/categoryManagementModal.action'
const ActionFormatter = (cellContent,
    row,
    rowIndex,
    { OnAddCategory, setSelectedCategory,
        onDisplaySubCategory, EditCategory
    }
) => {
    
    const OnEditButtonClick = (row) => {
        OnAddCategory();
        setSelectedCategory(row)
    }

    const onClickSubCategory = (row) => {
        setSelectedCategory(row)
        onDisplaySubCategory();
    }

    const ClickDeleteCategoryAsync = (row) => {
        setSelectedCategory(row)
        EditCategory()
    }
    return (
        <>
            <a
                className="btn btn-info font-weight-bolder font-size-sm mr-3"
                disabled="disabled"
                onClick={() => onClickSubCategory(row)}
            >
                VIEW SUBCATEGORY
                </a>
            <a
                className="btn btn-success font-weight-bolder font-size-sm mr-3"
                onClick={() => OnEditButtonClick(row)}
            >
                EDIT
                </a>
            <a
                className={row.status ? "btn btn-primary font-weight-bolder font-size-sm mr-3" : "btn btn-danger font-weight-bolder font-size-sm mr-3"}
                onClick={() => ClickDeleteCategoryAsync(row)}
            >
                {row.status ? "ACTIVE": "DEACTIVE"}
              
                </a>

        </>
    )
}

export default ActionFormatter;