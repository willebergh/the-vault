import CryptoJS from "crypto-js";

function getPrivateKey(pwd) {
    const privateKey = localStorage.getItem("privateKey");
    return CryptoJS.AES.decrypt(privateKey, pwd).toString(CryptoJS.enc.Utf8);
}