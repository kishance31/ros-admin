import axios from 'axios';
import { ManageUserAction } from './manageUser.action'

export const RolesAndPermissionMap = {
  ADD_ROLE: 'ADD_ROLE',
  ADD_ROLE_SUCCESS: "ADD_ROLE_SUCCESS",
  ADD_ROLE_ERROR: "ADD_ROLE_ERROR",
  GET_ALL_ROLES: "GET_ALL_ROLES",
  GET_ALL_ROLES_SUCCESS: "GET_ALL_ROLES_SUCCESS",
  GET_ALL_ROLES_ERROR: "GET_ALL_ROLES_ERROR",
  EDIT_ROLE: 'EDIT_ROLE',
  EDIT_ROLE_SUCCESS: "EDIT_ROLE_SUCCESS",
  EDIT_ROLE_ERROR: "EDIT_ROLE_ERROR",
  DELETE_ROLE: 'DELETE_ROLE',
  DELETE_ROLE_SUCCESS: "DELETE_ROLE_SUCCESS",
  DELETE_ROLE_ERROR: "DELETE_ROLE_ERROR",
};

export const RolesAndPermissionAction = {
  addRole: () => ({ type: RolesAndPermissionMap.ADD_ROLE }),
  addRoleSuccess: () => ({ type: RolesAndPermissionMap.ADD_ROLE_SUCCESS }),
  addRoleError: () => ({ type: RolesAndPermissionMap.ADD_ROLE_ERROR }),
  getRoles: () => ({ type: RolesAndPermissionMap.GET_ALL_ROLES }),
  getRolesSuccess: (data) => ({ type: RolesAndPermissionMap.GET_ALL_ROLES_SUCCESS, payload: data }),
  getRolesError: () => ({ type: RolesAndPermissionMap.GET_ALL_ROLES_ERROR }),
  editRole: () => ({ type: RolesAndPermissionMap.EDIT_ROLE }),
  editRoleSuccess: () => ({ type: RolesAndPermissionMap.EDIT_ROLE_SUCCESS }),
  editRoleError: () => ({ type: RolesAndPermissionMap.EDIT_ROLE_ERROR }),
  deleteRole: () => ({ type: RolesAndPermissionMap.DELETE_ROLE }),
  deleteRoleSuccess: () => ({ type: RolesAndPermissionMap.DELETE_ROLE_SUCCESS }),
  deleteRoleError: () => ({ type: RolesAndPermissionMap.DELETE_ROLE_ERROR }),
};

export const getAllRolesAsync = () => async (dispatch, getState) => {
  try {
    dispatch(RolesAndPermissionAction.getRoles());
    let { data } = await axios({
      url: "http://localhost:4000/api/admin/role/getAllRoles",
      method: "GET",
    });
    if (data.response && data.response.responseCode === 200) {
      return dispatch(RolesAndPermissionAction.getRolesSuccess(data.response.data));
    }
    dispatch(RolesAndPermissionAction.getRolesError());
  } catch (error) {
    dispatch(RolesAndPermissionAction.getRolesError());
  }
}

export const addRoleAsync = (roleName) => async (dispatch, getState) => {
  try {
    dispatch(RolesAndPermissionAction.addRole());
    let { data } = await axios({
      url: "http://localhost:4000/api/admin/role/addRole",
      method: "POST",
      data: { roleName },
    });
    if (data.response && data.response.responseCode === 200) {
      return dispatch(RolesAndPermissionAction.addRoleSuccess());
    }
    dispatch(RolesAndPermissionAction.addRoleError());
  } catch (error) {
    dispatch(RolesAndPermissionAction.addRoleError());
  }
}

export const editRoleAsync = (roleName, roleId) => async (dispatch, getState) => {
  try {
    dispatch(RolesAndPermissionAction.editRole());
    let { data } = await axios({
      url: "http://localhost:4000/api/admin/role/updateRole",
      method: "POST",
      data: { roleName, roleId },
    });
    if (data.response && data.response.responseCode === 200) {
      dispatch(RolesAndPermissionAction.editRoleSuccess());
      dispatch(ManageUserAction.refreshManageUserData());
      return;
    }
    dispatch(RolesAndPermissionAction.editRoleError());
  } catch (error) {
    dispatch(RolesAndPermissionAction.editRoleError());
  }
}

export const deleteRoleAsync = (roleId) => async (dispatch) => {
  try {
    dispatch(RolesAndPermissionAction.deleteRole());
    let { data } = await axios({
      url: "http://localhost:4000/api/admin/role/deleteRole",
      method: "POST",
      data: { roleId },
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (data.response && data.response.responseCode === 200) {
      return dispatch(RolesAndPermissionAction.deleteRoleSuccess());
    }
    dispatch(RolesAndPermissionAction.deleteRoleError());
  } catch (error) {
    dispatch(RolesAndPermissionAction.deleteRoleError());
  }
}