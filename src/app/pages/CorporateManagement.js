import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../_metronic/_partials/controls';
import CorporateManagementLink from '../modules/CorporateManagement/CorporateManagementLink';
import CorporateManagementRoutes from '../modules/CorporateManagement/CorporateManagementRoutes';

const CorporateManagement = () => {
  const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);
  return (
    <>
      {!roleDetails.length && <Redirect to="/" />}
      {roleDetails.length && !(roleDetails[0].permissions.find(role => role.name === "Corporate Management" && role.types.length)) && <Redirect to="/" />}
      <Card>
        <CardHeader
          title='Corporate Management'
          style={{ width: '100rem' }}
        ></CardHeader>
        <CardBody>
          <CorporateManagementLink />
          <CorporateManagementRoutes />
        </CardBody>
      </Card>
    </>
  );
};

export default CorporateManagement;
