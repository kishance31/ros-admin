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

  const confirmOrder = () => {
    let today = moment(new Date()).format('DD/MM/YYYY');
    confirmNewOrder(orderId, row.newOrderId, true, today);
  };

  return (
    <>
      <Button
        className={row.orderConfirm ? 'd-none' : 'mx-1'}
        size='sm'
        variant='outline-primary'
        onClick={() => confirmOrder()}
      >
        Confirm
      </Button>

      <Button
        className={!row.orderConfirm ? 'd-none' : 'mx-1'}
        size='sm'
        variant='outline-success'
        onClick={() => handleShow()}
      >
        Manage
      </Button>
      <ViewModal
        show={show}
        handleClose={handleClose}
        row={row}
        orderId={orderId}
        manageOrderDispatchUpdate={manageOrderDispatchUpdate}
      />

      <Button
        className='mx-1'
        size='sm'
        variant='outline-info'
        onClick={() => handleShowVendor()}
      >
        Send order to vender
      </Button>
      <SendOrderToVendorBox
        show={showVendor}
        handleClose={handleCloseVendor}
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
