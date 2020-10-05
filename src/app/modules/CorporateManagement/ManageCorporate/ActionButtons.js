import React from 'react';
import ViewModal from './ViewModal';
import { Button } from 'react-bootstrap';

const ActionButtons = ({ row, approveRejectAction, activeDeactiveAction }) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        className='mx-3'
        size='sm'
        variant='outline-primary'
        onClick={() => handleShow()}
      >
        View
      </Button>
      <ViewModal
        show={show}
        handleClose={handleClose}
        row={row}
        approveRejectAction={approveRejectAction}
      />
      <Button
        className={row.isActive ? 'd-none' : 'mx-3'}
        size='sm'
        variant='outline-success'
        onClick={() => activeDeactiveAction(row._id, true)}
      >
        Active
      </Button>
      <Button
        className={!row.isActive ? 'd-none' : 'mx-3'}
        size='sm'
        variant='outline-danger'
        onClick={() => activeDeactiveAction(row._id, false)}
      >
        Deactive
      </Button>
    </>
  );
};

export default (
  cell,
  row,
  rowIndex,
  { approveRejectAction, activeDeactiveAction }
) => (
  <ActionButtons
    row={row}
    approveRejectAction={approveRejectAction}
    activeDeactiveAction={activeDeactiveAction}
  />
);
