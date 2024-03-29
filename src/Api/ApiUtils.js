const ApiUtils = {
    predictionApi : "http://ec2-51-21-127-105.eu-north-1.compute.amazonaws.com:5000/getPredictionOutput",
    stripePublishToken: "pk_test_51OlUJxDfqa6f2oH3WUQDp7nBkhepK2t4Z26hLibqBifSsVYLsLKsyLXvIJleYP30FFA87ANspPnqWnyOu4ScW7Ut00D81j1mVD",
    stripeSecretToken: "sk_test_51OlUJxDfqa6f2oH3aVzxWhTFfwWKS6VKPRz5aZGkK8FL6HlicR9Xs51IHENSqbt6oQDQ2WM4ldLXEOwWSKBuCVit00Ev4380i9",
    BaseUrl: "http://ec2-13-51-175-157.eu-north-1.compute.amazonaws.com:8000/",
    // BaseUrl: "http://localhost:8000/",
    login: "authentication/login",
    signup: "authentication/signup",
    checkPhoneNumber: "authentication/verifyPhoneNumber",
    changePassword: "authentication/changePassword",
    subscriptionPackages: "shop/getSubscriptionPackages",
    getInventory: "shop/getInventory/",
    updateInventory: "shop/updateInventory",
    addTransaction: "common/addTransection",
    getTransactions : "common/getTransection/",
    getUserDetails: "authentication/getUserDetails/",
    addBank : "shop/addBank",
    getBank : "shop/getBanks/",
    makeWithdrawRequest : "shop/withdrawlRequest",
    updateProfile : "common/updateProfile",
    getVendor: "customer/getMyVendor/",
    getVendorList : "customer/getVendors",
    makeCustomer : "customer/makeCustomer",
    getOrders : "customer/getOrder/",
    placeOrder : "customer/placeOrder",
    orderPayment:"customer/orderPayment",
    getCustomer: "shop/getCustomers/"
}

export default ApiUtils