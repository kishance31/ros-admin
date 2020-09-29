import React from 'react';
import {Switch} from 'react-router-dom';
import { ContentRoute } from "../../_metronic/layout";
import ManageCategory from '../modules/CategoryManagement/ManageCategory/ManageCategory';
// import importItemFromVendor from '../modules/CategoryManagement/ImportItemFromVendor/ImportItemFromVendor/ImportItemFromVendor';
import ImportItemFromVendor from '../modules/CategoryManagement/ImportItemFromVendor/ImportItemFromVendor';
const CategoryManagement = () => {
    return (
        <Switch>
            <ContentRoute path="/category-management/manage-category" component={ManageCategory} />
            <ContentRoute path="/category-management/import-item" component={ImportItemFromVendor} />
        </Switch>
    )
}

export default CategoryManagement;