import React from 'react';
import Switch from '@material-ui/core/Switch';

const ActionButtons = ({ row, activeDeactiveAction }) => {
    return (
        <>
            <Switch
                checked={row.isActive}
                size="small"
                className="mt-1"
                onChange={() => {
                    if (row.isActive) {
                        activeDeactiveAction(row._id, false);
                    } else {
                        activeDeactiveAction(row._id, true);
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
