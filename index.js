import "./user.js";

window.addEventListener("load", async () => {
    // fetchUsers();
    registerSW();
});

// const fetchUsers = async () => {
//     const result = await fetch("https://jsonplaceholder.typicode.com/users");
//     const json = await result.json();

//     const userContainer = document.querySelector(".user-container");

//     await json.forEach(user => {
//         const userEl = document.createElement("user-component");
//         userEl.user = user;
//         userContainer.appendChild(userEl);
//     });

//     await registerSW();
// };

const registerSW = async () => {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("./sw.js");
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
};
