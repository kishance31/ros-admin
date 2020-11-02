import React from 'react';
// import { Button } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';

const ActionButtons = ({ row, activeDeactiveAction }) => {
  return (
    <>
      <Switch
        checked={!row.isActive}
        size="small"
        className="mt-1"
        onChange={() => {
          if (row.isActive) {
            activeDeactiveAction(row.orderId, false);
          } else {
            activeDeactiveAction(row.orderId, true);
          }
        }}
        color="secondary"
        name="licenseStatus"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        title={row.isActive ? "Deactivate" : "Activate"}
      />
    </>
  );
};

export default (cell, row, rowIndex, { activeDeactiveAction }) => (
  <ActionButtons row={row} activeDeactiveAction={activeDeactiveAction} />
);
