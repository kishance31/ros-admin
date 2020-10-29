import React from "react";

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
        className="btn btn-icon btn-light btn-sm"
        onClick={() => onEditUser(row, rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <i class="fa fa-edit" title="Edit"></i>
        </span>
      </a>
      <> </>

      <a
        title="Delete customer"
        className="btn btn-icon btn-light btn-sm mx-3"
        onClick={() => onDeleteUser(row, rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <i class="fa fa-trash" title="Delete"></i>
        </span>
      </a>
    </>
  );
}
