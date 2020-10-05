import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageEmail from '../modules/GeneralSettings/Manage-Email';
// import RolesAndPermission from '../modules/AdminManagement/RolesAndPermission';
// import Permission from '../modules/AdminManagement/Permission';

const GeneralSettings = () => {
    return (
        <Switch>
            <ContentRoute path="/general-settings/email-template-settings" component={ManageEmail} />
        </Switch>
    )
}

export default GeneralSettings;