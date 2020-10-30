import React from "react";
import Switch from '@material-ui/core/Switch';

export function ActionManageEmailFormatter(
  cellContent,
  row,
  rowIndex,
  { onOpenModal, setSelectedUser, onOpenDialog }
) {

  const onEditUser = (row) => {
    setSelectedUser(row);
    onOpenModal();
  }
  
  const onActiveEmail = () => {
    console.log(row)
    setSelectedUser(row);
    onOpenDialog();
  }

  return (
    <div className="d-flex align-items-center">
      <button
        className="btn btn-icon btn-sm"
        onClick={() => onEditUser(row, rowIndex)}
      >
        <i className="fas fa-edit" style={{ color: "#2f72ef" }} title="Edit"></i>
      </button>

      <Switch
        checked={row.isActive}
        size="small"
        className="mt-1"
        onChange={onActiveEmail}
        color="secondary"
        name="emailStatus"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        title="Deactivate"
      />
    </div>
  );
}
