import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import PermissionTable from './PermissionContainer/PermissionTable';
import { getAllRolesAsync } from '../../actions/rolesAndPermission.action';
import { getPermissionFormsAsync, managePermissionsAsync } from '../../actions/permission.action';
import {showSuccessSnackbar} from '../../actions/snackbar.action';

const Permission = () => {
    const dispatch = useDispatch();

    const {
        roles,
        refreshRoles
    } = useSelector(state => state.rolesAndPermission, shallowEqual);

    const {
        names,
        types,
        refreshNames
    } = useSelector(state => state.permission, shallowEqual);

    useEffect(() => {
        if (refreshRoles) {
            dispatch(getAllRolesAsync());
        }
    }, [refreshRoles]);

    useEffect(() => {
        if (refreshNames) {
            dispatch(getPermissionFormsAsync());
        }
    }, [refreshNames]);

    const savePermissions = (data, role) => {
        if(!role) {
            return dispatch(showSuccessSnackbar("warning","Select a role first.",3000));
        }
        let finalData = []
        data.forEach(permission => {
            let obj = {
                name: permission.formName,
                types: [],
            }
            for(let key in permission){
                if(key !== "formName" && permission[key]) {
                    obj.types.push(key)
                }
            }
            finalData.push(obj);
        })
        console.log(finalData);
        console.log(role)

        const {
            roleName, _id
        } = role
        dispatch(managePermissionsAsync({
            roleName,
            roleId: _id,
            permissions: finalData
        }))
    }

    return (
        <div>
            <Card>
                <CardHeader title='Permission' style={{ width: '100rem' }}>
                </CardHeader>
                <CardBody>
                    <PermissionTable
                        roles={roles}
                        names={names}
                        types={types}
                        savePermissions={savePermissions}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default Permission;
