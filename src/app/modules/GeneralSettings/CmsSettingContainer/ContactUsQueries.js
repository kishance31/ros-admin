import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '../../../../_metronic/_partials/controls';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import { Pagination } from "../../../../_metronic/_partials/controls";
import { NoRecordsFoundMessage } from "../../../../_metronic/_helpers";
import ContactUsQueriesFormatter from './ContactUsQueriesFormatter';
import { cmsSettingsAction, getContactUsQueryAsync, updateContactUsQueryAsync } from '../../../actions/cmsSetting.action';
import ContactUsReplyContainer from './ContactUsReplyContainer';

const ContactUsQueries = () => {

    const [selectedRow, setSelectedRow] = useState(null);

    const dispatch = useDispatch();

    const {
        modalReplyDialog,
        contactQueryList,
        pageNumber,
        pageSize,
        isLoading,
        totalCount,
        refereshContactUsData
    } = useSelector(state => state.cmsSetting);

    useEffect(() => {
        if (refereshContactUsData) {
            dispatch(getContactUsQueryAsync());
        }
    }, [refereshContactUsData]);

    const onOpenReplyModal = () => {
        dispatch(cmsSettingsAction.openReplyModal());
    };

    const onCloseReplyModal = () => {
        dispatch(cmsSettingsAction.closeReplyModal());
        setSelectedRow(null);
    };

    const onCommentReply = (values) => {
        console.log(values)
        dispatch(updateContactUsQueryAsync({ ...values }, selectedRow._id));
        onCloseReplyModal();
    }

    const columns = [
        {
            dataField: '_id',
            text: 'id',
            hidden: true,
        },
        {
            dataField: 'fullName',
            text: 'Full Name',
        },
        {
            dataField: 'email',
            text: 'Email',
        },
        {
            dataField: 'mobileNo',
            text: 'Mobile No',
        },
        {
            dataField: 'comment',
            text: 'Comment',
        },
        {
            dataField: 'repliedMessage',
            text: 'Answer',
        },
        {
            dataField: 'button',
            text: 'Actions',
            headerAlign: 'center',
            formatter: ContactUsQueriesFormatter,
            formatExtraData: {
                onOpenReplyModal: onOpenReplyModal,
                setSelectedRow: setSelectedRow,
                selectedRow: selectedRow,
            },
        }
    ]

    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: [
            { text: "3", value: 3 },
            { text: "5", value: 5 },
            { text: "10", value: 10 }
        ],
        sizePerPage: pageSize,
        page: pageNumber,
    };

    const noDataIndication = () => {
        return (
            <NoRecordsFoundMessage />
        )
    }

    const onTableChange = (type, newState) => {
        if (type === "pagination") {
            if (newState.page && newState.page !== pageNumber) {
                dispatch(cmsSettingsAction.setPage(newState.page));
            }
            if (newState.sizePerPage !== pageSize) {
                dispatch(cmsSettingsAction.setPageSize(newState.sizePerPage));
            }
        }
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                        {({ paginationProps, paginationTableProps }) => {
                            return (
                                <Pagination
                                    isLoading={isLoading}
                                    paginationProps={paginationProps}
                                >
                                    <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        hover={false}
                                        bordered={false}
                                        classes="table table-head-custom table-vertical-center overflow-hidden center-last-col"
                                        bootstrap4
                                        remote
                                        keyField='_id'
                                        data={contactQueryList}
                                        columns={columns}
                                        {...paginationTableProps}
                                        noDataIndication={noDataIndication}
                                        onTableChange={onTableChange}
                                    >
                                    </BootstrapTable>
                                </Pagination>
                            );
                        }}
                    </PaginationProvider>
                </CardBody>
            </Card>
            <ContactUsReplyContainer
                onCloseReplyModal={onCloseReplyModal}
                modalReplyDialog={modalReplyDialog}
                onCommentReply={onCommentReply}
                selectedRow={selectedRow}
            />
        </div>
    )
}

export default ContactUsQueries;
