import React from 'react';
import { useDispatch } from 'react-redux';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { RoleAndPermisionFormatter } from './RolesActionFormatter';
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../_metronic/_helpers";
import { editRoleAsync } from '../../../actions/rolesAndPermission.action';

const RolesAndPermissionTable = (props) => {

  let {
    roles,
    isLoading,
    toggleDeleteModel
  } = props;

  let tableRef;
  const dispatch = useDispatch();

  const onEditClick = (rowIndex) => {
    tableRef.cellEditContext.startEditing(rowIndex, 1);
  }

  const onEditSave = (oldValue, newValue, row, column, done) => {
    if (newValue && newValue !== oldValue) {
      dispatch(editRoleAsync(newValue, row._id, row.adminId));
      done();
    } else {
      done(false);
    }
    tableRef.cellEditContext.completeEditing()
  }

  const columns = [
    {
      dataField: 'createdAt',
      text: 'Date',
      formatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      dataField: 'roleName',
      text: 'Role Name',
    },
    {
      dataField: 'button',
      text: 'Actions',
      formatter: RoleAndPermisionFormatter,
      formatExtraData: {
        onEditClick: onEditClick,
        toggleDeleteModel: toggleDeleteModel
      },
      editable: false,
    }
  ]

  const noDataIndication = () => {
    return (
      <>
        {
          isLoading ? (
            <PleaseWaitMessage entities={null} />
          ) : (
              <NoRecordsFoundMessage entities={roles} />
            )
        }
      </>
    )
  }

  return (
    <div className="container" style={{ marginTop: 50 }}>
      <BootstrapTable
        wrapperClasses="table-responsive"
        ref={n => tableRef = n}
        classes="table table-head-custom table-vertical-center"
        bootstrap4
        remote
        bordered={false}
        keyField='roleName'
        data={roles}
        columns={columns}
        noDataIndication={noDataIndication}
        cellEdit={cellEditFactory({
          mode: 'click',
          autoSelectText: true,
          beforeSaveCell: onEditSave,
          blurToSave: true,
        })}
        onTableChange={() => { }}
      />
    </div>
  )
}

export default RolesAndPermissionTable;