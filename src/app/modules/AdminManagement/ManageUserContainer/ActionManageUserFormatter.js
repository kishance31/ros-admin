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
                <Button onClick={() => onEditUser(row)} variant="secondary">Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={() => onDeleteUser()}>Delete</Button>&nbsp;&nbsp;
                {
                    row.isActive ? (
                        <Button variant="secondary" onClick={() => deactiveUser()}>Deactive</Button>
                    ) : (
                        <Button variant="secondary" onClick={() => activeUser()}>Active</Button>
                    )
                }
            </ButtonGroup>
        </>
    );
}