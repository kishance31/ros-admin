import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select, TextArea } from '../../../../_metronic/_partials/controls';
import { useDispatch } from 'react-redux';
import { addEmailTemplateAsync, EditEmailTemplateAsync } from '../../../actions/manageEmailTemplate.action';
import { values } from 'lodash';

const ManageEmailSchema = (user) => (Yup.object().shape({
	title: Yup.string()
		.min(3, 'Minimum 3 symbols')
		.max(50, 'Maximum 50 symbols')
		.required('Title is required'),
	subject: Yup.string()
		.min(3, 'Minimum 3 symbols')
		.max(50, 'Maximum 50 symbols')
		.required('Subject is required'),
	description: Yup.string()
		.min(3, 'Minimum 3 symbols')
		.max(500, 'Maximum 500 symbols')
		.required('Description is required'),

}));

const AddEmailForm = ({ actionsLoading, selectedEmail, onCloseModal }) => {

	const dispatch = useDispatch();
	const addEmail = (values) => {
		if (!selectedEmail) {
			dispatch(addEmailTemplateAsync({ ...values }));
			onCloseModal()
		}
		else {
			dispatch(EditEmailTemplateAsync({ ...values }))
			onCloseModal()
		}
	}

	const initValues = {
		title: "",
		subject: "",
		description: "",
	}

	const getInitFormValues = () => (
		selectedEmail ? selectedEmail : initValues
	);

	return (
		<>
			<Formik
				initialValues={{
					...getInitFormValues()
				}}

				validationSchema={ManageEmailSchema(selectedEmail)}

				onSubmit={(values) => {
					addEmail(values)
				}}
			>
				{({ values, handleSubmit }) => (
					<>
						<Modal.Body className="overlay overlay-block">
							{actionsLoading && (
								<div className="overlay-layer bg-transparent">
									<div className="spinner spinner-lg spinner-success" />
								</div>
							)}
							<Form className="form form-label-right">
								<div className="row">
									<div className="col-lg-6">
										<div className="form-group">
											<Field
												name="title"
												component={Input}
												placeholder="Eg. Templated Name"
												label="Title"
												disabled={values.title ? true : false}
											/>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<Field
												name="subject"
												component={Input}
												placeholder="Eg. Subject"
												label="Subject"
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<Field
												name="description"
												component={TextArea}
												placeholder=""
												label="Description"
											/>
										</div>

									</div>
								</div>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant='outline-secondary'
								className='float-left mr-10'
								onClick={onCloseModal}
							>
								Cancel
              </Button>
							<Button
								type="submit"
								onClick={() => handleSubmit()}
								className="float-right"
								variant="primary"
							>
								{selectedEmail ? "Update" : "Save"}
							</Button>

						</Modal.Footer>
					</>
				)}
			</Formik>
		</>
	);
}

export default AddEmailForm;
