import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import NewOrder from './NewOrder';
import PastOrder from './PastOrder';

const ExpandedRowLevelOne = ({
  row,
  confirmNewOrder,
  manageOrderDispatchUpdate,
}) => {
  const [newPastFlag, setNewPastFlag] = useState(true);

  return (
    <div className='jumbotron p-4'>
      <div className='d-flex justify-content-start'>
        <Button
          variant='link'
          onClick={() => {
            setNewPastFlag(true);
          }}
        >
          New Order
        </Button>
        <Button
          variant='link'
          onClick={() => {
            setNewPastFlag(false);
          }}
        >
          Past Order
        </Button>
      </div>
      {newPastFlag ? (
        <NewOrder
          row={row}
          confirmNewOrder={confirmNewOrder}
          manageOrderDispatchUpdate={manageOrderDispatchUpdate}
        />
      ) : (
        <PastOrder pastOrder={row.pastOrder} />
      )}
    </div>
  );
};

export default ExpandedRowLevelOne;
