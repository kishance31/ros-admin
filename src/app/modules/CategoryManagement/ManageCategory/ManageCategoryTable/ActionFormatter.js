import React from 'react';
const ActionFormatter = (cellContent,
    row,
    rowIndex,
    { OnAddCategory, setSelectedCategory, setSelectedSubCategory,
        onDisplaySubCategory, EditCategory, categorySelected
    }
) => {

    const OnEditButtonClick = (row) => {
        OnAddCategory();
        if(categorySelected === "category") {
            setSelectedCategory(row)
        } else {
            setSelectedSubCategory(row);
        }
    }

    const onClickSubCategory = (row) => {
        setSelectedCategory(row)
        onDisplaySubCategory();
    }

    const ClickDeleteCategoryAsync = (row) => {
        if(categorySelected === "category") {
            setSelectedCategory(row)
        } else {
            setSelectedSubCategory(row);
        }
        EditCategory()
    }
    return (
        <>
            {
                categorySelected === "category" ? (
                    <a
                        className="btn btn_blue font-weight-bolder font-size-sm mr-3"
                        disabled="disabled"
                        onClick={() => onClickSubCategory(row)}
                    >
                        VIEW SUBCATEGORY
                    </a>
                ) : null
            }
            <a
                className="btn btn-success font-weight-bolder font-size-sm mr-3"
                onClick={() => OnEditButtonClick(row)}
            >
                EDIT
                </a>
            <a
                className={`btn btn-${row.status ? 'danger' : 'primary'} font-weight-bolder font-size-sm mr-3`}
                onClick={() => ClickDeleteCategoryAsync(row)}
            >
                {row.status ? "DEACTIVE" : "ACTIVE"}

            </a>

        </>
    )
}

export default ActionFormatter;