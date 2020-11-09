import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import FAQFormatter from './FAQFormatter';
import {
    NoRecordsFoundMessage,
  } from "../../../../../_metronic/_helpers";

const FAQTable = (props) => {

    const { FAQList, onOpenFAQModal, onOpenDeleteFAQModal,setSelectedFAQ } = props;

    const columns = [
        {
            dataField: '_id',
            text: 'id',
            hidden: true,
        },
        {
            dataField: 'question',
            text: 'Question',
        },
        {
            dataField: 'answer',
            text: 'Answer',
        },
        {
            dataField: 'button',
            text: 'Actions',
            headerAlign: 'center',
            formatter: FAQFormatter,
            formatExtraData: {
                onOpenFAQModal: onOpenFAQModal,
                onOpenDeleteFAQModal: onOpenDeleteFAQModal,
                setSelectedFAQ:setSelectedFAQ
            },
        }
    ]

    const noDataIndication = () => {
        return (
            <NoRecordsFoundMessage />
        )
    }

    return (
        <BootstrapTable
            wrapperClasses="table-responsive"
            hover={false}
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden center-last-col"
            bootstrap4
            remote
            keyField='_id'
            data={FAQList}
            columns={columns}
            noDataIndication={noDataIndication}
        >
        </BootstrapTable>
    )
}

export default FAQTable;
