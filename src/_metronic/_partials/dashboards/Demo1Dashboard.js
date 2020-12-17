import React, { useEffect } from "react";
import TotalCorporateUsers from '../DashboardCards/TotalCorporateUsers';
import TotalLicensePurchase from '../DashboardCards/TotalLicensePurchase';
import TotalLicenseIncome from '../DashboardCards/TotalLicenseIncome';
import TotalNewOrderIncome from '../DashboardCards/TotalNewOrderIncome';
import TotalRecurringIncome from '../DashboardCards/TotalRecurringIncome';
import TotalEmployee from '../DashboardCards/TotalEmployee';
import TotalItemsAvailable from '../DashboardCards/TotalItemsAvailable';
import SalesByProductCategory from '../DashboardCards/SalesByProductCategory';
import ChannelAndCountryOverview from '../DashboardCards/ChannelAndCountryOverview';
import NewCustomersSignUp from '../DashboardCards/NewCustomersSignUp';
import TopProductByProfitMargin from '../DashboardCards/TopProductByProfitMargin';
import RevenueAndSales from '../DashboardCards/RevenueAndSales';
import DashboardSettingPopUp from "../DashboardCards/DashboardSettingPopUp";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import { toAbsoluteUrl } from "../../_helpers";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    DashBoardAction, TopProductByProfitMarginAsync,
    newCustomerSignUpsAsync, salesByProductCategoryAsync
} from '../../../app/actions/dashboard.action';

export function Demo1Dashboard() {

    const dispatch = useDispatch();

    const {
        modalSettingDialog, salesByProductCategory, getCustomerSignupCount, topProfitMarginProducts
    } = useSelector(state => state.dashboard, shallowEqual)

    const onOpenSettingModal = () => {
        dispatch(DashBoardAction.openSettingModal());
    };

    const onCloseSettingModal = () => {
        dispatch(DashBoardAction.closeSettingModal());
    };

    useEffect(() => {
        dispatch(TopProductByProfitMarginAsync())
    }, [])

    useEffect(() => {
        dispatch(newCustomerSignUpsAsync())
    }, [])

    useEffect(() => {
        dispatch(salesByProductCategoryAsync())
    }, [])

    return (
        <>
            <div className="row dashboard_ros">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalCorporateUsers />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalLicensePurchase />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalLicenseIncome />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalNewOrderIncome />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8 offset-xl-2">
                            <div className="card box shadow py-2">
                                <TotalRecurringIncome />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalEmployee />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalItemsAvailable />
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 mb-8">
                            <Card>
                                <CardHeader title='Sales By Product Category'>
                                    <CardHeaderToolbar>
                                        {/* <img src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                                            alt="image"
                                            style={{ width: "2.3rem" }}
                                            onClick={onOpenSettingModal}
                                        /> */}
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <DashboardSettingPopUp
                                        modalSettingDialog={modalSettingDialog}
                                        onCloseSettingModal={onCloseSettingModal}
                                    />
                                    <SalesByProductCategory
                                        salesByProductCategory={salesByProductCategory}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-xl-6 col-md-6 mb-8">
                            <Card>
                                <CardHeader title='Top 10 Product By Profit Margin'>
                                    <CardHeaderToolbar>
                                        {/* <img src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                                            alt="image"
                                            style={{ width: "2.3rem" }}
                                        /> */}
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <TopProductByProfitMargin
                                        topProfitMarginProducts={topProfitMarginProducts}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="col-xl-12 col-md-6 mb-8">
                        <Card>
                            <CardHeader title='New Customer SignUps'>
                                <CardHeaderToolbar>
                                    {/* <img src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                                        alt="image"
                                        style={{ width: "2.3rem" }}
                                    /> */}
                                </CardHeaderToolbar>
                            </CardHeader>
                            <CardBody>
                                <NewCustomersSignUp
                                    getCustomerSignupCount={getCustomerSignupCount}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-md-6 mb-8">
                            <Card>
                                <CardHeader title='Channel And Country Overview'>
                                    <CardHeaderToolbar>
                                        {/* <img src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                                            alt="image"
                                            style={{ width: "2.3rem" }}
                                        /> */}
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <ChannelAndCountryOverview />
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-xl-6 col-md-6 mb-8">
                            <Card>
                                <CardHeader title='Revenue And Sales'>
                                    <CardHeaderToolbar>
                                        {/* <img src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                                            alt="image"
                                            style={{ width: "2.3rem" }}
                                        /> */}
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <RevenueAndSales />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


