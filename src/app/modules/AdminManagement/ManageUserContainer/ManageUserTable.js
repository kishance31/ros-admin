import React from 'react';
import { useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ActionManageUserFormatter } from '../ManageUserContainer/ActionManageUserFormatter';

const ManageUserTable = ({ onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog }) => {


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
      dataField: 'roleName',
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
  return (
    <div className='container' style={{ marginTop: 50 }}>
      <BootstrapTable
        wrapperClasses='table-responsive'
        hover
        classes='table table-head-custom table-vertical-center'
        bootstrap4
        remote
        bordered={false}
        keyField='email'
        data={displaylist}
        columns={columns}
        pagination={paginationFactory()}
      />
    </div>
  );
};

export default ManageUserTable;
