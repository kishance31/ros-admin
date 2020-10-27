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
                className="btn btn-icon btn-light btn-sm mx-3"
                onClick={() => onClickEdit(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i class="fa fa-edit" title="Edit"></i>
                </span>
            </a>

            <a
                className={row.status ? "btn btn-icon btn-light btn-sm mx-3" : "btn btn-icon btn-light btn-sm mx-3"}
                onClick={() => ClickDeleteCategoryAsync(row)}
            >
                {!row.active ?
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

