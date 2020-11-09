import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Switch from '@material-ui/core/Switch';

export function ActionManageUserFormatter(cellContent, row, rowIndex,
    { onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog, currentRole }) {

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
            {
                currentRole && currentRole.types.indexOf("Edit") !== -1 ? (
                    <a
                        title="Edit User"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        onClick={() => onEditUser(row)}
                    >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG title="Edit user"
                                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                            />
                        </span>
                    </a>
                ) : null
            }
            {
                currentRole && currentRole.types.indexOf("Delete") !== -1 ? (
                    <a
                        title="Delete User"
                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                        onClick={() => onDeleteUser()}
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG title="Delete User" src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                        </span>
                    </a>
                ) : null
            }
            {
                currentRole && (currentRole.types.indexOf("Active") !== -1 || currentRole.types.indexOf("Deactive") !== -1) ? (
                    <Switch
                        checked={row.isActive}
                        size="small"
                        className="mt-1"
                        onChange={() => {
                            if (row.isActive) {
                                deactiveUser();
                            } else {
                                activeUser();
                            }
                        }}
                        color="secondary"
                        name="userStatus"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        title={row.isActive ? "Activate" : "Deactivate"}
                    />
                ) : null
            }



            {/* <ButtonGroup>
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
            </ButtonGroup> */}
        </>
    );
}