import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateContactUsQueryAsync } from '../../../actions/cmsSetting.action';
import { Input } from '../../../../_metronic/_partials/controls';

const ContactUsReplySchema = Yup.object().shape({
    textArea: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 100 symbols")
        .required("Text is required")
});

const ContactUsReplyContainer = ({ modalReplyDialog, onCloseReplyModal, selectedRow }) => {

    const dispatch = useDispatch();

    const contactUsReply = (values) => {
        if (!selectedRow) {
            return dispatch(updateContactUsQueryAsync({ ...values }));
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    textArea: ""
                }}

                validationSchema={ContactUsReplySchema}

                onSubmit={(values) => {
                    contactUsReply(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal show={modalReplyDialog} onHide={onCloseReplyModal}>
                            <Modal.Body className="overlay overlay-block">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <Field
                                                name="textArea"
                                                component={Input}
                                                placeholder="Text Area"
                                                label="Text Area"
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onCloseReplyModal}
                                    className="mr-5"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </Formik>
        </>
    );
}

export default ContactUsReplyContainer;