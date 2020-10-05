import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModalContainer = ({ isOpen, onCloseDialog, onDeleteRole }) => {

    return (
        <>
            <Modal show={isOpen} onHide={onCloseDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-left">Role Delete</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> Are you sure to permanently delete this role?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseDialog}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDeleteRole}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteModalContainer;

