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
        ToggleButton,
        currentRole
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
            {
                currentRole && currentRole.types.indexOf("Edit") !== -1 ? (
                    <a
                        title="Edit License"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        onClick={() => onClickEdit(row)}
                    >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG title="Edit License"
                                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                            />
                        </span>
                    </a>
                ) : null
            }
            {
                currentRole && (currentRole.types.indexOf("Active") !== -1 || currentRole.types.indexOf("Deactive") !== -1) ? (
                    <Switch
                        checked={row.active}
                        size="small"
                        className="mt-1"
                        onChange={() => ClickDeleteCategoryAsync(row)}
                        color="secondary"
                        name="userStatus"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        title={row.active ? "Activate" : "Deactivate"}
                    />
                ) : null
            }
        </>
    )
}

