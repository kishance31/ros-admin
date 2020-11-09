import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageLicense from '../modules/LicenseManagement/ManageLicense';

const LicenseManagement = () => {
    return (
        <>
        <Redirect from="/license-management" to="/license-management/manage-license" />
        <Switch>
            <ContentRoute path="/license-management/manage-license" component={ManageLicense} />
        </Switch>
        </>
    )
}

export default LicenseManagement;
