import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageCategory from '../modules/CategoryManagement/ManageCategory/ManageCategory';
// import importItemFromVendor from '../modules/CategoryManagement/ImportItemFromVendor/ImportItemFromVendor/ImportItemFromVendor';
import ImportItemFromVendor from '../modules/CategoryManagement/ImportItemFromVendor/ImportItemFromVendor';
const CategoryManagement = () => {
    return (
        <>
            <Redirect from="/category-management" to="/category-management/manage-category" />
            <Switch>
                <ContentRoute path="/category-management/manage-category" component={ManageCategory} />
                <ContentRoute path="/category-management/import-item" component={ImportItemFromVendor} />
            </Switch>
        </>
    )
}

export default CategoryManagement;