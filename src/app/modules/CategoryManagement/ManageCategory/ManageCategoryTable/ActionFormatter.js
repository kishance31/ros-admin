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
        if (categorySelected === "category") {
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
        if (categorySelected === "category") {
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
                        className="btn btn-icon btn-light btn-sm"
                        disabled="disabled"
                        onClick={() => onClickSubCategory(row)}>
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <i class="fa fa-eye" title="View Subcategory"></i>
                        </span>

                    </a>
                ) : null
            }
            <a
                className="btn btn-icon btn-light btn-sm mx-3"
                onClick={() => OnEditButtonClick(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i class="fa fa-edit" title="Edit" title="Edit"></i>
                </span>
            </a>
            <a
                className={`btn btn-${row.status ? 'btn btn-icon btn-light btn-sm' : 'btn btn-icon btn-light btn-sm'} `}
                onClick={() => ClickDeleteCategoryAsync(row)}
            >
                {row.status ?
                    (<span className="svg-icon svg-icon-md svg-icon-primary">
                        <i class="fa fa-toggle-on" title="Acitve"></i>
                    </span>
                    )
                    :
                    (<span className="svg-icon svg-icon-md svg-icon-primary">
                        <i class="fa fa-toggle-off" title="Deactive"></i>
                    </span>)

                }

            </a>

        </>
    )
}

export default ActionFormatter;