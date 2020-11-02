import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextArea } from '../../../../../_metronic/_partials/controls';

const ContactUsReplySchema = Yup.object().shape({
    repliedMessage: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 100 symbols")
        .required("Text is required")
});

const ContactUsReplyContainer = ({ modalReplyDialog, onCloseReplyModal, onCommentReply, selectedRow }) => {

    const contactUsReply = (values) => {
        onCommentReply(values)
    }

    return (
        <>
            <Formik
                initialValues={{
                    repliedMessage: "",
                    comment: selectedRow ? selectedRow.comment : "",
                }}

                validationSchema={ContactUsReplySchema}

                enableReinitialize

                onSubmit={(values) => {
                    console.log(values)
                    contactUsReply({ repliedMessage: values.repliedMessage });
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal show={modalReplyDialog} onHide={onCloseReplyModal}>
                            <Modal.Header >
                                <Modal.Title>
                                    <h5 className='float-left'>User Comment</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="overlay overlay-block">
                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <Field
                                                name="comment"
                                                component={TextArea}
                                                placeholder="Comment"
                                                label="Comment"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <Field
                                                name="repliedMessage"
                                                component={TextArea}
                                                placeholder="Message"
                                                label="Enter a message"
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
                                    onClick={handleSubmit}
                                >
                                    Send
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