import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ActionManageUserFormatter } from './TableContainer/ActionManageUserFormatter';
import { ManageUserAction } from '../../../actions/manageUser.action';
//import ManageUserEditDialog from './TableContainer/ManageUserEditDialog'
//import AddUserEditForm from './AddUserEditForm';

export const data = [
  {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 1',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 2',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }, {
    firstName: 'Username 2',
    lastName: 'xyz@example.com',
    emailId: 1001,
    mobile: 'Device name',
    role: 'Device name',
    createDate: 'Device name',
    action: 'Button'
  }
]

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
    dataField: 'emailId',
    text: 'Email ID',
  },
  {
    dataField: 'mobile',
    text: 'Mobile',
  },
  {
    dataField: 'role',
    text: 'Role',
  },
  {
    dataField: 'createDate',
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
  }
]

const ManageUserTable = () => {


  return (
    <div className="container" style={{ marginTop: 50 }}>
      <BootstrapTable
        wrapperClasses="table-responsive"
        hover
        classes="table table-head-custom table-vertical-center"
        bootstrap4
        remote
        bordered={false}
        keyField='id'
        data={data}
        columns={columns}
        pagination={paginationFactory()}
      />
    </div>
  )
}

export default ManageUserTable;

