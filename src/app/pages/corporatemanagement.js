import React from 'react';

import { Card, CardHeader, CardBody } from '../../_metronic/_partials/controls';
import CorporateManagementLink from '../modules/CorporateManagement/CorporateManagementLink';
import CorporateManagementRoutes from '../modules/CorporateManagement/CorporateManagementRoutes';

const CorporateManagement = () => {
  return (
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
  );
};

export default CorporateManagement;
