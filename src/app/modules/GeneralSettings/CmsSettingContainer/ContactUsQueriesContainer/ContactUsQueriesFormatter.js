import React from 'react';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

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
                    <a
                        title="View and Reply"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        onClick={() => onReply()}
                    >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG title="View and Reply"
                                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                            />
                        </span>
                    </a>

                ) : null
            }
        </div>
    )
}

export default ContactUsQueriesFormatter;
