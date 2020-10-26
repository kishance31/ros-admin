import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../_metronic/_partials/controls';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCostSummaryAsync, saveCostSummaryAsync } from '../../actions/costSummary.actions';

const CostSummarySchema = () => (Yup.object().shape({
	firstTimeMonths: Yup.number()
		.moreThan(0, "Months number must be greater than zero.")
		.required('First time payment month is required'),
	recurringMonthsNo: Yup.number()
		.moreThan(0, "Months number must be greater than zero.")
		.required('Recurring months number is required'),
}));

const CostSummary = () => {

	const dispatch = useDispatch();

	const { firstTimeMonths, recurringMonthsNo } = useSelector(state => state.costSummary, shallowEqual);

	useEffect(() => {
		dispatch(getCostSummaryAsync());
	}, [])

	const initValues = {
		firstTimeMonths,
		recurringMonthsNo,
	}

	return (
		<div className="mt-10">
			<Formik
				initialValues={{
					...initValues
				}}

				enableReinitialize

				validationSchema={CostSummarySchema()}

				onSubmit={(values) => {
					let {
						firstTimeMonths,
						recurringMonthsNo
					} = values;
					dispatch(saveCostSummaryAsync(
						{
							firstTimeMonths: parseInt(firstTimeMonths), recurringMonthsNo: parseInt(recurringMonthsNo)
						}
					));
				}}
			>
				{({ handleSubmit }) => (
					<>
						<Form onSubmit={handleSubmit} className="form form-label-right">
							<div className="row">
								<div className="col-lg-3 mt-6">
									<div className="form-group">
										<Field
											name="firstTimeMonths"
											component={Input}
											placeholder="First time payment months"
											label="First time payment months"
										/>
									</div>
								</div>
							</div>
							<div className="row"> 
								<div className="col-lg-3">
									<div className="form-group">
										<Field
											name="recurringMonthsNo"
											component={Input}
											placeholder="Recurring payment months number"
											label="Recurring payment months number"
										/>
									</div>
								</div>
							</div>
							<Button
								type="submit"
								variant="primary"
							>
								Save
            			</Button>
						</Form>

					</>
				)}
			</Formik>
		</div>
	);
};

export default CostSummary;
