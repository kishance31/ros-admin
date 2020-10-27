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
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i class="fa fa-eye" title="View"></i>
          </span>
        </Button>
        <ViewModal
          show={show}
          handleClose={handleClose}
          row={row}
          approveRejectAction={approveRejectAction}
        />
        <Button
          className={row.isActive ? 'd-none' : 'btn btn-icon btn-light btn-sm'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, true)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i class="fa fa-toggle-on" title="Acitve"></i>
          </span>
        </Button>
        <Button
          className={!row.isActive ? 'd-none' : 'btn btn-icon btn-light btn-sm'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, false)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i class="fa fa-toggle-off" title="Deactive"></i>
          </span>
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
