import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

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
      <Modal className="corporate_details_modal" size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Corporate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='container'>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Company Name:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-9 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.companyName}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Firstname:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0 mr-1'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.firstName}
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Lastname:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.lastName}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Position:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0 mr-1'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.position}
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Department:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.department}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Corporate Email ID:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0 mr-1'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.corporateEmailId}
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Personal Email ID:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.email}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Office Contact No:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0 mr-1'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.officeContactNo}
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Mobile No:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.mobileNo}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='row mb-1 mx-0'>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Employee ID:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0 mr-1'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.employeeId}
                </InputGroup.Text>
              </InputGroup.Append>
              <InputGroup.Prepend className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-right-0 font-weight-bold'>
                  Username:
              </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append className='col-3 px-0'>
                <InputGroup.Text className='w-100 border-left-0'>
                  {row.username}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <div className='row mx-0 mt-4 d-flex flex-column'>
              <div className='mb-2 font-weight-bold'>Document</div>

              {/* Link coming from database is not working. Replace below link with {row.corpDoc} -> 2 place change */}

              <img
                src={row.corpDoc}
                // type='application/pdf'
                aria-label='Identity Document'
                width='100'
                height='60'
              // className='pdf_scroll overflow-hidden'
              />
              <a
                className='btn btn-light btn-sm'
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
    </div>
  );
};

export default ViewModal;
