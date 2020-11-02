import React from 'react';

const ContactUsQueriesFormatter = (
    cellContent,
    row,
    rowIndex,
    { onOpenReplyModal, setSelectedRow }) => {

    const onReply = () => {
        setSelectedRow(row)
        onOpenReplyModal();
    }

    return (
        <div>
            {
                !row.isReplied ? (
                    <button
                        className="btn btn-icon btn-sm"
                        onClick={() => onReply()}
                    >
                        <i className="fas fa-edit" style={{ color: "#2f72ef" }} title="Edit"></i>
                    </button>
                ) : null
            }
        </div>
    )
}

export default ContactUsQueriesFormatter;
