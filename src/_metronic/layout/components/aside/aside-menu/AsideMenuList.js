/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
export function AsideMenuList({ layoutProps }) {

	const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);
	const [roleState, setRoleState] = useState({
		"Manage User": false,
		"Roles & Permissions": false,
		"Permission": false,
		"Manage Category": false,
		"Import Item from Vendor": false,
		"Manage License": false,
		"Corporate Management": false,
		"CMS Settings": false,
		"Email Template Settings": false,
	});

	useEffect(() => {
		let finalState = { ...roleState };
		if (roleDetails.length) {
			roleDetails[0].permissions.forEach(role => {
				finalState = {
					...finalState,
					[role.name]: role.types.length ? true : false
				}
			})
			setRoleState(finalState);
		}
	}, [roleDetails])

	const location = useLocation();

	const getMenuItemActive = (url, hasSubmenu = false) => {
		return checkIsActive(location, url)
			? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
			: "";
	};

	const setVendorFlag = () => {
		// dispatch
	}

	return (
		<>
			{/* begin::Menu Nav */}
			<ul className={`menu-nav ${layoutProps.ulClasses}`}>
				{/*begin::1 Level*/}
				<li
					className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/dashboard">
						<span className="svg-icon menu-icon">
							<i className="flaticon-dashboard"></i>
						</span>
						<span className="menu-text">Dashboard</span>
					</NavLink>
				</li>
				{/*end::1 Level*/}

				{
					roleState["Manage User"] || roleState["Roles & Permissions"] || roleState["Permission"] ? (
						<li
							className={`menu-item menu-item-submenu ${getMenuItemActive(
								"/admin-management", true
							)}`}
							aria-haspopup="true"
							data-menu-toggle="hover"
						>
							<NavLink className="menu-link menu-toggle" to="/admin-management">
								<span className="svg-icon menu-icon">
									<i className="m-menu__link-icon flaticon-user-ok"></i>
								</span>
								<span className="menu-text">Admin Management</span>
								<i className="menu-arrow" />
							</NavLink>
							<div className="menu-submenu ">
								<i className="menu-arrow" />
								<ul className="menu-subnav">
									<li className="menu-item  menu-item-parent" aria-haspopup="true">
										<span className="menu-link">
											<span className="menu-text">Admin Management</span>
										</span>
									</li>

									{
										roleState["Manage User"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/admin-management/manage-user", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/admin-management/manage-user">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">Manage Users</span>
												</NavLink>
											</li>
										) : null
									}
									{
										roleState["Roles & Permissions"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/admin-management/role-permission", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/admin-management/role-permission">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">Roles And Permission</span>
												</NavLink>
											</li>
										) : null
									}
									{
										roleState["Permission"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/admin-management/permission", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/admin-management/permission">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">Permission</span>
												</NavLink>
											</li>
										) : null
									}

								</ul>
							</div>
						</li>
					) : null
				}

				{
					roleState["Manage License"] ? (
						<li
							className={`menu-item menu-item-submenu ${getMenuItemActive(
								"/license-management", true
							)}`}
							aria-haspopup="true"
							data-menu-toggle="hover"
						>
							<NavLink className="menu-link menu-toggle" to="/license-management">
								<span className="svg-icon menu-icon">
									<i className="fa fa-id-card fs_15"></i>
								</span>
								<span className="menu-text">License Management</span>
								<i className="menu-arrow" />
							</NavLink>
							<div className="menu-submenu ">
								<i className="menu-arrow" />
								<ul className="menu-subnav">
									<li className="menu-item  menu-item-parent" aria-haspopup="true">
										<span className="menu-link">
											<span className="menu-text">License Management</span>
										</span>
									</li>
									<li
										className={`menu-item menu-item-submenu ${getMenuItemActive(
											"/license-management/manage-license", false
										)}`}
										aria-haspopup="true"
										data-menu-toggle="hover"
									>
										<NavLink className="menu-link" to="/license-management/manage-license">
											<i className="menu-bullet menu-bullet-dot">
												<span />
											</i>
											<span className="menu-text">Manage License</span>
										</NavLink>
									</li>
								</ul>
							</div>
						</li>
					) : null
				}

				{
					roleState["Manage Category"] || roleState["Import Item from Vendor"] ? (
						<li
							className={`menu-item menu-item-submenu ${getMenuItemActive(
								"/category-management", true
							)}`}
							aria-haspopup="true"
							data-menu-toggle="hover"
						>
							<NavLink className="menu-link menu-toggle" to="/category-management">
								<span className="svg-icon menu-icon">
									<i className="flaticon-web"></i>
								</span>
								<span className="menu-text">Category Management</span>
								<i className="menu-arrow" />
							</NavLink>
							<div className="menu-submenu ">
								<i className="menu-arrow" />
								<ul className="menu-subnav">
									<li className="menu-item  menu-item-parent" aria-haspopup="true">
										<span className="menu-link">
											<span className="menu-text">Category Management</span>
										</span>
									</li>
									{
										roleState["Manage Category"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/category-management/manage-category", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/category-management/manage-category">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">Manage Category</span>
												</NavLink>
											</li>
										) : null
									}
									{
										roleState["Import Item from Vendor"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/category-management/import-item", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/category-management/import-item">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text" onClick={setVendorFlag}>Import Item from Vendor</span>
												</NavLink>
											</li>
										) : null
									}
								</ul>
							</div>
						</li>
					) : null
				}

				{
					roleState["Corporate Management"] ? (
						<li
							className={`menu-item ${getMenuItemActive("/corporate-management", false)}`}
							aria-haspopup="true"
						>
							<NavLink className="menu-link" to="/corporate-management">
								<span className="svg-icon menu-icon">
									<i className="fa fa-building"></i>
								</span>
								<span className="menu-text">Corporate Management</span>
							</NavLink>
						</li>
					) : null
				}

				{
					roleState["CMS Settings"] || roleState["Email Template Settings"] ? (

						<li
							className={`menu-item menu-item-submenu ${getMenuItemActive(
								"/general-settings", true
							)}`}
							aria-haspopup="true"
							data-menu-toggle="hover"
						>
							<NavLink className="menu-link menu-toggle" to="/general-settings">
								<span className="svg-icon menu-icon">
									<i className="m-menu__link-icon flaticon-settings"></i>
								</span>
								<span className="menu-text">General Settings</span>
								<i className="menu-arrow" />
							</NavLink>
							<div className="menu-submenu ">
								<i className="menu-arrow" />
								<ul className="menu-subnav">
									<li className="menu-item  menu-item-parent" aria-haspopup="true">
										<span className="menu-link">
											<span className="menu-text">General Settings</span>
										</span>
									</li>

									{/* Inputs */}
									{/*begin::2 Level*/}
									{
										roleState["CMS Settings"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/general-settings/cms-settings", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/general-settings/cms-settings/get-in-touch">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">CMS Settings</span>
												</NavLink>
											</li>
										) : null
									}
									{
										roleState["Email Template Settings"] ? (
											<li
												className={`menu-item menu-item-submenu ${getMenuItemActive(
													"/general-settings/email-template-settings", false
												)}`}
												aria-haspopup="true"
												data-menu-toggle="hover"
											>
												<NavLink className="menu-link" to="/general-settings/email-template-settings">
													<i className="menu-bullet menu-bullet-dot">
														<span />
													</i>
													<span className="menu-text">Email Template Settings</span>
												</NavLink>
											</li>
										) : null
									}
								</ul>
							</div>
						</li>
					) : null
				}



				{/*begin::1 Level*/}
				{/* <li
					className={`menu-item ${getMenuItemActive("/builder", false)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/builder">
						<span className="svg-icon menu-icon">
							<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
						</span>
						<span className="menu-text">Layout Builder</span>
					</NavLink>
				</li> */}
				{/*end::1 Level*/}


				{/* Custom */}
				{/* begin::section */}
				{/* <li className="menu-section ">
					<h4 className="menu-text">Custom</h4>
					<i className="menu-icon flaticon-more-v2"></i>
				</li> */}
				{/* end:: section */}

				{/* Error Pages */}
				{/*begin::1 Level*/}
				{/* <li
					className={`menu-item menu-item-submenu ${getMenuItemActive(
						"/error", true
					)}`}
					aria-haspopup="true"
					data-menu-toggle="hover"
				>
					<NavLink className="menu-link menu-toggle" to="/error">
						<span className="svg-icon menu-icon">
							<SVG
								src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
							/>
						</span>
						<span className="menu-text">Error Pages</span>
						<i className="menu-arrow" />
					</NavLink>
					<div className="menu-submenu ">
						<i className="menu-arrow" />
						<ul className="menu-subnav">
							<li className="menu-item  menu-item-parent" aria-haspopup="true">
								<span className="menu-link">
									<span className="menu-text">Error Pages</span>
								</span>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v1")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v1">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page - 1</span>
								</NavLink>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v2")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v2">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page -2</span>
								</NavLink>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v3")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v3">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page - 3</span>
								</NavLink>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v4")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v4">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page - 4</span>
								</NavLink>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v5")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v5">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page - 5</span>
								</NavLink>
							</li>

							<li
								className={`menu-item ${getMenuItemActive("/error/error-v6")}`}
								aria-haspopup="true"
							>
								<NavLink className="menu-link" to="/error/error-v6">
									<i className="menu-bullet menu-bullet-dot">
										<span />
									</i>
									<span className="menu-text">Error Page - 6</span>
								</NavLink>
							</li>
						</ul>
					</div>
				</li> */}
				{/*end::1 Level*/}
			</ul>

			{/* end::Menu Nav */}
		</>
	);
}
