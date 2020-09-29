import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ActionManageUserFormatter } from '../ManageUserContainer/ActionManageUserFormatter';
import { displayManageUserDataAsync } from '../../../actions/manageUser.action';

const ManageUserTable = ({ onOpenModal, setSelectedUser, onOpenDialog, onOpenActiveDialog, onOpenDeactiveDialog }) => {

  const dispatch = useDispatch();

  const { displaylist, refreshManageUserData } = useSelector(
    (state) => state.manageUser
  );

  useEffect(() => {
    if (refreshManageUserData) {
      dispatch(displayManageUserDataAsync());
    }
  }, [refreshManageUserData, dispatch]);

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
      dataField: 'role',
      text: 'Role',
    },
    {
      dataField: 'createdAt',
      text: 'Create Date',
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
