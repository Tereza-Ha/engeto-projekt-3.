// menu

const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("nav");
const hamburgerIcon = document.querySelector(".fa-solid");

menuIcon.addEventListener("click", () => {
  if (hamburgerIcon.classList[1] === "fa-bars") {
    hamburgerIcon.classList.add("fa-xmark");
    hamburgerIcon.classList.remove("fa-bars");
    menuList.style.display = "block";
  } else {
    hamburgerIcon.classList.add("fa-bars");
    hamburgerIcon.classList.remove("fa-xmark");
    menuList.style.display = "none";
  }
});

// scroll up

window.addEventListener("scroll", () => {
  const upIcon = document.querySelector(".up-icon");
  const isScrolled = window.scrollY;
  let scrollable = document.documentElement.scrollHeight - window.innerHeight;

  if (Math.ceil(isScrolled) >= scrollable) {
    upIcon.style.display = "block";
  }
  if (Math.ceil(isScrolled) < 300) {
    upIcon.style.display = "none";
  }
  upIcon.addEventListener("click", () => {
    window.scrollTo(0, 0);
    upIcon.style.display = "none";
  });
});

// dark & light mode

const modeIcon = document.querySelector(".mode-icon i");
const upIcon = document.querySelector(".up-icon i");

// Function set cookie
const setCookie = (name, value) => {
  document.cookie = name + "=" + (value || "") + "; path=/";
};

// Function get cookie
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const darkMode = () => {
  modeIcon.classList.replace("fa-moon", "fa-sun");
  modeIcon.style.color = "var(--icon-color)";
  upIcon.style.color = "var(--icon-color)";
};

const lightMode = () => {
  modeIcon.classList.replace("fa-sun", "fa-moon");
  modeIcon.style.color = "var(--nav-color)";
  upIcon.style.color = "var(--nav-color)";
};

const savedTheme = getCookie("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  darkMode();
} else if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  lightMode();
}

modeIcon.addEventListener("click", () => {
  if (modeIcon.classList[1] === "fa-moon") {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    setCookie("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    setCookie("theme", "light");
  }
});

// form

const contactForm = document.querySelector("form");
const submitButton = document.querySelector("#submit-button");
const infoParagraph = document.createElement("p");
const error = document.getElementById("error-info");
const output = document.querySelector(".send-info");
const checkPassword = (pass, check) => {
  const checkParagraph = document.createElement("p");
  if (pass !== check) {
    checkParagraph.textContent = "Password does not match.";
    document.querySelector(".error-info").appendChild(checkParagraph);
    checkParagraph.style.color = "red";
    return false;
  }
  if (pass.length < 5) {
    checkParagraph.textContent = "Password need to have at least 5 characters.";
    document.querySelector(".error-info").appendChild(checkParagraph);
    checkParagraph.style.color = "red";
    return false;
  }
  return true;
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  infoParagraph.textContent = "";
  output.innerHTML = "";
  error.textContent = "";

  const firstName = document.getElementById("first-name").value;
  const secondName = document.getElementById("surname").value;
  const emailAddress = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("password-check").value;
  let isValid = true;

  if (firstName.length === 0) {
    isValid = false;
    output.innerHTML = "You need to enter name. <br>";
  }
  if (secondName.length === 0) {
    isValid = false;
    output.innerHTML += "You need to enter surname. <br>";
  }
  if (emailAddress.length === 0) {
    isValid = false;
    output.innerHTML += "You need to enter e-mail. <br>";
  }
  if (password.length === 0) {
    isValid = false;
    output.innerHTML += "You need to enter password. <br>";
  }
  if (passwordCheck.length === 0) {
    isValid = false;
    output.innerHTML += "You need to enter password again. <br>";
  }
  if (isValid) {
    if (checkPassword(password, passwordCheck)) {
      infoParagraph.textContent = "Your informations were registered.";
      document.querySelector(".send-info").appendChild(infoParagraph);

      let userData = [];
      userData.push(firstName, secondName, emailAddress);
      let userDataLS = JSON.stringify(userData);
      localStorage.setItem("users", userDataLS);

      document.getElementById("first-name").value = "";
      document.getElementById("surname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("password-check").value = "";
      error.innerHTML = "";
    }
  }
});
