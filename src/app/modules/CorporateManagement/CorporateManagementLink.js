import React from 'react';
import { NavLink } from 'react-router-dom';

const CorporateManagementLink = () => {
  return (
    <div className='d-flex nav-tabs'>
      <NavLink exact className="nav-link" to='/corporate-management'>
        <span>Manage Corporate</span>
      </NavLink>
      <NavLink className="nav-link" to='/corporate-management/corporate-manage-license'>
        <span>Manage License</span>
      </NavLink>
      <NavLink className="nav-link" to='/corporate-management/manage-order'>
        <span>Manage Order</span>
      </NavLink>
      <NavLink className="nav-link" to='/corporate-management/licence-order'>
        <span>Licence Order</span>
      </NavLink>
      <NavLink className="nav-link" to='/corporate-management/order-invoice'>
        <span>Order Invoice</span>
      </NavLink>
      <NavLink className="nav-link" to='/corporate-management/cost-summary'>
        <span>Cost Summary</span>
      </NavLink>
    </div>
  );
};

export default CorporateManagementLink;
