// import { setConfigs } from './FirebaseConfig.js';
// import { _get, _first, _save, _delete } from './DB.js';

// setConfigs({
//     apiKey: '',
//     authDomain: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: '',
//     measurementId: '',
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

// console.log(await _first("users", "hH40iNX5OnopHPsen8MB"));
// console.log(await _first("users", [
//     {
//         column: "first",
//         value: "Ada",
//     },
//     {
//         column: "last",
//         value: "Lovelace",
//     },
// ]));
