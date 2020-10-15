const AppConfigs = {
    serverConfig: {
        host: process.env.REACT_APP_HOST, //'http://localhost',
        port: process.env.REACT_APP_PORT, //'4000',
        defaultRoute: 'api',
        admin: 'admin',
        role: 'role',
        getAdmins: 'getAdmins',
        license: 'license',
        emailTemplate: 'email-template',
        userRoute: 'corporate-admin',
        cms: 'cms',
        category: 'category',
        subCategory: 'sub-category',
        product: 'product',



        employee: 'employee',
        license: 'license',
        branch: 'branch',
        purchaseLicense:'purchaseLicense',
        serverUrl: process.env.REACT_APP_SERVER_URL, // 'http://localhost:4000/api'
    }
};

export default AppConfigs;