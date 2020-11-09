import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

const FAQFormatter = (cellContent, row, rowIndex,
    { setSelectedFAQ, onOpenFAQModal, onOpenDeleteFAQModal }) => {

    const onEditFAQ = (row) => {
        setSelectedFAQ(row)
        onOpenFAQModal();
    }

    const onDeleteFAQ = () => {
        setSelectedFAQ(row)
        onOpenDeleteFAQModal();
    }

    return (
        <>
            <a
                title="Edit FAQ"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => onEditFAQ(row)}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG title="Edit FAQ"
                        src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                    />
                </span>
            </a>
            <a
                title="Delete FAQ"
                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                onClick={() => onDeleteFAQ()}
            >
                <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG title="Delete FAQ" src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                </span>
            </a>
        </>
    )
}

export default FAQFormatter;
