import React from 'react';
import { Modal } from 'react-bootstrap';

const DashboardSettingPopUp = ({ modalSettingDialog, onCloseSettingModal }) => {
    return (
        <div>
            <Modal size="lg" show={modalSettingDialog} onHide={onCloseSettingModal}>
                <Modal.Header closeButton>
                    <Modal.Title>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashboardSettingPopUp;
