const formElem = document.getElementById("register-form");
const usernameSpan = document.getElementById("username-span");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordSpan = document.getElementById("confirm-password-span");
formElem.onsubmit = (e) => {
  e.preventDefault();

  // let response =
  fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
  })
    .then(handleResponse)
    .then(function (data) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "./Success.html";
    })
    .catch((error) => {
      if (confirmPassword.value == "") {
        confirmPasswordSpan.innerHTML = "The confirm password is required";
      } else {
        confirmPasswordSpan.innerHTML = "";
      }

      if (error.errors?.username) {
        usernameSpan.innerHTML = error.errors.username;
      } else {
        usernameSpan.innerHTML = "";
      }
      if (error.errors?.email) {
        email.innerHTML = error.errors.email;
      } else {
        email.innerHTML = "";
      }
      if (error.errors?.password) {
        password.innerHTML = error.errors.password;
      } else {
        password.innerHTML = "";
      }
    });
};

const handleResponse = (res) => {
  if (!res.ok) {
    return res
      .text()
      .then((result) => JSON.parse(result))
      .then((result) =>
        Promise.reject({
          message: result.message,
          errors: result.errors,
        })
      );
  } else {
    return res.json();
  }
};

