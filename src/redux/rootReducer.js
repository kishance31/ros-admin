// import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
// import * as auth from '../app/modules/Auth/_redux/authRedux';
import { customersSlice } from '../app/modules/ECommerce/_redux/customers/customersSlice';
import { productsSlice } from '../app/modules/ECommerce/_redux/products/productsSlice';
import { remarksSlice } from '../app/modules/ECommerce/_redux/remarks/remarksSlice';
import { specificationsSlice } from '../app/modules/ECommerce/_redux/specifications/specificationsSlice';
import manageUserReducer from '../app/reducers/manageUser.reducer';
import rolesAndPermissionReducer from '../app/reducers/rolesAndPermission.reducer';
import permissionReducer from '../app/reducers/permission.reducer'
import manageCorporateReducer from '../app/reducers/manageCorporate.reducer';
import corporateManageLicenseReducer from '../app/reducers/corporateManageLicense.reducer';
import manageEmailTemplateReducer from '../app/reducers/manageEmailTemplate.reducer';
import licenceOrderReducer from '../app/reducers/licenceOrder.reducer';
import manageOrderReducer from '../app/reducers/manageOrder.reducer';
import orderInvoiceReducer from '../app/reducers/orderInvoice.reducer';
import { AuthReducer } from '../app/reducers/auth.reducer';
import snackBarReducer from '../app/reducers/snackbar.reducer';
import categoryModalreducer from '../app/reducers/categoryManagementModal.reducer';
import licenseManagementReducer from '../app/reducers/licenseManagement.reducer';
import cmsSettingsReducer from '../app/reducers/cmsSetting.reducer';
export const rootReducer = combineReducers({
  auth: AuthReducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  manageUser: manageUserReducer,
  rolesAndPermission: rolesAndPermissionReducer,
  permission:permissionReducer,
  manageCorporate: manageCorporateReducer,
  licenceOrder: licenceOrderReducer,
  corporateManageLicense: corporateManageLicenseReducer,
  manageOrder: manageOrderReducer,
  orderInvoice: orderInvoiceReducer,
  categoryModal: categoryModalreducer,
  licenceManagement: licenseManagementReducer,
  snackBar: snackBarReducer,
  emailTemplate: manageEmailTemplateReducer,
  cmsSetting: cmsSettingsReducer,
});

// export function* rootSaga() {
//   yield all([auth.saga()]);
// }
