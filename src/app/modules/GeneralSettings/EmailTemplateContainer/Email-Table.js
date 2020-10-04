import React from 'react';
import { useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ActionManageEmailFormatter } from '../EmailTemplateContainer/ActionManageEmailFormatter';

const ManageEmailTable = ({ onOpenModal, setSelectedUser, onOpenDialog }) => {


  const  {displaylist}  = useSelector(
    (state) => state.emailTemplate
  );


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
        value: displaylist.length,
      },
    ],
  };
  const columns = [
    {
      dataField: 'templateName',
      text: 'Template Name',
    },
    {
      dataField: 'templateEntities',
      text: 'Template Entities',
    },    
    {
      dataField: 'entities',
      text: 'Entities',
    },
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'button',
      text: 'Actions',
      headerAlign: 'center',
      formatter: ActionManageEmailFormatter,
      formatExtraData: {
        onOpenModal: onOpenModal,
        setSelectedUser: setSelectedUser,
        onOpenDialog: onOpenDialog,
      },
    }
  ]
  return (
    <div className='container' style={{ marginTop: 50 }}>
      <BootstrapTable
        wrapperClasses='table-responsive'
        hover
        classes='table table-head-custom table-vertical-center'
        bootstrap4
        bordered={false}
        keyField='email'
        data={displaylist}
        columns={columns}
        pagination={paginationFactory(options)}
      />
    </div>
  );
};

export default ManageEmailTable;
