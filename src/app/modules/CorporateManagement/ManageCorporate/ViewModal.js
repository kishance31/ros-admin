import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import { Form, Field } from 'formik';
// import { Input } from '../../../../_metronic/_partials/controls';

const ViewModal = ({ show, handleClose, row, approveRejectAction }) => {
  const approveAction = () => {
    approveRejectAction(row._id, 'APPROVED');
    handleClose();
  };
  const rejectAction = () => {
    approveRejectAction(row._id, 'REJECTED');
    handleClose();
  };
  return (
    <div className="">
      {
        row ? (

          <Modal className="corporate_details_modal" size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Corporate Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="form form-label-right">

                <div className="form-group row">
                  <div className="col-lg-12">
                    <label>Company Name</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.companyName}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.firstName}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.lastName}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Department</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.department}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Position</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.position}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Corporate Email ID</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.corporateEmailId}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Personal Email ID</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.email}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Office Contact Number</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.officeContactNo}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.mobileNo}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.employeeId}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>User Name</label>
                    <input
                      type="text"
                      className='form-control'
                      disabled
                      defaultValue={row.username}
                    />
                  </div>
                </div>

                <div className='row mx-0 mt-4 d-flex flex-column'>
                  <div className='mb-2 font-weight-bold'>Document</div>


                  <img
                    src={row.corpDoc}
                    aria-label='Identity Document'
                    width='100'
                    height='60'
                  />
                  <a
                    className='btn btn-light btn-sm mt-5'
                    style={{ width: '100px' }}
                    href={row.corpDoc}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View
                </a>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={row.status === 'APPROVED' ? 'd-none' : ''}
                variant='success'
                onClick={approveAction}
              >
                Approve
        </Button>
              <Button
                className={row.status === 'REJECTED' ? 'd-none' : ''}
                variant='danger'
                onClick={rejectAction}
              >
                Reject
        </Button>
              <Button variant='primary' onClick={() => handleClose()}>
                Close
        </Button>
            </Modal.Footer>
          </Modal>
        ) : null
      }
    </div>
  );
};

export default ViewModal;
