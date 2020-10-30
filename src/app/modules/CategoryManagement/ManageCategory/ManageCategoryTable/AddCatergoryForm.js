import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import {
    addCategoryDataAsync,
    EditCategoryAsync,
    addSubCategoryDataAsync,
    EditSubCategoryDataAsync
} from '../../../../actions/categoryManagementModal.action'
import { Input } from '../../../../../_metronic/_partials/controls';

const EditCategorySchema = Yup.object().shape({
    category_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Category Name is required")
});

const AddCatergoryForm = ({ onHideModal }) => {
    const modalName = useSelector(state => state.categoryModal.categorySelected);
    const categorySel = useSelector(state => state.categoryModal.selectedCategory);
    const subCategorySel = useSelector(state => state.categoryModal.selectedSubCategory);
    const dispatch = useDispatch();

    const getInitValue = () => {
        return modalName === "category" ? (
            categorySel.category_name ? categorySel.category_name : ""
        ) : (
                subCategorySel.subcategory_name ? subCategorySel.subcategory_name : ""
            );
    }
    return (

        <>

            <Formik
                initialValues={{
                    category_name: getInitValue(),
                }}

                validationSchema={EditCategorySchema}

                onSubmit={(values) => {
                    if (modalName === "category" && !categorySel.category_name) {
                        return dispatch(addCategoryDataAsync(values.category_name));
                    } else if (modalName === "category" && categorySel) {
                        return dispatch(EditCategoryAsync(values.category_name));
                    }
                    if (modalName === "subcategory" && subCategorySel.subcategory_name) {
                        dispatch(EditSubCategoryDataAsync(values.category_name))
                    } else {
                        dispatch(addSubCategoryDataAsync(values.category_name))
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block">
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="category_name"
                                            component={Input}
                                            placeholder={modalName === "category" ? "Category Name" : "Sub-Category Name"}
                                            label={modalName === "category" ? "Category Name" : "Sub-Category Name"}
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onHideModal}
                                className="mr-5"
                            >
                                Cancel
                                </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={() => handleSubmit()}
                            >
                                Save
                                </Button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default AddCatergoryForm;