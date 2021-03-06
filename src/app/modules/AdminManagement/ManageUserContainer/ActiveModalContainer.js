import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ActiveModalContainer = ({modalActiveDialog,onCloseActiveDialog, onActivateUser}) => {

    return (
        <>
            <Modal show={modalActiveDialog} onHide={onCloseActiveDialog}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-left">User Active</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <h5> Are you sure to activate this user?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="float-left" onClick={onCloseActiveDialog}>
                        Close
                    </Button>
                    <Button variant="success" onClick={onActivateUser}>
                        Activate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ActiveModalContainer;

