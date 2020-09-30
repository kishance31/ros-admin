import axios from 'axios';

export const RolesAndPermissionMap = {
  ADD_ROLE: 'ADD_ROLE',
  GET_ALL_ROLES: "GET_ALL_ROLES",
  GET_ALL_ROLES_SUCCESS: "GET_ALL_ROLES_SUCCESS",
  GET_ALL_ROLES_ERROR: "GET_ALL_ROLES_ERROR",
};

export const RolesAndPermissionAction = {
  addRole: () => {},
  getRoles: () => ({type: RolesAndPermissionMap.GET_ALL_ROLES}),
  getRolesSuccess: (data) => ({type: RolesAndPermissionMap.GET_ALL_ROLES_SUCCESS, payload: data}),
  getRolesError: () => ({type: RolesAndPermissionMap.GET_ALL_ROLES_ERROR}),
};

export const getAllRolesAsync = () => async (dispatch, getState) => {
  try {
    dispatch(RolesAndPermissionAction.getRoles());
    let {tokens} = getState().auth;
    let {data} = await axios({
      url: "http://localhost:4000/api/admin/role/getAllRoles",
      headers: {
        tokens,
      },
      method: "GET",
    });
    if(data.response && data.response.responseCode === 200) {
      return dispatch(RolesAndPermissionAction.getRolesSuccess(data.response.data));
    }
    dispatch(RolesAndPermissionAction.getRolesError());
  } catch (error) {
    dispatch(RolesAndPermissionAction.getRolesError());
  }
}