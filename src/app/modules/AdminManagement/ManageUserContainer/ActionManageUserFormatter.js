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
                <Button onClick={() => onEditUser(row)} className="btn btn-icon btn-light btn-sm">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                        <i class="fa fa-edit" title="Edit" title="Edit"></i>
                    </span>

                </Button>
                <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={() => onDeleteUser()}>
                    <span className="svg-icon svg-icon-md svg-icon-danger">
                        <i class="fa fa-trash" title="Delete"></i>
                    </span>

                </Button>
                {
                    row.isActive ? (
                        <Button className="btn btn-icon btn-light btn-sm" onClick={() => deactiveUser()}>
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                                <i class="fa fa-toggle-off" title="Deactive"></i>
                            </span>

                        </Button>
                    ) : (
                            <Button className="btn btn-icon btn-light btn-sm" onClick={() => activeUser()}>
                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                    <i class="fa fa-toggle-on" title="Acitve"></i>
                                </span>
                            </Button>
                        )
                }
            </ButtonGroup>
        </>
    );
}