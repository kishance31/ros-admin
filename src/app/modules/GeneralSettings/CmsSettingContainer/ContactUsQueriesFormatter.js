import React from 'react';
import { Button } from "react-bootstrap";

const ContactUsQueriesFormatter = (
    cellContent,
    row,
    rowIndex,
    { onOpenReplyModal, setSelectedRow, selectedRow }) => {

    const onReply = (row) => {
        setSelectedRow(row)
        onOpenReplyModal();
    }

    return (
        <div>
            <Button onClick={() => onReply(row)} className="btn btn-icon btn-light btn-sm">
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i className="fa fa-edit" title="Reply"></i>
                </span>
            </Button>
        </div>
    )
}

export default ContactUsQueriesFormatter
