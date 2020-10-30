import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const FAQFormatter = (cellContent, row, rowIndex,
    { onOpenModal, setSelectedUser, onOpenDialog, onOpenDeactiveDialog }) => {

    const onEditFAQ = (row) => {
        //setSelectedUser(row);
        //onOpenModal();
    }

    const onDeleteFAQ = () => {
        // setSelectedUser(row);
        //onOpenDialog();
    }
    return (
        <>
            <ButtonGroup>
                <Button onClick={() => onEditFAQ()} className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                        <i className="fa fa-edit" title="Edit"></i>
                    </span>
                </Button>
                <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={() => onDeleteFAQ()}>
                    <span className="svg-icon svg-icon-md svg-icon-danger">
                        <i className="fa fa-trash" title="Delete"></i>
                    </span>
                </Button>
            </ButtonGroup>
        </>
    )
}

export default FAQFormatter;
