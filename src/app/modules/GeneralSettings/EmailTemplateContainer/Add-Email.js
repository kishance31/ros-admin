import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select,TextArea } from '../../../../_metronic/_partials/controls';
import { useDispatch } from 'react-redux';
import { addEmailTemplateAsync,EditEmailTemplateAsync } from '../../../actions/manageEmailTemplate.action';

const ManageEmailSchema = (user) => (Yup.object().shape({
templateName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('templateName is required'),
  templateEntities: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('templateEntities is required'),
  entities: Yup.string()
    .min(3,'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('entities is required'),
    description: Yup.string()
    .min(3,'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('description is required'),
  
}));

const AddEmailForm = ({ actionsLoading, selectedEmail, SelectedRowIndex, roles, onCloseModal }) => {

  const dispatch = useDispatch();
  const addEmail = (values) => { 
    if (!selectedEmail){ 
        dispatch(addEmailTemplateAsync({ ...values }));
        onCloseModal()
      }
      else {
        dispatch(EditEmailTemplateAsync({ ...values,SelectedRowIndex }))
        onCloseModal()
      }
    }

  const initValues = {
    templateName: "",
    templateEntities: "",
    entities: "",
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
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="templateName"
                      component={Input}
                      placeholder="Eg. Templated Name"
                      label="Template Name"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="templateEntities"
                      component={Input}
                      placeholder="Eg. Full Name"
                      label="Template Entities"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      type={Input}
                      name="entities"
                      component={Input}
                      placeholder=""
                      label="Add Entities"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="description"
                      component={TextArea}
                      placeholder=""
                      label="Description"
                    />
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
