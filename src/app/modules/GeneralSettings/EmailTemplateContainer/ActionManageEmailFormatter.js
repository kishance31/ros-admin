
// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Switch from '@material-ui/core/Switch';
import { editManageUserAsync } from '../../../actions/manageEmailTemplate.action';

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
      <> </>

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
