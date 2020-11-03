import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCountAsync } from '../../../app/actions/dashboard.action';

const TotalItemsAvailable = () => {

    const dispatch = useDispatch();

    const { productsCount } = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(getProductsCountAsync())
    }, [])

    return (
        <div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-5">Total Items Available</div>
                        <div className="h4 mb-0 font-weight-bold text-gray-800 text-center">{productsCount}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalItemsAvailable;
