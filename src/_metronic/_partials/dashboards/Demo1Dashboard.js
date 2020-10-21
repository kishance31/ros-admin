import React from "react";

import {
    MixedWidget1,
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "../widgets";
export function Demo1Dashboard() {
    return (<>
        <div className="row dashboard_ros">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">No. of Registerd Corporate</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">12345</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">License Revenue</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">5555$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Order Revenue</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">3333$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">New Order</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">222</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Recurring</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">444$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Monthly Total Income</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">77777$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-0 m-md-15">
                    <div className="col-xl-5 col-md-6">
                        <StatsWidget11 />
                    </div>
                    <div className="col-xl-2 col-md-6">

                    </div>
                    <div className="col-xl-5 col-md-6">
                        <MixedWidget14 />
                    </div>
                </div>
            </div>
        </div>


    </>);
}
