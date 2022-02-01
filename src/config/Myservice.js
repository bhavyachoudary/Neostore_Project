import axios from 'axios';
import { MAIN_URL } from './Url';

let token = sessionStorage.getItem('_token');


//login
export function authentication(token) {
    return axios.get(`${MAIN_URL}neostore/loginfirst`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}
export function registerUser(data) {
    return axios.post(`${MAIN_URL}neostore/register`, data);
}
export function socialloggin(data) {
    return axios.post(`${MAIN_URL}neostore/sociallogin`, data);
}

export function loginUser(data) {
    return axios.post(`${MAIN_URL}neostore/login`, data);
}

//products
export function getProducts() {
    return axios.get(`${MAIN_URL}neostore/products`);
}
export function getsingleproduct(data) {
    return axios.get(`${MAIN_URL}neostore/singleproduct/` + data);

}
export function Rate(id, data) {
    return axios.put(`${MAIN_URL}neostore/rate/${id}`, data);
}

//categories
export function getCategoriesProducts(id) {
    return axios.get(`${MAIN_URL}neostore/catproducts/${id}`);
}
export function getColorsProducts(id) {
    return axios.get(`${MAIN_URL}neostore/colproducts/${id}`);
}

export function allCategories() {
    return axios.get(`${MAIN_URL}neostore/category`);
}

export function allColors() {
    return axios.get(`${MAIN_URL}neostore/color`);
}

//cart & orders
export function createOrders(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}neostore/carddetails`, data)
}
export function getOrderdata(email) {
    return axios.get(`${MAIN_URL}neostore/getorder/${email}`);
}
export function cardaddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}neostore/cardaddress`, data)
}

export function getpdf(data) {
    console.log(data)
    return axios.get(`${MAIN_URL}neostore/pdf/` + data);
}
export function sendMail(data) {
    return axios.post(`${MAIN_URL}neostore/sendmail`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

//profile
export function changePass(id, data) {
    return axios.put(`${MAIN_URL}neostore/changepass/${id}`, data);
}
export function getProfile(email) {
    return axios.get(`${MAIN_URL}neostore/profile/${email}`);
}

export function updProfile(id, data) {
    console.log(data)
    return axios.put(`${MAIN_URL}neostore/updprofile/${id}`, data);

}
export function changePassword(email, data) {
    return axios.put(`${MAIN_URL}neostore/changepassword/${email}`, data, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}
export function sendMailotp(data) {
    return axios.post(`${MAIN_URL}neostore/sendmailotp`, data)
}
export function forgotPassword(data) {
    return axios.post(`${MAIN_URL}neostore/forgotpassword`, data)
}

//address
export function addAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}neostore/addaddress`, data)
}
export function editAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}neostore/editaddress`, data)
}
export function deleteAddr(email, data) {
    return axios.post(`${MAIN_URL}neostore/deleteadd/${email}`, data);
}

export function selectAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}neostore/selectaddress`, data)
}






