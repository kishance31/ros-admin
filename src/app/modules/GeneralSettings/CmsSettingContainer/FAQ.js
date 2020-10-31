import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import { cmsSettingsAction, getFAQSAsync, deleteFAQSAsync, saveFAQSAsync, editFAQSAsync } from '../../../actions/cmsSetting.action';
import FAQTable from './FAQContainer/FAQTable';
import AddFAQForm from './FAQContainer/AddFAQForm';
import DeleteFAQ from './FAQContainer/DeleteFAQ';

const FAQ = () => {

    const dispatch = useDispatch();

    const onOpenFAQModal = () => {
        dispatch(cmsSettingsAction.openFAQModal());
    };

    const onCloseFAQModal = () => {
        dispatch(cmsSettingsAction.closeFAQModal());
    };

    const onOpenDeleteFAQModal = () => {
        dispatch(cmsSettingsAction.openFAQDeleteModal());
    };

    const onCloseDeleteFAQModal = () => {
        dispatch(cmsSettingsAction.closeFAQDeleteModal());
    };

    const setSelectedFAQ = (faq) => {
        dispatch(cmsSettingsAction.setSelectedFAQ(faq));
    }

    const onDeleteFAQ = () => {
        dispatch(deleteFAQSAsync(selectedFAQ._id));
        onCloseDeleteFAQModal()
    }
    const onAddFAQ = (values) => {
        if (!selectedFAQ) {
            dispatch(saveFAQSAsync({ ...values }));
            onCloseFAQModal()
        } else {
            dispatch(editFAQSAsync({ ...values }));
            onCloseFAQModal()
        }
    }

    const {
        FAQModal,
        FAQDeleteDialog,
        FAQList,
        refreshFAQData,
        selectedFAQ
    } = useSelector(state => state.cmsSetting, shallowEqual)

    useEffect(() => {
        if (refreshFAQData) {
            dispatch(getFAQSAsync())
        }
    }, [refreshFAQData])


    return (
        <>
            <Card>
                <CardHeader title='FAQ Details'>
                    <CardHeaderToolbar>
                        <Button className='btn btn-primary' onClick={onOpenFAQModal}>
                            Add
                        </Button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Modal size="lg" show={FAQModal} onHide={onCloseFAQModal}>
                        <Modal.Body>
                            <AddFAQForm
                                onCloseFAQModal={onCloseFAQModal}
                                selectedFAQ={selectedFAQ}
                                onAddFAQ={onAddFAQ}
                            />
                        </Modal.Body>
                    </Modal>
                    <FAQTable
                        FAQList={FAQList}
                        onOpenFAQModal={onOpenFAQModal}
                        onOpenDeleteFAQModal={onOpenDeleteFAQModal}
                        setSelectedFAQ={setSelectedFAQ}
                    />
                    <DeleteFAQ
                        onDeleteFAQ={onDeleteFAQ}
                        FAQDeleteDialog={FAQDeleteDialog}
                        onCloseDeleteFAQModal={onCloseDeleteFAQModal}
                    />
                </CardBody>
            </Card>
        </>
    );
};


export default FAQ;
