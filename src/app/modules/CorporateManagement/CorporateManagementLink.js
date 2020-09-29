import React from 'react';
import { NavLink } from 'react-router-dom';

const CorporateManagementLink = () => {
  return (
    <div className='d-flex justify-content-between'>
      <NavLink to='/corporate-management'>
        <span>Manage Corporate</span>
      </NavLink>
      <NavLink to='/corporate-management/manage-licence'>
        <span>Manage Licence</span>
      </NavLink>
      <NavLink to='/corporate-management/manage-order'>
        <span>Manage Order</span>
      </NavLink>
      <NavLink to='/corporate-management/licence-order'>
        <span>Licence Order</span>
      </NavLink>
      <NavLink to='/corporate-management/order-invoice'>
        <span>Order Invoice</span>
      </NavLink>
      <NavLink to='/corporate-management/cost-summary'>
        <span>Cost Summary</span>
      </NavLink>
    </div>
  );
};

export default CorporateManagementLink;
