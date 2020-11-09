import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Switch from '@material-ui/core/Switch';

export function ActionManageEmailFormatter(
  cellContent,
  row,
  rowIndex,
  { onOpenModal, setSelectedUser, onOpenDialog, currentRole }
) {

  const onEditUser = (row) => {
    setSelectedUser(row);
    onOpenModal();
  }

  const onActiveEmail = () => {
    setSelectedUser(row);
    onOpenDialog();
  }

  return (
    <div className="d-flex align-items-center">
      {
        currentRole && currentRole.types.indexOf("Edit") !== -1 ? (
          <a
            title="Edit Email Template"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => onEditUser(row, rowIndex)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG title="Edit Email Template"
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
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
            onChange={onActiveEmail}
            color="secondary"
            name="emailStatus"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            title={row.isActive ? "Activate" : "Deactivate"}
          />
        ) : null
      }

    </div>
  );
}
