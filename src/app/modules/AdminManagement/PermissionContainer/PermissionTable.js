import React, {useRef} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export const data = [   
  {
    formName: 'Manage User',
    add: <input type="checkbox" />
  },{
    formName: 'Roles & Permission',
  },{
    formName: 'Permission',
  },{
    formName: 'Categoty Management',
  },{
    formName: 'Item/License Management',
  },{
    formName: 'Corporate Management',
  },{
    formName: 'Invoice Management',
  },{
    formName: 'General Settings',
  }
]

export const columns = [
  {
    dataField: 'formName',
    text: 'Form name',
  },
  {
    dataField: 'add',
    text: 'Add',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'edit',
    text: 'Edit',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'view',
    text: 'View',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'delete',
    text: 'Delete',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'active',
    text: 'Active',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'deactive',
    text: 'Deactive',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'approve',
    text: 'Approve',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
  {
    dataField: 'reject',
    text: 'Reject',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  },
];

const PermissionTable = () => {
  const tableRef = useRef();
  const onTableChange = () => {
    console.log(tableRef.current)
  }

  return (
    <div className="container" style={{ marginTop: 25 }}>
      <button onClick={onTableChange}>GET</button>
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
        ref={tableRef}
        cellEdit={ cellEditFactory({blurToSave: true }) }
      />
    </div>
  )
}

export default PermissionTable;

