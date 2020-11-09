import React from 'react';

// import { Button } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';

const ActionButtons = (cell, row, rowIndex, { activeDeactiveAction, handleShow }) => {

  return (
    <>
      {/* <div className="d-flex justify-content-center"> */}

        <a
          title="View Corporate User"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => handleShow(row)}
        >
          <i className="fa fa-eye" style={{ color: "#3699FF" }}></i>
        </a>

        <Switch
          checked={row.isActive}
          size="small"
          className="mt-1"
          onChange={() => {
            if (row.isActive) {
              activeDeactiveAction(row._id, false);
            } else {
              activeDeactiveAction(row._id, true);
            }
          }}
          color="secondary"
          name="userStatus"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          title={row.isActive ? "Activate" : "Deactivate"}
        />


        {/* <Button
          className='mx-3 btn btn-icon btn-light btn-sm mx-3'
          size='sm'
          variant=''
          onClick={() => handleShow()}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i className="fa fa-eye" title="View"></i>
          </span>
        </Button>

        <Button
          className={row.isActive ? 'd-none' : 'btn btn-icon btn-light btn-sm'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, true)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i className="fa fa-toggle-on" title="Acitve"></i>
          </span>
        </Button>
        <Button
          className={!row.isActive ? 'd-none' : 'btn btn-icon btn-light btn-sm'}
          size='sm'
          variant=''
          onClick={() => activeDeactiveAction(row._id, false)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <i className="fa fa-toggle-off" title="Deactive"></i>
          </span>
        </Button> */}
      {/* </div> */}
    </>
  );
};

export default ActionButtons;
