import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import ManageLicenseTable from './ManageLicenseTable/ManageLicenseTable';
import { displayLicenseListAsync, deactiveLicenseStatusAsync, licenseManagementActions, licenseManagementMap } from '../../actions/licenseManagement.action';
import AddLicenseForm from './ManageLicenseTable/addLicenseForm';
const ManageLicense = () => {
    const dispatch = useDispatch();
    const { refereshLicenseList } = useSelector(state => state.licenceManagement)
    const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);
    const licenseList = useSelector(state => state.licenceManagement.licenseList);

    const getCurrentRole = (roleDetails) => {
        if (roleDetails.length) {
            return roleDetails[0].permissions.find(role => role.name === "Manage License" && role.types.length);
        }
        return null;
    }

    const currentRole = useMemo(() => getCurrentRole(roleDetails), [roleDetails]);

    const openVendorModal = () => {
        dispatch(licenseManagementActions.toggleLicenseModal({ type: licenseManagementMap.OPEN_LICENSE_MODAL }))
    }
    const openModal = () => {
        dispatch(licenseManagementActions.toggleLicenseModal({ type: licenseManagementMap.OPEN_LICENSE_MODAL }))
    };

    useEffect(() => {
        if (refereshLicenseList) {
            dispatch(displayLicenseListAsync())
        }
    }, [refereshLicenseList])

    const setSelectedLicense = (license) => {
        dispatch(licenseManagementActions.setSelectedLicense(license))
    }

    const ToggleButton = (selectedLicense) => {
        dispatch(deactiveLicenseStatusAsync(selectedLicense))
    }
    return (
        <>
            {!roleDetails.length && <Redirect to="/" />}
            {!currentRole && <Redirect to="/" />}
            <Card>
                <CardHeader title='Manage License'>
                    {
                        currentRole && currentRole.types.indexOf("Add") !== -1 ? (
                            <CardHeaderToolbar>
                                <button type="button" className="btn btn-primary" onClick={openVendorModal} >Add</button>
                            </CardHeaderToolbar>
                        ) : null
                    }
                </CardHeader>
                <CardBody>
                    <AddLicenseForm />
                    <ManageLicenseTable openModal={openModal}
                        setSelectedLicense={setSelectedLicense}
                        ToggleButton={ToggleButton}
                        licenseList={licenseList}
                        currentRole={currentRole}
                    />
                </CardBody>
            </Card>
        </>)
}


export default ManageLicense;


