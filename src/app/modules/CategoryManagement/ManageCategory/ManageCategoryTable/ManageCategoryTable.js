import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";
import ActionFormatter from './ActionFormatter';
import {
    NoRecordsFoundMessage,
  } from "../../../../../_metronic/_helpers";

const ManageCategoryTable = (
    { OnAddCategory, onDisplaySubCategory, setSelectedCategory, EditCategory, setSelectedSubCategory, currentRole }) => {

    const entities = useSelector(state => state.categoryModal.categoryList);
    const categorySelected = useSelector(state => state.categoryModal.categorySelected);
    const subcategoryData = useSelector(state => state.categoryModal.subCategoryList)

    const columns = [
        {
            dataField: "_id",
            text: "ID",
            align: 'center',
            hidden: true
        },
        {
            dataField: categorySelected === "subcategory" ? "subcategory_name" : "category_name",
            text: `${categorySelected === "category" ? "Category Name" : "Sub-Category Name"}`,
            align: 'center',
            headerAlign: 'center'
        },
        {
            dataField: "status",
            text: "Status",
            align: 'center',
            headerAlign: 'center'
        },
        {
            dataField: "createdAt",
            text: "Create Date",
            formatter: (value) => new Date(value).toLocaleString(),
            align: 'center',
            headerAlign: 'center'
        },
        {
            dataField: "action",
            text: "Actions",
            headerAlign: 'center',
            align: 'center',
            formatter: ActionFormatter,
            formatExtraData: {
                OnAddCategory: OnAddCategory,
                setSelectedCategory: setSelectedCategory,
                onDisplaySubCategory: onDisplaySubCategory,
                EditCategory: EditCategory,
                categorySelected: categorySelected,
                setSelectedSubCategory: setSelectedSubCategory,
                currentRole: currentRole
            }
        },
    ];

    const noDataIndication = () => {
        return (
            <NoRecordsFoundMessage />
        )
    }

    return (
        <>
            <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center center-last-col"
                bootstrap4
                bordered={false}
                remote
                // hover
                keyField="_id"
                data={categorySelected === "category" ? entities : categorySelected === "subcategory" ? subcategoryData : []}
                columns={columns}
                noDataIndication={noDataIndication}
            >
            </BootstrapTable>
        </>
    )
}

export default ManageCategoryTable;