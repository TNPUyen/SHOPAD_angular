const firebase = require('firebase');

firebase.default.initializeApp({
    apiKey: "AIzaSyCXbSFY-OcsEylEr023_sa_RN0HWoF9X7o",
    authDomain: "admin-a04f5.firebaseapp.com",
    projectId: "admin-a04f5",
})

const db = firebase.default.firestore();

module.exports = db;