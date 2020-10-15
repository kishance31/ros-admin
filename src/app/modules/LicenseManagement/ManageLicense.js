import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import ManageLicenseTable from './ManageLicenseTable/ManageLicenseTable';
import { displayLicenseListAsync, deactiveLicenseStatusAsync, licenseManagementActions, licenseManagementMap } from '../../actions/licenseManagement.action';
import AddLicenseForm from './ManageLicenseTable/addLicenseForm';
const ManageLicense = () => {
    const dispatch = useDispatch();
    const {refereshLicenseList, selectedLicense} = useSelector(state => state.licenceManagement)
    const openVendorModal = () => {
        dispatch(licenseManagementActions.toggleLicenseModal({type:licenseManagementMap.OPEN_LICENSE_MODAL}))
    }
    const openModal = () => {
        dispatch(licenseManagementActions.toggleLicenseModal({type:licenseManagementMap.OPEN_LICENSE_MODAL}))
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
            <Card>
                <CardHeader title='Manage License'>
                    <CardHeaderToolbar>
                    <button type="button" className="btn btn-primary" onClick={openVendorModal} >Add</button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <AddLicenseForm />
                    <ManageLicenseTable openModal={openModal} 
                    setSelectedLicense={setSelectedLicense}
                    ToggleButton={ToggleButton}
                    />
                </CardBody>
            </Card>

    </>)
}


export default ManageLicense;


