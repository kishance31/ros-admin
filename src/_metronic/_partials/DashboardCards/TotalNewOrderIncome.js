import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrderIncomeAsync } from '../../../app/actions/dashboard.action';
import moment from 'moment';

const TotalNewOrderIncome = () => {

    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const { newOrderIncome } = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(getNewOrderIncomeAsync(date))
    }, [date])

    return (
        <div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total New Order Income</div>
                        <div className="row_data">
                            <div className="h4 mb-0 font-weight-bold text-gray-800">${parseFloat(newOrderIncome).toFixed(2)}</div>
                            <Form.Control
                                as="select"
                                defaultValue={date}
                                onChange={(e) => { setDate(e.target.value) }}
                            >
                                <option value="">Total</option>
                                <option value={moment().subtract(1, "months").format('MM-DD-YYYY')}>Monthly</option>
                                <option value={moment().subtract(3, "months").format('MM-DD-YYYY')}>Quarterly</option>
                                <option value={moment().subtract(6, "months").format('MM-DD-YYYY')}>Six Month</option>
                                <option value={moment().subtract(1, "years").format('MM-DD-YYYY')}>Yearly</option>
                            </Form.Control>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalNewOrderIncome;
