import React from 'react'
import { NavLink, Switch } from 'react-router-dom';
import AboutUs from '../GeneralSettings/CmsSettingContainer/AboutUs';
import ContactUs from '../GeneralSettings/CmsSettingContainer/ContactUs';
import { ContentRoute } from '../../../_metronic/layout'
import { Card } from '../../../_metronic/_partials/controls';


const CmsSetting = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg">
                    <Card>
                        <div className="card-body pb-5">
                            <div className='d-flex align-items-center nav-tabs mb-0'>
                                <NavLink className="nav-link" to='/general-settings/cms-settings/about-us'>
                                    <span>About Us</span>
                                </NavLink>

                                <NavLink className="nav-link" to='/general-settings/cms-settings/Contact-us'>
                                    <span>Contact Us</span>
                                </NavLink>

                                {/* <NavLink className="nav-link" to='/general-settings/cms-settings/notifications'>
                                    <span>Notifications</span>
                                </NavLink> */}

                            </div>
                        </div>

                        <Switch>
                            <ContentRoute
                                path='/general-settings/cms-settings/about-us'
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
                </div>
            </div>
        </>
    )
}

export default CmsSetting
