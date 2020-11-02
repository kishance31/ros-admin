import React from 'react';

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
            <button
                className="btn btn-icon btn-sm"
                onClick={() => onEditFAQ(row)}
            >
                <i className="fas fa-edit" style={{ color: "#2f72ef" }} title="Edit"></i>
            </button>
            <button
                className="btn btn-icon btn-sm"
                onClick={() => onDeleteFAQ()}
            >
                <i className="fa fa-trash" style={{ color: "#2f72ef" }} title="Delete"></i>
            </button>
        </>
    )
}

export default FAQFormatter;
