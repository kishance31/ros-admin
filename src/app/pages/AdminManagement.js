import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageUser from '../modules/AdminManagement/ManageUsers';
import RolesAndPermission from '../modules/AdminManagement/RolesAndPermission';
import Permission from '../modules/AdminManagement/Permission';

const AdminManagement = () => {
    return (
        <Switch>
            <ContentRoute path="/admin-management/manage-user" component={ManageUser} />
            <ContentRoute path="/admin-management/role-permission" component={RolesAndPermission} />
            <ContentRoute path="/admin-management/permission" component={Permission} />
        </Switch>
    )
}

export default AdminManagement;