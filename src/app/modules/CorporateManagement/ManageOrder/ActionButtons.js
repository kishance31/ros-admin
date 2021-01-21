import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import ViewModal from './ViewModal';
import SendOrderToVendorBox from './SendOrderToVendorBox';

const ActionButtons = ({ row, orderId, confirmNewOrder, manageOrderDispatchUpdate }) => {

  const [show, setShow] = useState(false);
  const [showVendor, setshowVendor] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCloseVendor = () => {
    setshowVendor(false);
  };

  const handleShowVendor = () => {
    setshowVendor(true);
  };

  const confirmOrder = (row) => {
    confirmNewOrder(row);
  };

  return (
    <>
      {
        row.status === "pending" ?
          <Button
            className={'mx-1'}
            size='sm'
            variant='outline-primary'
            onClick={() => confirmOrder(row)}
          >
            Confirm
      </Button> :
          null
      }

      {
        row.status !== "pending" ?
          <Button
            className={'mx-1'}
            size='sm'
            variant='outline-success'
            onClick={() => handleShow()}
          >
            Manage
      </Button> : null
      }
      <ViewModal
        show={show}
        handleClose={handleClose}
        row={row}
        orderId={orderId}
        manageOrderDispatchUpdate={manageOrderDispatchUpdate}
      />

      { row.status !== "pending" && row.deliveryStatus === "pending" &&
        <Button
          className='mx-1'
          size='sm'
          variant='outline-info'
          onClick={() => handleShowVendor()}
        >
          Send order to vender
      </Button>
      }
      <SendOrderToVendorBox
        show={showVendor}
        handleClose={handleCloseVendor}
        row={row}
      />
    </>
  );
};

export default (
  cell,
  row,
  rowIndex,
  { orderId, confirmNewOrder, manageOrderDispatchUpdate }
) => (
    <ActionButtons
      row={row}
      orderId={orderId}
      confirmNewOrder={confirmNewOrder}
      manageOrderDispatchUpdate={manageOrderDispatchUpdate}
    />
  );
