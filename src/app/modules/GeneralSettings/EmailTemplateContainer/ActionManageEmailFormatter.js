
// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import {  editManageUserAsync } from '../../../actions/manageEmailTemplate.action';

export function ActionManageEmailFormatter(
  cellContent,
  row,
  rowIndex,
  { onOpenModal, setSelectedUser, onOpenDialog }
) 
{
    const onEditUser = (row) => {
        setSelectedUser(row,rowIndex);
        onOpenModal();
    }
    
    const onDeleteUser = () => {
        setSelectedUser(row,rowIndex);
        onOpenDialog();
    }

  return (
    <>
      <a
        title="Edit customer"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => onEditUser(row,rowIndex)}
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
        onClick={() => onDeleteUser(row,rowIndex)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </>
  );
}
