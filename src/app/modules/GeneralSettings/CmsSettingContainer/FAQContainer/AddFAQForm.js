import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { TextArea } from '../../../../../_metronic/_partials/controls';

const FAQSchema = Yup.object().shape({
    question: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 20000 symbols")
        .required("Question is required"),
    answer: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 20000 symbols")
        .required("Answer is required")
});

const AddFAQForm = ({ onCloseFAQModal, onAddFAQ, selectedFAQ }) => {

    const initValues = {
        question: "",
        answer: ""
    }

    const getInitFormValues = () => (
        selectedFAQ ? selectedFAQ : initValues
    );

    return (
        <>
            <Formik
                initialValues={{
                    ...getInitFormValues()
                }}

                validationSchema={FAQSchema}

                onSubmit={(values) => {
                    onAddFAQ(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Header >
                            <Modal.Title>
                                <h5 className='float-left'>FAQs Page</h5>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="overlay overlay-block">
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="question"
                                            component={TextArea}
                                            placeholder="Enter a Question"
                                            label="Question"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="answer"
                                            component={TextArea}
                                            placeholder="Enter an Answer"
                                            label="Answer"
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCloseFAQModal}
                                className="mr-5"
                            >
                                Cancel
                                </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={handleSubmit}
                                className="float-right"
                            >
                                {selectedFAQ ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default AddFAQForm;
