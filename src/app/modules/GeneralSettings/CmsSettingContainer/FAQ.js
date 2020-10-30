import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import { cmsSettingsAction } from '../../../actions/cmsSetting.action';
import FAQTable from './FAQContainer/FAQTable';
import AddFAQForm from './FAQContainer/AddFAQForm';

const FAQ = () => {

    const dispatch = useDispatch();

    const onOpenFAQModal = () => {
        dispatch(cmsSettingsAction.openFAQModal());
    };

    const onCloseFAQModal = () => {
        dispatch(cmsSettingsAction.closeFAQModal());
    };

    const { modalState } = useSelector(state => state.cmsSetting.FAQModal);


    return (
        <>
            <Card>
                <CardHeader title='User Details'>
                    <CardHeaderToolbar>
                        <Button className='btn btn-primary' onClick={onOpenFAQModal}>
                            Add
                    </Button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Modal size="lg" show={modalState} onHide={onCloseFAQModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h5 className='float-left'>FAQ</h5>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddFAQForm onCloseFAQModal={onCloseFAQModal} />
                        </Modal.Body>
                    </Modal>
                    <FAQTable />
                </CardBody>
            </Card>
        </>
    );
};


export default FAQ;
