import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { AuthReducer } from "../app/reducers/auth.reducer";
// import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import manageUserReducer from '../app/reducers/manageUser.reducer';
import rolesAndPermissionReducer from '../app/reducers/rolesAndPermission.reducer';
import manageLicenseReducer from '../app/reducers/manageLicense.reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  manageUser:manageUserReducer,
  rolesAndPermission:rolesAndPermissionReducer,
  manageLicense:manageLicenseReducer
});

// export function* rootSaga() {
//   // yield all([auth.saga()]);
// }



