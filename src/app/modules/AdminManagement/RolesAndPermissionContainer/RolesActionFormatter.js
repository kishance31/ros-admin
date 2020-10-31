import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

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
            <a
                title="Edit user"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={editBtnClick}
            >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                    />
                </span>
            </a>
            <a
                title="Delete customer"
                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                onClick={deleteBtnClick}
            >
                <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                </span>
            </a>
                {/* <ButtonGroup>
                    <Button className="btn btn-icon btn-light btn-sm mx-3" onClick={editBtnClick}>
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <i className="fa fa-edit" title="Edit"></i>
                        </span>
                    </Button>&nbsp;&nbsp;
                <Button className="btn btn-icon btn-light btn-sm" onClick={deleteBtnClick}>
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <i className="fa fa-trash" title="Delete"></i>
                        </span>
                    </Button>
                </ButtonGroup> */}
            </div>
        </>
    );
}