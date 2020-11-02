import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from '../../../../_metronic/_helpers';
import Switch from '@material-ui/core/Switch';

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
                title="Edit user"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => onClickEdit(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                    />
                </span>
            </a>

            <Switch
                checked={row.active}
                size="small"
                className="mt-1"
                onChange={() => ClickDeleteCategoryAsync(row)}
                color="secondary"
                name="userStatus"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                title={row.active ? "Deactivate" : "Activate"}
            />
        </>
    )
}

