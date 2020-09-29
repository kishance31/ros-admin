import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButtons = ({ row, activeDeactiveAction }) => {
  return (
    <>
      <Button
        className={row.isActive ? 'd-none' : 'mx-3'}
        size='sm'
        variant='outline-success'
        onClick={() => activeDeactiveAction(row.id, true)}
      >
        Active
      </Button>
      <Button
        className={!row.isActive ? 'd-none' : 'mx-3'}
        size='sm'
        variant='outline-danger'
        onClick={() => activeDeactiveAction(row.id, false)}
      >
        Deactive
      </Button>
    </>
  );
};

export default (cell, row, rowIndex, { activeDeactiveAction }) => (
  <ActionButtons row={row} activeDeactiveAction={activeDeactiveAction} />
);