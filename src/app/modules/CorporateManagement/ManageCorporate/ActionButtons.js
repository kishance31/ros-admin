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
      <div className="d-flex justify-content-center">
        <Button
          className='mx-3 btn-success'
          size='sm'
          variant=''
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
          className={row.isActive ? 'd-none' : 'mx-3 btn_blue'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, true)}
        >
          Active
      </Button>
        <Button
          className={!row.isActive ? 'd-none' : 'mx-3 btn-danger'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, false)}
        > 
          Deactive
      </Button>
      </div>
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
