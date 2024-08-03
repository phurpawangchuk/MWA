// const promise1 = new Promise((resolve, reject) => {
//     let number = Math.random();
//     setTimeout(() => {
//         if (number > 0.5) {
//             resolve(number);
//         } else {
//             reject("Promise 1 errorreject");
//         }
//     }, 2000);
// });

// const promise2 = new Promise((resolve, reject) => {
//     let number = Math.random();
//     number += 0.5;
//     setTimeout(() => {
//         if (number > 0.5) {
//             resolve(number);
//         } else {
//             reject("Promise 2 errorreject");
//         }
//     }, 1000);
// });

// const promise3 = new Promise((resolve, reject) => {
//     let number = Math.random();
//     number -= 0.5;
//     setTimeout(() => {
//         if (number > 0.5) {
//             resolve(number);
//         } else {
//             reject("Promise 3 errorreject");
//         }
//     }, 500);
// });


////use promise 1

// promise1.then((number) => {
//     console.log("then is called, resolved() called.", number);
// }).catch((errorMessage) => {
//     console.log("Catch called, Reject called().", errorMessage);
// });

// promise2.then((number) => {
//     console.log("then is called, resolved() called.", number);
// }).catch((errorMessage) => {
//     console.log("Catch called, Reject called().", errorMessage);
// });

// promise3.then((number) => {
//     console.log("then is called, resolved() called.", number);
// }).catch((errorMessage) => {
//     console.log("Catch called, Reject called().", errorMessage);
// });


//failed one output

// Promise.all([promise1, promise2, promise3])
//     .then((data) => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     });

// //First resolved will execute and output, runs continue the other too
// //If resolved, gives array of resolved
// Promise.race([promise1, promise2, promise3])
//     .then((data) => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     });


function resolveAFterTwoSecond() {
    return new Promise(resolve => setTimeout(() => resolve("DOne"), 2000));
}

async function myAsyncFunction() {
    console.log("Start");
    const resolve = await resolveAFterTwoSecond();
    console.log(resolve);
    console.log("End");
}

//Main thread is not blocked meaning asynchronow
//In the main thread there should not be synchronos code which wil block the execution of next
//await make it promise
console.log("Begin");
myAsyncFunction();
console.log("Finished");