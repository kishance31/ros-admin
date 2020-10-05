import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeactiveModalContainer = ({ modalDeactiveDialog, onCloseDeactiveDialog, onDeactivateUser }) => {

    return (
        <>
            <Modal show={modalDeactiveDialog} onHide={onCloseDeactiveDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-left">User Deactive</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> Are you sure to deactive this user?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="float-left" onClick={onCloseDeactiveDialog}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={onDeactivateUser}>
                        Deactivate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeactiveModalContainer;


