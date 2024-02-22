import axios from "axios"
import ApiUtils from "./ApiUtils";
import { CREDITS, LOGIN } from "../Redux/Types";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

const Services = {
    login: (data, buttonLoader, dispatcher) => {
        // console.log("data in api",data);
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.login}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then(async (result) => {
            console.log("login result", result.data.data);
            await AsyncStorage.setItem("user", JSON.stringify(result.data.data))
            dispatcher({ type: LOGIN, payload: result.data.data });

        }).catch((e) => {
            console.log("error in the api:", e);
            Toast.show({
                type: "tomatoToast",
                text1: e.response.data.message,
            })

        }).finally(() => { buttonLoader(false); })



    },
    signup: (data, buttonLoader, navigation) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.signup}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((result) => {
            console.log("login result", result);
            buttonLoader(false);
            Toast.show({
                type: "greenSuccess",
                text1: `${result.data.message}, Login to access your account`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
                onHide: () => navigation.reset(
                    {
                        index: 1,
                        routes: [
                            {
                                name: "Sign-In"
                            }
                        ]
                    }
                )
            })
            // dispatcher({ type: LOGIN, payload: result.data.data });

        }).catch((e) => {
            Toast.show({
                type: "tomatoToast",
                text1: e,
                position: "top",
                visibilityTime: 1500,
                autoHide: true
            })
            console.log("error in the api:", e);
            buttonLoader(false);
        })
    },
    checkPhoneNumber: (data, navigation, loader, phone) => {
        loader(true)
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.checkPhoneNumber}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((result) => {
            console.log("phone result", result.data);
            auth().signInWithPhoneNumber(`+92${phone.slice(1)}`, true).then((valdator) => {
                loader(false);
                navigation.navigate('Otp', { otpValidator: valdator, type: "forgot", userDetails: data });

            }).catch((error) => {
                console.log(error);
                let message;
                if (error.code === 'auth/too-many-requests') {
                    message = "Too Many requests, please try again in 4 hours"
                } else if (error.code === 'auth/invalid-phone-number') {
                    message = "The phone number provided is incorrect."
                }
                Toast.show({
                    type: "tomatoToast",
                    text1: message,
                    onHide: () => loader(false)
                })
                // console.log(error);
            })
            // buttonLoader(false);
            // dispatcher({ type: LOGIN, payload: result.data.data });

        }).catch((e) => {
            Toast.show({
                type: "tomatoToast",
                text1: e.response.data.message,
                position: "top",
                visibilityTime: 1500,
                autoHide: true,
                onHide: () => loader(false)
            })
            console.log("error in the api:", e.response.data.message);
            // buttonLoader(false);
        })
    },
    changePassword: (data, loader, navigation, type) => {
        loader(true);
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.changePassword}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((result) => {
            console.log("phone result", result.data.message);
            Toast.show({
                type: "greenSuccess",
                text1: result.data.message,
                position: "top",
                visibilityTime: 1500,
                autoHide: true,
                onHide: () => {
                    type != "in-app" ?
                        navigation.reset(
                            {
                                index: 1,
                                routes: [
                                    {
                                        name: "Sign-In"
                                    }
                                ]
                            }
                        ) : navigation.goBack()
                }
            })
        }).catch((e) => {
            // Toast.show({
            //     type: "tomatoToast",
            //     text1: e.response.data.message,
            //     position: "top",
            //     visibilityTime: 1500,
            //     autoHide: true
            // })
            console.log("error in change pass api:", e);
            // buttonLoader(false);
        }).finally(() => {
            loader(false)
        })
    },
    getSubscriptionPackages: (setData, setLoader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.subscriptionPackages}`).then((result) => {
            console.log(result.data.data);
            setData(result.data.data)
        }).finally(() => {
            setLoader(false)
        })
    },
    getInventory: (id, setInventory, loader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getInventory}${id}`).then((result) => {
            console.log("result.data", result);
            setInventory(result.data.inventory);
        }).catch((err) => { console.log("error in the api ==>", err); })
            .finally(() => loader(false))
    },
    updateInventory: (data, setInventory, loader) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.updateInventory}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((result) => {
            console.log("result.data", result);
            setInventory(result.data.inventory);
        }).catch((err) => { console.log("error in the api ==>", err); })
            .finally(() => loader(false))
    },
    addTransaction: (data, navigation, dispatcher, loader) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.addTransaction}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            dispatcher({ type: CREDITS, payload: response.data.amount })
            loader(false)
            Toast.show({
                type: "greenSuccess",
                text1: `${response.data.message}`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
                onHide: () => navigation.goBack()
            })
        }).catch((err) => {
            console.log(err);
        }).finally(() => loader(false))

    },

    getTransections: (id, setData, loader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getTransactions}${id}`).then((response) => {
            console.log("response", response.data);
            setData(response.data.data)
        }).catch((err) => {
            console.log("err", err);
        }).finally(() => loader(false))
    },
    getUserDetails: (user, dispatcher, callback) => {
        console.log("user in api", user.id);
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getUserDetails}${user.id}`).then(async (response) => {
            console.log("user details get api", response.data.data);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.data))
            dispatcher({ type: LOGIN, payload: response.data.data })
            callback();
        }).catch(() => {
            // if no internet then save the one we previously had
            dispatcher({ type: LOGIN, payload: user });
            callback();
        })
    },

    getCurrentWeather: (setWeather, loader) => {
        loader(true);
        axios.post("http://api.weatherapi.com/v1/current.json?key=206413a0989542d7b0a103505241802&q=Karachi").then((response) => {
            console.log(response.data);
            setWeather(response.data);
            loader(false)
        })
    },

    getWeatherHistory: async (setWeatherHistory, loader, dates) => {
        loader(true);
        axios.post(`http://api.weatherapi.com/v1/history.json?key=206413a0989542d7b0a103505241802&q=Karachi&dt=${dates.start}&end_dt=${dates.end}`).then((response) => {
            console.log(response.data.forecast.forecastday);
            setWeatherHistory(response.data.forecast.forecastday);
        })
    },

    getSalesPredictions: (data, setPrediction,) => {
        axios.post(ApiUtils.predictionApi, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log("prediction response", response.data["Sales Prediction"]);
            setPrediction(response.data["Sales Prediction"])
        }).catch((err) => {
            console.warn("error in prediction api", err);
        })
    },
    addVendorBank: (data, loader, navigation) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.addBank}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {

            console.log("bank added", response.data.message);
            Toast.show({
                type: "greenSuccess",
                text1: `${response.data.message}`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
                onHide: () => navigation.goBack()
            })
        }).catch((err) => {
            console.log(err.response.data);
        }).finally(() => loader(false))
    },
    getVendorbanks: (id, setBanks, setLoader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getBank}${id}`).then((response) => {
            console.log("banks", response.data.data);
            setBanks(response.data.data)
        }).catch((err) => {
            console.log(err);
        }).finally(() => setLoader(false))
    },
    addWithdrawRequest: (data, loader, navigation) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.makeWithdrawRequest}`, data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                console.log("withdraw response", response);
                Toast.show({
                    type: "greenSuccess",
                    text1: `${response.data.message}`,
                    position: "top",
                    visibilityTime: 2000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }).catch((err) => {
                console.log("Error", err);
            }).finally(() => {
                loader(false)
            })
    },
    updateProfile: (data, loader, dispatcher, navigation) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.updateProfile}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then(async (response) => {
            console.log("update resp", response.data.data);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.data))
            dispatcher({ type: LOGIN, payload: response.data.data });
            Toast.show({
                type: "greenSuccess",
                text1: `${response.data.message}`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
                onHide: () => navigation.goBack()
            })
        }).catch((err) => {
            console.log("error", err);
        }).finally(() => {
            loader(false)
        })
    },
    getMyVendor: (id, setVendor, setLoader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getVendor}${id}`).then((response) => {
            console.log("banks", response.data.data);
            setVendor(response.data.data)
            if (response.data.data != null) {
                setLoader(false)
            }
        }).catch((err) => {
            console.log(err);
        })
    },

    getVendorList: (setData, loader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getVendorList}`).then((response) => {
            console.log("vendor", response.data.vendors);
            setData(response.data.vendors)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            loader(false)
        })
    },


    makeCustomer: (data, setLoader, setVendor) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.makeCustomer}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log("make customer response", response.data);
            setVendor(undefined)

        }).finally(() => { setLoader(false) });
    },

    placeOrder: (data, buttonLoader, modalCloser, trigger) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.placeOrder}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log("make Order response", response.data);

            Toast.show({
                type: "greenSuccess",
                text1: `${response.data.message}`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
            })

        }).catch((error) => {

            console.log("error in order order", error);
        })
            .finally(() => { buttonLoader(false); modalCloser(false); trigger(undefined) });

    },
    getOrders: (id, setLoader, setOrders) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getOrders}${id}`).then((response) => {
            console.log("there are my orders in api", response.data.data);
            setOrders(response.data.data)
        }).catch((err) => {
            console.log(err);
        }).finally(() => { setLoader(false) });
    },

    orderPayment: (data, loader, dispatcher, trigger) => {
        axios.post(`${ApiUtils.BaseUrl}${ApiUtils.orderPayment}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log("response of payment", response.data);
            dispatcher({ type: CREDITS, payload: response.data.newBalance })
            trigger(undefined);
            Toast.show({
                type: "greenSuccess",
                text1: `${response.data.message}`,
                position: "top",
                visibilityTime: 2000,
                autoHide: true,
            })
        }).catch((err) => {
            console.log("error in payment", err);
        }).finally(() => { loader(false) });

    },

    getCustomers: (id,setData, loader) => {
        axios.get(`${ApiUtils.BaseUrl}${ApiUtils.getCustomer}${id}`).then((response) => {
            console.log("there are my customers in api", response.data.data);
            setData(response.data.data)
        }).catch((err) => {
            console.log(err);
        }).finally(() => { loader(false) });
    }
}

export default Services