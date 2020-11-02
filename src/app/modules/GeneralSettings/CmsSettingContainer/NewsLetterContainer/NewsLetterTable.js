import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../../../_metronic/_partials/controls';
import { NoRecordsFoundMessage } from '../../../../../_metronic/_helpers';
import { useDispatch } from 'react-redux';
import { cmsSettingsAction } from '../../../../actions/cmsSetting.action'

const NewsLetterTable = (props) => {

    const { getNewsLetterList, totalCount, pageSize, pageNumber, isLoading } = props;

    const dispatch = useDispatch();

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

    const columns = [
        {
            dataField: '_id',
            text: 'id',
            hidden: true,
        },
        {
            dataField: 'email',
            text: 'Email',
        }
    ]

    return (
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
                            classes="table table-head-custom table-vertical-center overflow-hidden"
                            bootstrap4
                            remote
                            keyField='_id'
                            data={getNewsLetterList}
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
    );
};

export default NewsLetterTable;
