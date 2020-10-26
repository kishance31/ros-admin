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
                    <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={editBtnClick}>
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <i class="fa fa-edit" title="Edit"></i>
                        </span>
                    </Button>&nbsp;&nbsp;
                <Button className="btn btn-icon btn-light btn-sm" onClick={deleteBtnClick}>
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <i class="fa fa-trash" title="Delete"></i>
                        </span>
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}