import React from 'react'
import { NavLink, Switch, Redirect } from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
//import AboutUs from './CmsSettingContainer/AboutUs';
import ContactUs from './CmsSettingContainer/ContactUs';
import { ContentRoute } from '../../../_metronic/layout'
import { Card } from '../../../_metronic/_partials/controls';
import ContactUsQueries from './CmsSettingContainer/ContactUsQueries';
import FAQ from './CmsSettingContainer/FAQ';
import NewsLetter from './CmsSettingContainer/NewsLetter';

const CmsSetting = () => {
    const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);
    return (
        <>
            {!roleDetails.length && <Redirect to="/" />}
            {roleDetails.length && !(roleDetails[0].permissions.find(role => role.name === "CMS Settings" && role.types.length)) && <Redirect to="/" />}
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        <div className="card-body pb-5">
                            <div className='d-flex align-items-center nav-tabs mb-0'>
                                {/* <NavLink className="nav-link" to='/general-settings/cms-settings/about-us'>
                                    <span>About Us</span>
                                </NavLink> */}

                                <NavLink className="nav-link" to='/general-settings/cms-settings/get-in-touch'>
                                    <span>Get In Touch</span>
                                </NavLink>

                                <NavLink className="nav-link" to='/general-settings/cms-settings/contact-us'>
                                    <span>Contact Us Queries</span>
                                </NavLink>

                                <NavLink className="nav-link" to='/general-settings/cms-settings/faq'>
                                    <span>FAQ</span>
                                </NavLink>

                                <NavLink className="nav-link" to='/general-settings/cms-settings/news-letter'>
                                    <span>News Letter</span>
                                </NavLink>
                            </div>
                        </div>

                        <Switch>
                            {/* <ContentRoute
                                path='/general-settings/cms-settings/about-us'
                                exact
                                component={AboutUs}
                            /> */}
                            <ContentRoute
                                path='/general-settings/cms-settings/get-in-touch'
                                exact
                                component={ContactUs}
                            />
                            <ContentRoute
                                path='/general-settings/cms-settings/contact-us'
                                exact
                                component={ContactUsQueries}
                            />
                            <ContentRoute
                                path='/general-settings/cms-settings/faq'
                                exact
                                component={FAQ}
                            />
                            <ContentRoute
                                path='/general-settings/cms-settings/news-letter'
                                exact
                                component={NewsLetter}
                            />
                        </Switch>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default CmsSetting
