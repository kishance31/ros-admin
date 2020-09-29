import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from 'react-redux'
import {addCategoryDataAsync, EditCategoryAsync, addSubCategoryDataAsync, EditSubCategoryDataAsync} from '../../../../actions/categoryManagementModal.action'
import {
    Input
} from '../../../../../_metronic/_partials/controls';
import { values } from "lodash";

const EditCategorySchema = Yup.object().shape({
    category_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Category Name is required")
});

const AddCatergoryForm =  ({ actionsLoading, selectedCategory }) => {
    const modalName = useSelector(state => state.categoryModal.categorySelected );
    const categorySel = useSelector(state => state.categoryModal.selectedCategory )
    const dispatch = useDispatch()
    const initValuesofCategory={
        category_name: "",
        status: 'true'
    }
    const initValuesofSubCategory={
        subcategory_name: "",
        status: 'true'
    }

    // const getInitDataValue = () => (
    //    modalName == 'category' ? (categorySel ? selectedCategory : initValuesofCategory): (categorySel ? initValuesofSubCategory : selectedCategory)
    // )
    return (
        
        <>
        
            <Formik
                initialValues={
                    modalName == 'category' ? (categorySel ? selectedCategory : initValuesofCategory): (categorySel ? initValuesofSubCategory : selectedCategory)

                }
                validate={(values) => {
                    const errors = {};
                    for (let key in values) {
                        if(key !== "_id") {
                            if (!values[key]) {
                                errors[key] = `${key} is required.`
                            }
                        }
                    }}}
                validationSchema={EditCategorySchema}
                    
                onSubmit={(values) => {
                    console.log('VALUSES', values);
                    const subCategoryEdit = {
                        'subcategory_name' : values.category_name,
                        'category_id': selectedCategory._id
                    }
                    const categoryEdit = {
                        'category_name': values.category_name,
                        'status': true
                    }

                    if(modalName == "category" && !selectedCategory.category_name){
                        alert('111111111')
                        dispatch(addCategoryDataAsync(categoryEdit));
                    }else if(modalName == "category" && selectedCategory){
                        // dispatch(EditCategoryAsync(categoryEdit));
                    }else if(modalName == "subcategory" && selectedCategory.subcategory_name){
                        // dispatch(addSubCategoryDataAsync(subCategoryEdit))
                    }else {
                        // dispatch(addSubCategoryDataAsync(subCategoryEdit))
                    }
                    
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success" />
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="category_name"
                                            component={Input}
                                            placeholder="Category Name"
                                            label="Category Name"
                                            value={modalName == "category"? values.category_name : values.subcategory_name}
                                        />
                                    </div>  
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={() => handleSubmit()}
                            >
                                CREATE
                                </Button>
                                <Button
                                type="button"
                                variant="danger"
                                // onClick={() => handleSubmit()}
                            >
                                Cancel
                                </Button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default AddCatergoryForm;