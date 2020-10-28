import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import { Pagination } from "../../../../_metronic/_partials/controls";
import { NoRecordsFoundMessage, PleaseWaitMessage, } from "../../../../_metronic/_helpers";
import { ActionManageEmailFormatter } from '../EmailTemplateContainer/ActionManageEmailFormatter';
import { ManageEmailTemplateAction } from '../../../actions/manageEmailTemplate.action'

const ManageEmailTable = (props) => {

  const { onOpenModal, setSelectedUser, onOpenDialog, isLoading, totalCount, pageNumber, pageSize } = props
  const { displaylist } = useSelector((state) => state.emailTemplate);
  const dispatch = useDispatch();

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'subject',
      text: 'Subject',
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
  const paginationOptions = {
    custom: true,
    totalSize: 10,
    sizePerPageList: [
      { text: "3", value: 3 },
      { text: "5", value: 5 },
      { text: "10", value: 10 }
    ],
    sizePerPage: pageSize,
    page: pageNumber,
  };
  const noDataIndication = () => {
    return (
      <>
        {
          isLoading ? (
            <PleaseWaitMessage entities={null} />
          ) : (
              <NoRecordsFoundMessage entities={displaylist} />
            )
        }
      </>
    )
  }
  const onTableChange = (type, newState) => {
    if (type === "pagination") {
      if (newState.page && newState.page !== pageNumber) {
        dispatch(ManageEmailTemplateAction.setPage(newState.page));
      }
      if (newState.sizePerPage !== pageSize) {
        dispatch(ManageEmailTemplateAction.setPageSize(newState.sizePerPage));
      }
    }
  }
  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            isLoading={isLoading}
            paginationProps={paginationProps}
          >
            <BootstrapTable
              wrapperClasses='table-responsive'
              hover
              classes='table table-head-custom table-vertical-center'
              bootstrap4
              bordered={false}
              keyField='email'
              data={displaylist}
              columns={columns}
              {...paginationTableProps}
              noDataIndication={noDataIndication}
              onTableChange={onTableChange}
            />
          </Pagination>
        );
      }}
    </PaginationProvider>
  );
};

export default ManageEmailTable;