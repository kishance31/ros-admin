import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageEmail from '../modules/GeneralSettings/Manage-Email';
import CmsSetting from "../modules/GeneralSettings/CmsSettingRoute";

const GeneralSettings = () => {
    return (
        <Switch>
            <ContentRoute path="/general-settings/email-template-settings" component={ManageEmail} />
            <ContentRoute path="/general-settings/cms-settings" component={CmsSetting} />
        </Switch>
    )
}

export default GeneralSettings;