import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from '../../../../_metronic/_partials/controls';
import NewsLetterTable from './NewsLetterContainer/NewsLetterTable';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getNewsLetterAsync } from '../../../actions/cmsSetting.action';

const NewsLetter = () => {

    const dispatch = useDispatch();

    const {
        getNewsLetterList,
        refreshNewsLetterData,
        isLoading,
        totalCount,
        pageNumber,
        pageSize
    } = useSelector(state => state.cmsSetting, shallowEqual);

    useEffect(() => {
        if (refreshNewsLetterData) {
            dispatch(getNewsLetterAsync())
        }
    }, [refreshNewsLetterData])

    return (
        <Card>
            <CardHeader title='News Letter'></CardHeader>
            <CardBody>
                <NewsLetterTable
                    getNewsLetterList={getNewsLetterList}
                    isLoading={isLoading}
                    totalCount={totalCount}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                />
            </CardBody>
        </Card>
    );
};


export default NewsLetter;
