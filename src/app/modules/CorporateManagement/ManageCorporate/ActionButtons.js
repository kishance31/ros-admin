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
          className='mx-3 btn btn-icon btn-light btn-sm mx-3'
          size='sm'
          variant=''
          onClick={() => handleShow()}
        >
          <i class="fa fa-eye" title="View"></i>
        </Button>
        <ViewModal
          show={show}
          handleClose={handleClose}
          row={row}
          approveRejectAction={approveRejectAction}
        />
        <Button
          className={row.isActive ? 'd-none' : 'mx-3 btn btn-icon btn-light btn-sm mx-3'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, true)}
        >
          <i class="fa fa-toggle-on" title="Acitve"></i>

        </Button>
        <Button
          className={!row.isActive ? 'd-none' : 'mx-3 btn btn-icon btn-light btn-sm mx-3'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, false)}
        >
          <i class="fa fa-toggle-off" title="Deactive"></i>

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
