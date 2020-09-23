import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { ManageUserAction } from '../../../../actions/manageUser.action';

export function ActionManageUserFormatter() {

    return (
        <>
            <ButtonGroup>
                <Button variant="secondary">Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary">Delete</Button>&nbsp;&nbsp;
                <Button variant="secondary">Active</Button>&nbsp;&nbsp;
                <Button variant="secondary">Deactive</Button>
            </ButtonGroup>
        </>
    );
}
