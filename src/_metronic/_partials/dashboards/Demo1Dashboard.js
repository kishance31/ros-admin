import React from "react";
import TotalCorporateUsers from '../DashboardCards/TotalCorporateUsers';
import TotalLicensePurchase from '../DashboardCards/TotalLicensePurchase';
import TotalLicenseIncome from '../DashboardCards/TotalLicenseIncome';
import TotalNewOrderIncome from '../DashboardCards/TotalNewOrderIncome';
import TotalRecurringIncome from '../DashboardCards/TotalRecurringIncome';
import TotalEmployee from '../DashboardCards/TotalEmployee';
import TotalItemsAvailable from '../DashboardCards/TotalItemsAvailable';

export function Demo1Dashboard() {

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
                        <div className="col-xl-3 col-md-6 mb-8 offset-xl-3">
                            <div className="card box shadow py-2">
                                <TotalRecurringIncome />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8">
                            <div className="card box shadow py-2">
                                <TotalEmployee />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-8 offset-xl-4-custom">
                            <div className="card box shadow py-2">
                                <TotalItemsAvailable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
