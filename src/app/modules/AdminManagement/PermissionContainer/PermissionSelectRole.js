import React from 'react';
import { DropdownButton, DropdownItem } from 'react-bootstrap';

const PermissionSelectRole = () => {
    return (
        <div>
            <h4>Role</h4>
            <DropdownButton id="dropdown-item-button" title="Select Role" variant="secondary">
                <DropdownItem as="button">Role1</DropdownItem>
                <DropdownItem as="button">Role2</DropdownItem>
                <DropdownItem as="button">Role3</DropdownItem>
            </DropdownButton>
        </div>
    )
}

export default PermissionSelectRole;
