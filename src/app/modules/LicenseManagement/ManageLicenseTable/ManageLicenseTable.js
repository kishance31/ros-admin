import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {EditButtons} from './EditButtons';
import { useSelector } from 'react-redux';
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../_metronic/_helpers";


const ManageLicenseTable = ({openModal, setSelectedLicense, ToggleButton, licenseList}) => {
  
  
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

  const noDataIndication = () => {
    return (
      <>
        {
          // isLoading ? (
          //   <PleaseWaitMessage entities={null} />
          // ) : (
              <NoRecordsFoundMessage entities={licenseList} />
            // )
        }
      </>
    )
  }

  return (
    <>
    <div>
        <BootstrapTable
          wrapperClasses='table-responsive'
          // hover
          classes='table table-head-custom table-vertical-center'
          bootstrap4
          remote
          bordered={false}
          keyField='type'
          data={licenseList}
          columns={columns}
          noDataIndication={noDataIndication}
        />
    </div>
    </>
  );
};

export default ManageLicenseTable;
