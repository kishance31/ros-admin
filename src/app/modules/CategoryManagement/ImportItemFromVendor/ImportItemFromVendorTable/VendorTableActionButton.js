import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import Switch from '@material-ui/core/Switch';

export const VendorTableActionButtons = (cellContent,
    row,
    rowIndex,
    {
        setSelectedProduct,
        onClickVendorItemAddButton,
        deleteData,
        currentRole
    }
) => {
    const onClickVendorItemEdit = (row) => {
        setSelectedProduct(row)
        onClickVendorItemAddButton()
    }

    const onClickDeleteData = (row) => {
        setSelectedProduct(row)
        deleteData()
    }

    return (

        <>
            {
                currentRole && currentRole.types.indexOf("Edit") !== -1 ? (
                    <a
                        title="Edit Product"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        onClick={() => onClickVendorItemEdit(row)}
                    >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG title="Edit Product"
                                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                            />
                        </span>
                    </a>
                ) : null
            }
            {
                currentRole && (currentRole.types.indexOf("Active") !== -1 || currentRole.types.indexOf("Deactive") !== -1) ? (
                    <Switch
                        checked={row.status}
                        size="small"
                        className="mt-1"
                        onChange={() => onClickDeleteData(row)}
                        color="secondary"
                        name="userStatus"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        title={row.status ? "Activate" : "Deactivate"}
                    />
                ) : null
            }
            {/* <a
                title="Delete customer"
                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                onClick={() => onClickDeleteData(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                </span>
            </a> */}
        </>
    )
}
