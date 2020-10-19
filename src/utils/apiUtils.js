import axios from 'axios';
import AppConfigs from './config';
const {
    serverConfig: {
        defaultRoute,
        employee,
        host,
        port,
        admin,
        role,
        getAdmins,
        license,
        emailTemplate,
        userRoute,
        cms,
        category,
        subCategory,
        product,
        branch,
        purchaseLicense,
        costSummary,
        serverUrl
    }
} = AppConfigs

const serverUrls = {
    getHost: () => host,
    getPort: () => port,
    getDefaulUrl: () => `${host}:${port}/${defaultRoute}`,


    getAdminUrl() {
        return `${this.getDefaulUrl()}/${admin}`
    },
    getRolesAndPermission() {
        return `${this.getAdminUrl()}/${role}`
    },
    getAdminsURL() {
        return `${this.getAdminUrl()}/${getAdmins}`
    },
    getLicenseUrl() {
        return `${this.getDefaulUrl()}/${license}`;
    },
    getEmailTemplate() {
        return `${this.getAdminUrl()}/${emailTemplate}`
    },
    getCorporateUrl() {
        return `${this.getAdminUrl()}/${userRoute}`;
    },
    getCmsUrl(){
        return `${this.getAdminUrl()}/${cms}`
    },
    getCategory(){
        return `${this.getDefaulUrl()}/${userRoute}/${category}`
    },
    getSubCategory (){
        return `${this.getDefaulUrl()}/${userRoute}/${subCategory}`
    },
    getproduct (){
        return `${this.getDefaulUrl()}/${userRoute}/${product}`
    },
    getEmployeeUrl() {
        return `${this.getCorporateUrl()}/${employee}`;
    },
    getBranchUrl() {
        return `${branch}`;
    },
    getPurchaseLicenseUrl() {
        return `${this.getCorporateUrl()}/${purchaseLicense}`
    },
    getCostSummaryUrl() {
        return `${this.getAdminUrl()}/${costSummary}`
    },
}


const getServerCore = () => {
    return {
        serverUrls,
    }
}

export default getServerCore;