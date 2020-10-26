import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';

export const VendorTableActionButtons = (cellContent,
    row,
    rowIndex,
    {
        setSelectedProduct,
        onClickVendorItemAddButton,
        deleteData
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
            <a
                className="btn btn-icon btn-light btn-sm mx-3"
                onClick={() => onClickVendorItemEdit(row)} >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i class="fa fa-edit" title="Edit"></i>
                </span>

            </a>

            <a
                className="btn btn-icon btn-light btn-sm mx-3"
                onClick={() => onClickDeleteData(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-danger">
                    <i class="fa fa-trash" title="Delete"></i>
                </span>

            </a>
        </>
    )
}
