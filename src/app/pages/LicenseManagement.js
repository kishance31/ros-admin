import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageLicense from '../modules/LicenseManagement/ManageLicense';

const LicenseManagement = () => {
    return (
        <Switch>
            <ContentRoute path="/license-management/manage-license" component={ManageLicense} />
        </Switch>
    )
}

export default LicenseManagement;
