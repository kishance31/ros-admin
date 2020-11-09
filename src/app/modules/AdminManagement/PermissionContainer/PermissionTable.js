import React, { useEffect, useMemo, useState } from 'react';
import { DropdownButton, DropdownItem, Button, Form } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";

const checkBoxFormatter = (cell, row, rowIndex, { updateTableState, type }) => {
	return (
		<input
			type="checkbox"
			style={{ marginLeft: 10 }}
			checked={cell}
			onChange={e => updateTableState(row.formName, type, e.target.checked)}
		/>
	)
}

const PermissionTable = ({ names, types, roles, savePermissions, roleDetails }) => {

	const [selectedRole, setSelectedRole] = useState(null);

	const getTableData = (names, types, selectedRole) => {
		const typesObj = {};
		types.forEach(type => typesObj[type] = false);

		const tableData = [];
		console.log(selectedRole);
		names.forEach(name => {
			if (name.subForms.length) {
				name.subForms.map(subform => {
					let obj = {
						formName: subform.name, ...typesObj
					}
					if (selectedRole && selectedRole.permissions.length) {
						// let selectedRoleData = roles.find(role => role._id === selectedRole._id);
						let currentRole = selectedRole.permissions.find(role => role.name === subform.name);
						currentRole.types.forEach(typ => { obj[typ] = true });
					}
					tableData.push(obj);
				})
			} else {
				let obj = {
					formName: name.name, ...typesObj
				}
				if (selectedRole && selectedRole.permissions.length) {
					let currentRole = selectedRole.permissions.find(role => role.name === name.name);
					currentRole.types.forEach(typ => { obj[typ] = true });
				}
				tableData.push(obj);
			}
		})
		return tableData;
	}

	const tableData = useMemo(() => getTableData(names, types, selectedRole), [names, types, selectedRole]);

	const [tableState, setTableState] = useState(tableData);

	useEffect(() => {
		if (tableData.length) {
			setTableState(tableData)
		}
	}, [tableData]);

	const updateTableState = (formName, type, value) => {
		let newState = tableData.map(tab => {
			if (tab.formName === formName) {
				tab[type] = value;
			}
			return tab;
		})
		setTableState(newState);
	}

	const getColumns = (types) => {
		const columns = [
			{
				dataField: 'formName',
				text: 'Form name',
				editable: false,
			},
		]
		types.forEach(type => {
			let options = {
				dataField: type,
				text: type,
				formatter: checkBoxFormatter,
				formatExtraData: { updateTableState, type }
			}
			columns.push(options);
		})
		return columns;
	}

	const newcolumns = useMemo(() => getColumns(types), [types, tableState]);

	return (
		<>
			<div className="d-flex mx-10">
				<Form.Control
					as="select"
					id="dropdown-item-button"
					onChange={(e) => {
						if (e.target.value) {
							setSelectedRole(roles.find(role => role._id === e.target.value))
						} else {
							setSelectedRole(null);
						}
					}}
					value={selectedRole ? selectedRole._id : ""}
					style={{ maxWidth: "fit-content" }}
				>
					<option value="">Select Role</option>
					{
						roles.map(role => (
							<option
								key={role._id}
								value={role._id}
							>
								{role.roleName}
							</option>
						))
					}
				</Form.Control>
				<Button className="ml-5"
					variant="primary"
					onClick={() => savePermissions(tableState, selectedRole)}
					disabled={selectedRole && roleDetails[0]._id === selectedRole._id}
				>
					Save
				</Button>
			</div>
			<div className="container" style={{ marginTop: 25 }}>
				<BootstrapTable
					wrapperClasses="table-responsive"
					hover
					classes="table table-head-custom table-vertical-center"
					bootstrap4
					remote
					bordered={false}
					keyField='formName'
					data={tableState}
					columns={newcolumns}
				/>
			</div>
		</>
	)
}

export default PermissionTable;