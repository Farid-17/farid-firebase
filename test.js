// import { setConfigs } from './firebase-config.js';
import { _get } from './DB.js';

// setConfigs({
//     apiKey: 'AIzaSyASYdv5Jl-VlI7S0FOscdAgD4FYjLsOt5Y',
//     authDomain: 'test-firebase-597f9.firebaseapp.com',
//     projectId: 'test-firebase-597f9',
//     storageBucket: 'test-firebase-597f9.appspot.com',
//     messagingSenderId: '460851519329',
//     appId: '1:460851519329:web:7700b8a1146ef6fb86ef20',
//     measurementId: 'G-BZX5EKEQFL',
// });

let users = await _get('users');
// let users = await _get('users', 'hH40iNX5OnopHPsen8MB');
// let users = await _get('users', [
//     {
//         column: "first",
//         value: "Ada",
//     },
//     {
//         column: "last",
//         value: "Lovelace",
//     }
// ]);
console.log(users);