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
            <div className="text-center">
                <ButtonGroup>
                    <Button className="btn btn-success font-weight-bolder font-size-sm mr-3" onClick={editBtnClick}>Edit</Button>&nbsp;&nbsp;
                <Button className="btn btn-danger font-weight-bolder font-size-sm mr-3" onClick={deleteBtnClick}>Delete</Button>
                </ButtonGroup>
            </div>
        </>
    );
}