import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Pagination } from "../../../../_metronic/_partials/controls";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../_metronic/_helpers";
import { ActionManageUserFormatter } from '../ManageUserContainer/ActionManageUserFormatter';
import { ManageUserAction } from '../../../actions/manageUser.action'

const ManageUserTable = (props) => {

  const {
    onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog,
    isLoading,
    totalCount,
    pageNumber,
    pageSize
  } = props;

  const dispatch = useDispatch();

  const { displaylist } = useSelector(
    (state) => state.manageUser
  );

  const columns = [
    {
      dataField: 'firstName',
      text: 'Firstname',
    },
    {
      dataField: 'lastName',
      text: 'Lastname',
    },
    {
      dataField: 'email',
      text: 'Email ID',
    },
    {
      dataField: 'mobileNo',
      text: 'Mobile',
    },
    {
      dataField: 'roleName.roleName',
      text: 'Role',
    },
    {
      dataField: 'createdAt',
      text: 'Create Date',
      formatter: (cellContent) => new Date(cellContent).toLocaleDateString(),
    },
    {
      dataField: 'button',
      text: 'Actions',
      headerAlign: 'center',
      formatter: ActionManageUserFormatter,
      formatExtraData: {
        onOpenModal: onOpenModal,
        setSelectedUser: setSelectedUser,
        onOpenDialog: onOpenDialog,
        onOpenActiveDialog: onOpenActiveDialog,
        onOpenDeactiveDialog: onOpenDeactiveDialog
      },
    }
  ]

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
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
        dispatch(ManageUserAction.setPage(newState.page));
      }
      if (newState.sizePerPage !== pageSize) {
        dispatch(ManageUserAction.setPageSize(newState.sizePerPage));
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
              wrapperClasses="table-responsive"
              hover={false}
              bordered={false}
              classes="table table-head-custom table-vertical-center overflow-hidden center-last-col"
              bootstrap4
              remote
              keyField='email'
              data={displaylist}
              columns={columns}
              {...paginationTableProps}
              noDataIndication={noDataIndication}
              onTableChange={onTableChange}
            >
            </BootstrapTable>
          </Pagination>
        );
      }}
    </PaginationProvider>
  );
};

export default ManageUserTable;