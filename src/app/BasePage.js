import React, { Suspense, lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout';
import { BuilderPage } from './pages/BuilderPage';
import { MyPage } from './pages/MyPage';
import { DashboardPage } from './pages/DashboardPage';
import AdminManagement from './pages/AdminManagement';
import LicenseManagement from './pages/LicenseManagement';
import GeneralSettings from './pages/GeneralSettings'
import CorporateManagement from './pages/CorporateManagement';
import CategoryManagement from './pages/CategoryManagement';

const GoogleMaterialPage = lazy(() =>
  import('./modules/GoogleMaterialExamples/GoogleMaterialPage')
);
const ReactBootstrapPage = lazy(() =>
  import('./modules/ReactBootstrapExamples/ReactBootstrapPage')
);
const ECommercePage = lazy(() =>
  import('./modules/ECommerce/pages/eCommercePage')
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

	return (
		<Suspense fallback={<LayoutSplashScreen />}>	
			<Switch>
				{
					/* Redirect from root URL to /dashboard. */
					<Redirect exact from="/" to="/dashboard" />
				}
				<ContentRoute path="/dashboard" component={DashboardPage} />
				<ContentRoute path="/admin-management" component={AdminManagement} />
				<ContentRoute path="/license-management" component={LicenseManagement} />
				<ContentRoute path="/category-management" component={CategoryManagement} />
        		<ContentRoute path='/corporate-management' component={CorporateManagement} />
				<ContentRoute path='/general-settings' component={GeneralSettings} />
				<ContentRoute path="/builder" component={BuilderPage} />
				<ContentRoute path="/my-page" component={MyPage} />
				<Route path="/google-material" component={GoogleMaterialPage} />
				<Route path="/react-bootstrap" component={ReactBootstrapPage} />
				<Route path="/e-commerce" component={ECommercePage} />
				<Redirect to="error/error-v1" />
			</Switch>
		</Suspense>
	);
}
