import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageEmail from '../modules/GeneralSettings/Manage-Email';
import CmsSetting from "../modules/GeneralSettings/CmsSettingRoute";

const GeneralSettings = () => {
    return (
        <>
            <Switch>
                <ContentRoute path="/general-settings/email-template-settings" component={ManageEmail} />
                <ContentRoute path="/general-settings/cms-settings" component={CmsSetting} />
                <Redirect from="/general-settings" to="/general-settings/cms-settings" />
            </Switch>
        </>
    )
}

export default GeneralSettings;