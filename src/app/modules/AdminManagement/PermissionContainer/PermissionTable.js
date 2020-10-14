import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';

const CheckBoxInput = (props) => {
  const { value, onUpdate } = props;
  return (
    <input type="checkbox" style={{ marginLeft: 10 }} checked={value}
      onChange={(event) => {
        onUpdate(event.target.checked)
      }}
    />
  );
}
const PermissionTable = () => {

  let tableData = [
    {
      formName: 'Manage User',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Roles & Permission',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Permission',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Categoty Management',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Item/License Management',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Corporate Management',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'Invoice Management',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }, {
      formName: 'General Settings',
      add: false,
      edit: false,
      view: false,
      delete: false,
      active: false,
      deactive: false,
      approve: false,
      reject: false,
    }
  ]
  const [data, setData] = useState(tableData)

  const editorMethod = (editorProps, value) => {
    return (
      <CheckBoxInput {...editorProps} value={value} />
    )
  }

  const columns = [
    {
      dataField: 'formName',
      text: 'Form name',
    },
    {
      dataField: 'add',
      text: 'Add',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'edit',
      text: 'Edit',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'view',
      text: 'View',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'delete',
      text: 'Delete',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'active',
      text: 'Active',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },

    {
      dataField: 'deactive',
      text: 'Deactive',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'approve',
      text: 'Approve',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
    {
      dataField: 'reject',
      text: 'Reject',
      formatter: (cell) => {
        return (
          <input type="checkbox" style={{ marginLeft: 10 }} checked={cell} />
        );
      },
      editorRenderer: editorMethod
    },
  ];
  const onTableChange = (type, newState) => {

    const { data, cellEdit } = newState;
    const updatedData = data.map(item => {
      if (item.formName === cellEdit.rowId) {
        let itemData = item;
        itemData[cellEdit.dataField] = cellEdit.newValue
        return itemData;
      }
      return item;
    })
    setData(updatedData)
    console.log(newState);
  }
  return (
    <div className="container" style={{ marginTop: 25 }}>
      <Button variant="secondary" >Save</Button>
      <BootstrapTable
        wrapperClasses="table-responsive"
        hover
        classes="table table-head-custom table-vertical-center"
        bootstrap4
        remote
        bordered={false}
        keyField='formName'
        data={data}
        columns={columns}
        cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
        onTableChange={onTableChange}
        remote={{ cellEdit: true }}
      />
    </div>
  )
}

export default PermissionTable;