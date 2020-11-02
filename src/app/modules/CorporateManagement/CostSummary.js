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

	const {
		firstTimeMonths,
		recurringMonthsNo,
		firstYearCharge,
		firstYearTerm,
		secondYearCharge,
		secondYearTerm,
	} = useSelector(state => state.costSummary, shallowEqual);

	useEffect(() => {
		dispatch(getCostSummaryAsync());
	}, [])

	const initValues = {
		firstTimeMonths,
		recurringMonthsNo,
		firstYearCharge,
		firstYearTerm,
		secondYearCharge,
		secondYearTerm,
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
						recurringMonthsNo,
						firstYearCharge,
						firstYearTerm,
						secondYearCharge,
						secondYearTerm,
					} = values;
					dispatch(saveCostSummaryAsync(
						{
							firstTimeMonths: parseInt(firstTimeMonths),
							recurringMonthsNo: parseInt(recurringMonthsNo),
							firstYearCharge: parseInt(firstYearCharge),
							firstYearTerm: parseInt(firstYearTerm),
							secondYearCharge: parseInt(secondYearCharge),
							secondYearTerm: parseInt(secondYearTerm),
						}
					));
				}}
			>
				{({ handleSubmit }) => (
					<>
						<Form onSubmit={handleSubmit} className="form form-label-right">

							<div className="row">
								<div className="col-lg-4 mt-6">
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
								<div className="col-lg-4">
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

							<div className="row">
								<div className="col-lg-4">
									<div className="form-group">
										<Field
											name="firstYearCharge"
											component={Input}
											placeholder="After first year charge"
											label="After first year charge(%)"
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<Field
											name="firstYearTerm"
											component={Input}
											placeholder="After first year charge term(months)"
											label="After first year charge term(months)"
										/>
									</div>
								</div>
							</div>

							<div className="row">
							<div className="col-lg-4">
									<div className="form-group">
										<Field
											name="secondYearCharge"
											component={Input}
											placeholder="After second year charge"
											label="After second year charge(%)"
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<Field
											name="secondYearTerm"
											component={Input}
											placeholder="After second year charge term(months)"
											label="After second year charge term(months)"
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
