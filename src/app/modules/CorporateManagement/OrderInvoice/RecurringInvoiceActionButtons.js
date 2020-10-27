import React from 'react';
import { Button } from 'react-bootstrap';

export const RecurringInvoiceActionButtons = (cell, row, rowIdx, {onDownloadPdf}) => {
  console.log(row)
  return (
    <>
      {/* <Button className='mx-1 btn_blue' size='sm' variant=''>
        View Invoice
      </Button>
      <Button className='mx-1 btn-success' size='sm' variant=''>
        Resend Invoice
      </Button> */}
      <Button className='mx-1 btn-danger' size='sm' variant=''
        onClick={() => onDownloadPdf(row)}
      >
        Download
      </Button>
    </>
  );
};
