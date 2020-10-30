import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import Switch from '@material-ui/core/Switch';

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
                        title="View Sub-Category"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        onClick={() => onClickSubCategory(row)}
                    >
                        <i class="fa fa-eye" style={{ color: "#3699FF" }}></i>
                    </a>
                ) : null
            }

            <a
                title="Edit"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => OnEditButtonClick(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                    />
                </span>
            </a>

            <Switch
                checked={row.status}
                size="small"
                className="mt-1"
                onChange={() => ClickDeleteCategoryAsync(row)}
                color="secondary"
                name="userStatus"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                title={row.status ? "Deactivate" : "Activate"}
            />

            {/* <a
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

            </a> */}

        </>
    )
}

export default ActionFormatter;