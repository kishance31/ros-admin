import React from 'react';
import { Table } from 'react-bootstrap';

const ExpandedFirstInvoice = ({ orderDetails }) => {
  return (
    <div className='jumbotron bg-light p-4 ml-5'>
      <Table size='sm'>
        <thead>
          <tr>
            <th>Invoice no</th>
            <th>Invoice Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.invoiceNo}</td>
            <td>{orderDetails.invoiceDate}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ExpandedFirstInvoice;
