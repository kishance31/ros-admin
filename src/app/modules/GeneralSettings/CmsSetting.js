import React from 'react'
import { NavLink, Switch } from 'react-router-dom';
import AboutUs from '../GeneralSettings/CmsSettingContainer/AboutUs';
import ContactUs from '../GeneralSettings/CmsSettingContainer/ContactUs';
import { ContentRoute } from '../../../_metronic/layout'
import { Card, CardHeader, CardBody } from '../../../_metronic/_partials/controls';


const CmsSetting = () => {
    return (
        <>
        <Card style={{ width: "60rem" ,height: "30rem" }}>
       
            <div>
                <div className='d-flex d-flex justify-content-between align-items-center flex-wrap'>
                    <NavLink to='/general-settings/cms-settings'>
                        <span>About Us</span>
                    </NavLink>

                    <NavLink to='/general-settings/cms-settings/Contact-us'>
                        <span>Contact Us</span>
                    </NavLink>

                    <NavLink to='/general-settings/cms-settings/notifications'>
                        <span>Notifications</span>
                    </NavLink>

                </div>
            </div>

            <Switch>
                <ContentRoute
                    path='/general-settings/cms-settings'
                    exact
                    component={AboutUs}
                />
                <ContentRoute
                    path='/general-settings/cms-settings/Contact-us'
                    exact
                    component={ContactUs}
                />
            </Switch>
        </Card>

        </>
    )
}

export default CmsSetting
