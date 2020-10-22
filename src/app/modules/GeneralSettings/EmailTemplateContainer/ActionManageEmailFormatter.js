import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export function ActionManageEmailFormatter(
  cellContent,
  row,
  rowIndex,
  { onOpenModal, setSelectedUser, onOpenDialog }) {

  const onEditUser = (row) => {
    setSelectedUser(row, rowIndex);
    onOpenModal();
  }

  const onDeleteUser = () => {
    setSelectedUser(row, rowIndex);
    onOpenDialog();
  }

  return (
    <>
      <a
        title="Edit customer"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => onEditUser(row, rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
      <> </>

      <a
        title="Delete customer"
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => onDeleteUser(row, rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </>
  );
}
