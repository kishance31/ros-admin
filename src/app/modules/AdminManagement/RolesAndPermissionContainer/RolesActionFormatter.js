import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export const RoleAndPermisionFormatter = (cellContent, row, rowIndex, props) => {
    const { onEditClick, toggleDeleteModel, currentRole } = props
    const editBtnClick = () => {
        onEditClick(rowIndex);
    }
    const deleteBtnClick = () => {
        toggleDeleteModel(row);
    }
    return (
        <>
            <div className="text-center">
                {
                    currentRole && currentRole.types.indexOf("Edit") !== -1 ? (
                        <a
                            title="Edit Role"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                            onClick={editBtnClick}
                        >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                                <SVG title="Edit Role"
                                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                                />
                            </span>
                        </a>
                    ) : null
                }
                {
                    currentRole && currentRole.types.indexOf("Delete") !== -1 ? (
                        <a
                            title="Delete Role"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={deleteBtnClick}
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG title="Delete Role" src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                            </span>
                        </a>
                    ) : null
                }
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