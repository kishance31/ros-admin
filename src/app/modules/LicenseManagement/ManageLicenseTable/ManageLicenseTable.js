import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {EditButtons} from './EditButtons';
import { useSelector } from 'react-redux';


const ManageLicenseTable = ({openModal, setSelectedLicense, ToggleButton}) => {
  const licenseList = useSelector(state => state.licenceManagement.licenseList);
  
  const columns = [
    {
      dataField: 'type',
      text: 'License Type',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'price',
      text: 'License Cost(USD)',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'active',
      text: 'Status',
      align: 'center',
      headerAlign: 'center',
      hidden: true
    },
    {
      dataField: 'button',
      text: 'Actions',
      align: 'center',
      headerAlign: 'center',
      formatter: EditButtons,
      formatExtraData: {
        openModal: openModal,
        setSelectedLicense: setSelectedLicense,
        ToggleButton: ToggleButton
    }},
  ];

  return (
    <>
    <div>
      <div className='container' style={{ marginTop: 50 }}>
        <BootstrapTable
          wrapperClasses='table-responsive'
          hover
          classes='table table-head-custom table-vertical-center'
          bootstrap4
          remote
          bordered={false}
          keyField='type'
          data={licenseList}
          columns={columns}
        />
      </div>
    </div>
    </>
  );
};

export default ManageLicenseTable;
