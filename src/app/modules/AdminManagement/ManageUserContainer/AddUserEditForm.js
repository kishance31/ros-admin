import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../../../../_metronic/_partials/controls';
import { useDispatch } from 'react-redux';
import { addManageUserAsync, editManageUserAsync } from '../../../actions/manageUser.action';

const ManageUserEditSchema = (user) => (Yup.object().shape({
  firstName: Yup.string().trim()
    .min(4, 'Minimum 4 characters')
    .max(50, 'Maximum 50 characters')
    .required('First name is required'),
  lastName: Yup.string().trim()
    .min(4, 'Minimum 4 characters')
    .max(50, 'Maximum 50 characters')
    .required('Last name is required'),
  email: Yup.string().trim()
    .email('Invalid email')
    .required('Email is required'),
  mobileNo: Yup.number("Enter number only")
    .positive("Enter number only")
    .integer("Enter number only")
    .typeError("Enter Number Only")
    .required('Mobile is required '),
  password: user ?
    Yup.string().optional() :
    Yup.string().trim()
    .min(6, 'Password should be of atleast 6 letters.')
    .required('Password is required'),
  // roleName: Yup.string().required('Select a role'),
}));

const AddUserEditForm = ({ actionsLoading, selectedUser, roles, onCloseModal }) => {

  const dispatch = useDispatch();
  const addManageUser = (values) => {
    if (!selectedUser) {
      return dispatch(addManageUserAsync({ ...values }));
    }
    if (selectedUser) {
      let role = roles.find(role => role.roleName === values.roleName);
      return dispatch(editManageUserAsync({ ...values, roleName: role._id }));
    }
  }

  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    roleName: roles.length ? roles[0].roleName : "",
  }

  const getInitFormValues = () => (
    selectedUser ? {...initValues, ...selectedUser, roleName: selectedUser.roleName.roleName} : {...initValues}
  );

  return (
    <>
      <Formik
        initialValues={{
          ...getInitFormValues()
        }}

        validationSchema={ManageUserEditSchema(selectedUser)}

        onSubmit={(values) => {
          console.log(values);
          addManageUser(values)
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
                  <div className="col-lg-4">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email ID"
                      label="Email ID"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="mobileNo"
                      component={Input}
                      placeholder="Mobile"
                      label="Mobile"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="roleName" label="Role Name">
                      {
                        roles.map(role => (
                          <option key={role.roleName} value={role.roleName}>{role.roleName}</option>
                        ))
                      }
                    </Select>
                  </div>
                  {
                    !selectedUser ? (
                      <div className="col-lg-4">
                        <Field
                          name="password"
                          component={Input}
                          type="password"
                          placeholder="Password"
                          label="Password"
                        />
                      </div>
                    ) : null
                  }
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
                  {selectedUser ? "Update" : "Register"}
                </Button>

            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export default AddUserEditForm;
