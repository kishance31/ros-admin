import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteFAQ = (props) => {

    const { FAQDeleteDialog, onCloseDeleteFAQModal, onDeleteFAQ } = props;

    return (
        <>
            <Modal show={FAQDeleteDialog} onHide={onCloseDeleteFAQModal}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-left">FAQ Delete</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> Are you sure to delete ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseDeleteFAQModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDeleteFAQ}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteFAQ;


