import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody } from '../../../../_metronic/_partials/controls';
import ContactUsQueriesTable from './ContactUsQueriesContainer/ContactUsQueriesTable';
import { cmsSettingsAction, getContactUsQueryAsync, updateContactUsQueryAsync } from '../../../actions/cmsSetting.action';
import ContactUsReplyContainer from './ContactUsQueriesContainer/ContactUsReplyContainer';

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
        dispatch(updateContactUsQueryAsync({ ...values }, selectedRow._id));
        onCloseReplyModal();
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <ContactUsQueriesTable
                        onOpenReplyModal={onOpenReplyModal}
                        onCloseReplyModal={onCloseReplyModal}
                        contactQueryList={contactQueryList}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        isLoading={isLoading}
                        totalCount={totalCount}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                    />
                    <ContactUsReplyContainer
                        modalReplyDialog={modalReplyDialog}
                        onCloseReplyModal={onCloseReplyModal}
                        selectedRow={selectedRow}
                        onCommentReply={onCommentReply}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default ContactUsQueries;
