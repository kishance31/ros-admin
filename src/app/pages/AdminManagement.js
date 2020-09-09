import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageUser from '../modules/AdminManagement/ManageUsers';

const AdminManagement = () => {
    return (
        <Switch>
            <ContentRoute
                path="/admin-management" component={ManageUser} />
        </Switch>
    )
}

export default AdminManagement;