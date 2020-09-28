import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ActionManageUserFormatter } from './TableContainer/ActionManageUserFormatter';
import { displayManageUserDataAsync } from '../../../actions/manageUser.action';
//import ManageUserEditDialog from './TableContainer/ManageUserEditDialog';

const ManageUserTable = () => {
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
      // formatExtraData: {
      //   ManageUserEditDialog: ManageUserEditDialog,
      // },
    },
  ];
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
