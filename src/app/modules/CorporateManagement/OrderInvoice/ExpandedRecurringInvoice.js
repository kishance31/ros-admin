import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRecurringInvoice = ({ invoiceRow, firstRecurringFlag }) => {
  const columns = [
    {
      dataField: '_id',
      text: 'id',
      hidden: true,
      footer: '',
    },
    {
      dataField: 'invoiceNo',
      text: 'Invoice. No',
      footer: '',
    },
    {
      dataField: 'invoiceDate',
      text: 'Ord. Date',
      footer: '',
      formatter: cell => new Date(cell).toLocaleDateString()
    },
    {
      dataField: 'productDetails',
      text: 'Total Ord. Cost',
      footer: '',
      // footer: () => {
      //   return invoiceRow.productDetails.reduce((acc, item) => acc + item.ros_cost, 0)
      // },
      formatter: (cell, row) => {
        // if (firstRecurringFlag === "first") {
        return `$${parseFloat(
          invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0))
          .toFixed(2)
          }`
        // } else {
        // 	return `$${parseFloat((
        //     (
        //       (invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) -
        //       (((invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
        //         * invoiceRow.firstPaymentTerm)) / invoiceRow.recurringMonthsNo
        //   )).toFixed(2)}`
        // }
      }
    },
    {
      dataField: 'invoiceDate',
      text: 'Month',
      footer: '',
      formatter: cell => {
        const dt = new Date(cell);
        return dt.toLocaleString('default', {month: 'long'}) + " " + dt.getDate() + ", " + dt.getFullYear()
      }
    },
    {
      dataField: 'monthlyCost',
      text: firstRecurringFlag === "first" ? "First Time Cost" : `Monthly Cost`,
      footer: firstRecurringFlag === "first" ? `Total: $${parseFloat((
        ((invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
        * invoiceRow.firstPaymentTerm))
        .toFixed(2)
        }` :
      `Total: $${parseFloat((
        (
          (invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) -
          (((invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
            * invoiceRow.firstPaymentTerm)) / invoiceRow.recurringMonthsNo
      ) * invoiceRow.invoiceDetails.length
      ).toFixed(2)
        }`,
      formatter: (cell) => {
        if (firstRecurringFlag === "first") {
          return `$${parseFloat((
						((invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
						* invoiceRow.firstPaymentTerm))
						.toFixed(2)
						}`
          } else {
          	return `$${parseFloat((
              (
                (invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) -
                (((invoiceRow.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
                  * invoiceRow.firstPaymentTerm)) / invoiceRow.recurringMonthsNo
            )).toFixed(2)}`
          }
      }
    },
  ];

  return (
    <div className='jumbotron bg-light p-4 ml-5'>
      <BootstrapTable
        keyField='_id'
        data={invoiceRow.invoiceDetails || []}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
      />
    </div>
  );
};

export default ExpandedRecurringInvoice;
