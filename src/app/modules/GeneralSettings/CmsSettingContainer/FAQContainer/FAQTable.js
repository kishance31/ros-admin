import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import FAQFormatter from './FAQFormatter';

const FAQTable = () => {

    //const dispatch = useDispatch();

    // const { displaylist } = useSelector((state) => state.manageUser);

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
            dataField: 'button',
            text: 'Actions',
            headerAlign: 'center',
            formatter: FAQFormatter,
            //     formatExtraData: {
            //         onOpenModal: onOpenModal,
            //         setSelectedUser: setSelectedUser,
            //     },
        }
    ]

    return (
        <BootstrapTable
            wrapperClasses="table-responsive"
            hover={false}
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden center-last-col"
            bootstrap4
            remote
            keyField='email'
            //data={displaylist}
            columns={columns}
        >
        </BootstrapTable>
    )
}

export default FAQTable;
