import React from 'react';
import { Switch } from 'react-router-dom';

import { ContentRoute } from '../../../_metronic/layout';
import ManageCorporate from './ManageCorporate';
import CorporateManageLicense from './CorporateManageLicense';
import ManageOrder from './ManageOrder';
import LicenceOrder from './LicenceOrder';
import OrderInvoice from './OrderInvoice';
import CostSummary from './CostSummary';

const CorporateManagementRoutes = () => {
  return (
    <Switch>
      <ContentRoute
        path='/corporate-management'
        exact
        component={ManageCorporate}
      />
      <ContentRoute
        path='/corporate-management/corporate-manage-license'
        component={CorporateManageLicense}
      />
      <ContentRoute
        path='/corporate-management/manage-order'
        component={ManageOrder}
      />
      <ContentRoute
        path='/corporate-management/licence-order'
        component={LicenceOrder}
      />
      <ContentRoute
        path='/corporate-management/order-invoice'
        component={OrderInvoice}
      />
      <ContentRoute
        path='/corporate-management/cost-summary'
        component={CostSummary}
      />
    </Switch>
  );
};

export default CorporateManagementRoutes;
