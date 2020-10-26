import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export function ActionManageUserFormatter(cellContent, row, rowIndex,
    { onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog }) {

    const onEditUser = (row) => {
        setSelectedUser(row);
        onOpenModal();
    }

    const onDeleteUser = () => {
        setSelectedUser(row);
        onOpenDialog();
    }

    const activeUser = () => {
        setSelectedUser(row);
        onOpenActiveDialog();
    }

    const deactiveUser = () => {
        setSelectedUser(row);
        onOpenDeactiveDialog();
    }

    return (
        <>
            <ButtonGroup>
                <Button onClick={() => onEditUser(row)} className="btn btn-icon btn-light btn-sm mx-3">
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <i class="fa fa-edit" title="Edit" title="Edit"></i>
                </span>

                    </Button>&nbsp;&nbsp;
                <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={() => onDeleteUser()}>Delete</Button>&nbsp;&nbsp;
                {
                    row.isActive ? (
                        <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={() => deactiveUser()}>Deactive</Button>
                    ) : (
                            <Button className="btn btn-blue font-weight-bolder font-size-sm mr-3" onClick={() => activeUser()}>Active</Button>
                        )
                }
            </ButtonGroup>
        </>
    );
}