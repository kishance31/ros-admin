import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';

import SubTableLicenseType from './CorporateManageLicense/SubTableLicenseType';
import SubTableLicenseNo from './CorporateManageLicense/SubTableLicenseNo';
import ActionButtons from './CorporateManageLicense/ActionButtons';
import { corporateManageLicenseAction } from '../../actions/corporateManageLicense.action';

const CorporateManageLicense = () => {
  const dispatch = useDispatch();
  const corporateManageLicenseData = useSelector(
    (state) => state.corporateManageLicense.corporateManageLicenseData
  );
  console.log(corporateManageLicenseData);
  const activeDeactiveAction = (id, isActive) => {
    dispatch(
      corporateManageLicenseAction.updateCorporateManageLicenseIsActive(
        id,
        isActive
      )
    );
  };

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-4'>
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '3',
        value: 3,
      },
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: 'All',
        value: corporateManageLicenseData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'id',
      text: 'Sr no.',
    },
    {
      dataField: 'orderNo',
      text: 'Order No',
    },
    {
      dataField: 'orderDate',
      text: 'Order Date',
    },
    {
      dataField: 'licenseType',
      text: 'License Type',
      formatter: SubTableLicenseType,
    },
    {
      dataField: 'liceneType',
      text: 'No of License',
      formatter: SubTableLicenseNo,
    },
    {
      dataField: 'licenseCost',
      text: 'License Cost (USD)',
    },
    {
      dataField: 'status',
      text: 'Status',
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: ActionButtons,
      formatExtraData: {
        activeDeactiveAction: activeDeactiveAction,
      },
    },
  ];

  return (
    <BootstrapTable
      keyField='id'
      data={
        corporateManageLicenseData === null ? [] : corporateManageLicenseData
      }
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      pagination={paginationFactory(options)}
    />
  );
};

export default CorporateManageLicense;
