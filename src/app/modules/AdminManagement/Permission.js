import React from 'react';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import PermissionTable from './PermissionContainer/PermissionTable';
import PermissionSelectRole from './PermissionContainer/PermissionSelectRole';

const Permission = () => {
    return (
        <div>
            <Card>
                <CardHeader title='Permission' style={{ width: '100rem' }}>
                </CardHeader>
                <CardBody>
                    <PermissionSelectRole />
                    <PermissionTable />
                </CardBody>
            </Card>
        </div>
    )
}

export default Permission;
