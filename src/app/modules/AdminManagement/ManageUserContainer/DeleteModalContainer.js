import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalContainer = ({modalDialog,onCloseDialog}) => {

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
                   <h5> Are you sure to permanently delete this user?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="float-left" onClick={onCloseDialog}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalContainer;

