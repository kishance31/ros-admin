import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import FirstInvoice from './OrderInvoice/FirstInvoice';
import RecurringInvoice from './OrderInvoice/RecurringInvoice';

const OrderInvoice = () => {
  const [firstRecurringFlag, setFirstRecurringFlag] = useState(true);
  const orderInvoiceData = useSelector(
    (state) => state.orderInvoice.orderInvoiceData
  );

  return (
    <div className='jumbotron p-4'>
      <div className='d-flex justify-content-start'>
        <Button
          variant='link'
          onClick={() => {
            setFirstRecurringFlag(true);
          }}
        >
          First Invoice
        </Button>
        <Button
          variant='link'
          onClick={() => {
            setFirstRecurringFlag(false);
          }}
        >
          Recurring Invoice
        </Button>
      </div>
      {firstRecurringFlag ? (
        <FirstInvoice firstInvoiceData={orderInvoiceData.firstInvoice} />
      ) : (
        <RecurringInvoice
          recurringInvoiceData={orderInvoiceData.recurringInvoice}
        />
      )}
    </div>
  );
};

export default OrderInvoice;
