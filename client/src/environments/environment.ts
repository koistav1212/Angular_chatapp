// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA0m0XqKiowyfqeCcJqDmipssn30KzIjRc",
    authDomain: "whatsappweb-375319.firebaseapp.com",
    projectId: "whatsappweb-375319",
    storageBucket: "whatsappweb-375319.appspot.com",
    messagingSenderId: "202267089584",
    appId: "1:202267089584:web:9dece51939c02e9c1d3975"
    }
};