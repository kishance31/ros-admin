import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export function ActionManageUserFormatter(cellContent, row, rowIndex,
    { onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog }) {

    const onEditUser = (row) => {
        console.log(row);
        setSelectedUser(row);
        onOpenModal();
    }

    const onDeleteUser = () => {
        onOpenDialog();
    }

    const activeUser = () => {
        onOpenActiveDialog();
    }

    const deactiveUser = () => {
        onOpenDeactiveDialog();
    }

    return (
        <>
            <ButtonGroup>
                <Button onClick={() => onEditUser(row)} variant="secondary">Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={() => onDeleteUser()}>Delete</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={() => activeUser()}>Active</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={() => deactiveUser()}>Deactive</Button>
            </ButtonGroup>
        </>
    );
}