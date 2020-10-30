import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalContainer = ({modalDialog,onCloseDialog,onDeleteUser, selectedEmailTemplate}) => {

    return (
        <>
            <Modal show={modalDialog} onHide={onCloseDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-left">User Delete</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <h5> Are you sure to {selectedEmailTemplate && selectedEmailTemplate.isActive ? "Deactive" : "Activate"} this email template ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseDialog}>
                        Close
                    </Button>
                    <Button variant={selectedEmailTemplate && selectedEmailTemplate.isActive ? "danger" : "primary"} onClick={onDeleteUser}>
                        {selectedEmailTemplate && selectedEmailTemplate.isActive ? "Deactive" : "Activate"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalContainer;

