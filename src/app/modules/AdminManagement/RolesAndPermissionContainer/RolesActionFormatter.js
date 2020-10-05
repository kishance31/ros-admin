import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export const RoleAndPermisionFormatter = (cellContent, row, rowIndex, props) => {
    const { onEditClick, toggleDeleteModel } = props
    const editBtnClick = () => {
        onEditClick(rowIndex);
    }
    const deleteBtnClick = () => {
        toggleDeleteModel(row);
    }
    return (
        <>
            <ButtonGroup>
                <Button variant="secondary" onClick={editBtnClick}>Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary" onClick={deleteBtnClick}>Delete</Button>
            </ButtonGroup>
        </>
    );
}