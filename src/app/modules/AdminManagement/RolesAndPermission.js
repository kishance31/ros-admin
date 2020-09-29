import React from 'react';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import RolesAndPermissionTable from './RolesAndPermissionContainer/RolesAndPermissionTable';

const RolesAndPermission = () => {
    
    return (
        <Card>
            <CardHeader title='Role' style={{ width: '100rem' }}></CardHeader>
            <CardBody>
                <InputGroup className="mb-3" style={{ width: '25rem' }}>
                    <FormControl placeholder="Enter Role" aria-label="Enter Role" />
                    <Button variant="secondary">Add Role</Button>
                </InputGroup>
                <RolesAndPermissionTable />
            </CardBody>
        </Card>
    )
}

export default RolesAndPermission;
