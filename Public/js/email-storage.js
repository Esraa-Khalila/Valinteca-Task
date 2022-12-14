const showEmail = document.getElementById("show");
const emailStorage = JSON.parse(localStorage.getItem("user"));
showEmail.innerHTML = emailStorage.email;
