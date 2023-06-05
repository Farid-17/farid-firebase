// import { setConfigs } from './firebase-config.js';
import { _get, _save, _delete } from './DB.js';

// setConfigs({
//     apiKey: 'AIzaSyASYdv5Jl-VlI7S0FOscdAgD4FYjLsOt5Y',
//     authDomain: 'test-firebase-597f9.firebaseapp.com',
//     projectId: 'test-firebase-597f9',
//     storageBucket: 'test-firebase-597f9.appspot.com',
//     messagingSenderId: '460851519329',
//     appId: '1:460851519329:web:7700b8a1146ef6fb86ef20',
//     measurementId: 'G-BZX5EKEQFL',
// });

// console.log("Saved:", await _save({
//     // id: "osidfhiosdbf",
//     first: "farid",
//     last: "ham",
//     born: 1998,
// }, 'users'));

// console.log("Saved:", await _save({
//     // id: "osidfhiosdbf",
//     first: "farid",
//     last: "ham2",
//     born: 1998,
// }, 'users', [
//     {
//         column: "first",
//         value: "farid",
//     },
//     {
//         column: "last",
//         value: "ham",
//     },
// ]));

// console.log("Deleted:", await _delete("users", "osidfhiosdbf"));
// console.log("Deleted:", await _delete("users", [
//     {
//         column: "first",
//         value: "farid",
//     },
//     {
//         column: "last",
//         value: "ham2",
//     }
// ]));

// let users = await _get('users');
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
// console.log(users);
