import React from "react";
import { DropdownButton, DropdownItem, Button, Form } from 'react-bootstrap';

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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total Corporate Users</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">125</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total License Purchase</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">125</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total License Income</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">125 USD</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total New Order Income</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">12500 USD</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8 offset-xl-3">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total Recurring Income</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">125 USD</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
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
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total Employee</div>
                                        <div className="row_data">
                                            <div className="h4 mb-0 font-weight-bold text-gray-800">125</div>
                                            <Form.Control as="select">
                                                <option value="">Total</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-8 offset-xl-4-custom">
                        <div className="card box shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total Items Available</div>
                                        <div className="h4 mb-0 font-weight-bold text-gray-800 text-center">125</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>);
}
