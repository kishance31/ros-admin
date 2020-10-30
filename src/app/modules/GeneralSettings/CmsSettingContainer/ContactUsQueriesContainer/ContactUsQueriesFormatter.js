import React from 'react';
import { Button } from "react-bootstrap";

const ContactUsQueriesFormatter = (
    cellContent,
    row,
    rowIndex,
    { onOpenReplyModal, setSelectedRow, selectedRow }) => {

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
                    // <Button onClick={() => onReply()} className="btn btn-icon btn-light btn-sm">
                    //     <span className="svg-icon svg-icon-md svg-icon-primary">
                    //         <i className="fa fa-edit" title="Reply"></i>
                    //     </span>
                    // </Button>
                ) : null
            }
        </div>
    )
}

export default ContactUsQueriesFormatter;
