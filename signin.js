// PersianAcademy Sign In Page JavaScript

const signInMenuButton =
    document.getElementById("signInMenuButton");

const signInNavigation =
    document.getElementById("signInNavigation");

const signInModalOverlay =
    document.getElementById("signInModalOverlay");

const signInModalClose =
    document.getElementById("signInModalClose");

const signInModalAction =
    document.getElementById("signInModalAction");

const signInModalIcon =
    document.getElementById("signInModalIcon");

const signInModalTitle =
    document.getElementById("signInModalTitle");

const signInModalMessage =
    document.getElementById("signInModalMessage");

function openSignInModal(icon, title, message) {
    if (
        !signInModalOverlay ||
        !signInModalIcon ||
        !signInModalTitle ||
        !signInModalMessage
    ) {
        return;
    }

    signInModalIcon.textContent = icon;
    signInModalTitle.textContent = title;
    signInModalMessage.textContent = message;

    signInModalOverlay.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeSignInModal() {
    if (!signInModalOverlay) {
        return;
    }

    signInModalOverlay.classList.remove("show");
    document.body.classList.remove("modal-open");
}

if (signInMenuButton && signInNavigation) {
    signInMenuButton.addEventListener("click", () => {
        const isOpen =
            signInNavigation.classList.toggle("open");

        signInMenuButton.classList.toggle(
            "active",
            isOpen
        );

        signInMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        if (signInNavigation) {
            signInNavigation.classList.remove("open");
        }

        if (signInMenuButton) {
            signInMenuButton.classList.remove("active");

            signInMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});

if (signInModalClose) {
    signInModalClose.addEventListener(
        "click",
        closeSignInModal
    );
}

if (signInModalAction) {
    signInModalAction.addEventListener(
        "click",
        closeSignInModal
    );
}

if (signInModalOverlay) {
    signInModalOverlay.addEventListener(
        "click",
        (event) => {
            if (event.target === signInModalOverlay) {
                closeSignInModal();
            }
        }
    );
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSignInModal();
    }
});

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

if (passwordInput && passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const passwordIsHidden =
            passwordInput.type === "password";

        passwordInput.type =
            passwordIsHidden ? "text" : "password";

        passwordToggle.textContent =
            passwordIsHidden ? "🙈" : "👁️";

        passwordToggle.setAttribute(
            "aria-label",
            passwordIsHidden
                ? "Hide password"
                : "Show password"
        );
    });
}

const emailInput =
    document.getElementById("email");

const rememberMe =
    document.getElementById("rememberMe");

const savedEmail =
    localStorage.getItem("persianAcademyRememberedEmail");

if (savedEmail && emailInput && rememberMe) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showInputError(
    input,
    errorElement,
    message
) {
    input.classList.remove("input-success");
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function showInputSuccess(
    input,
    errorElement
) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    errorElement.textContent = "";
}

const signInForm =
    document.getElementById("signInForm");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const signInSubmitButton =
    document.getElementById("signInSubmitButton");

if (
    signInForm &&
    emailInput &&
    passwordInput &&
    emailError &&
    passwordError
) {
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        let formIsValid = true;

        if (!email) {
            showInputError(
                emailInput,
                emailError,
                "Please enter your email address."
            );

            formIsValid = false;
        } else if (!isValidEmail(email)) {
            showInputError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            formIsValid = false;
        } else {
            showInputSuccess(
                emailInput,
                emailError
            );
        }

        if (!password) {
            showInputError(
                passwordInput,
                passwordError,
                "Please enter your password."
            );

            formIsValid = false;
        } else if (password.length < 6) {
            showInputError(
                passwordInput,
                passwordError,
                "Your password must have at least 6 characters."
            );

            formIsValid = false;
        } else {
            showInputSuccess(
                passwordInput,
                passwordError
            );
        }

        if (!formIsValid) {
            return;
        }

        if (rememberMe && rememberMe.checked) {
            localStorage.setItem(
                "persianAcademyRememberedEmail",
                email
            );
        } else {
            localStorage.removeItem(
                "persianAcademyRememberedEmail"
            );
        }

        if (signInSubmitButton) {
            signInSubmitButton.classList.add("loading");
            signInSubmitButton.disabled = true;
        }

        setTimeout(() => {
            if (signInSubmitButton) {
                signInSubmitButton.classList.remove(
                    "loading"
                );

                signInSubmitButton.disabled = false;
            }

            openSignInModal(
                "🎉",
                "Sign In Page Works!",
                "The design and form are working. Real accounts will be connected later using a secure database."
            );
        }, 900);
    });
}

if (emailInput && emailError) {
    emailInput.addEventListener("input", () => {
        emailInput.classList.remove("input-error");
        emailError.textContent = "";
    });
}

if (passwordInput && passwordError) {
    passwordInput.addEventListener("input", () => {
        passwordInput.classList.remove("input-error");
        passwordError.textContent = "";
    });
}

const forgotPasswordButton =
    document.getElementById("forgotPasswordButton");

if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener(
        "click",
        () => {
            openSignInModal(
                "🔑",
                "Forgot Your Password?",
                "Password recovery will work after we connect real user accounts."
            );
        }
    );
}

const googleSignInButton =
    document.getElementById("googleSignInButton");

if (googleSignInButton) {
    googleSignInButton.addEventListener(
        "click",
        () => {
            openSignInModal(
                "G",
                "Google Sign In",
                "Google Sign In will be connected when we add real authentication."
            );
        }
    );
}

const accountButtons = [
    document.getElementById("topSignUpButton"),
    document.getElementById("createAccountButton"),
    document.getElementById(
        "footerCreateAccountButton"
    )
].filter(Boolean);

accountButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openSignInModal(
            "🌟",
            "Create an Account",
            "The matching Sign Up page will be added next."
        );
    });
});

const signInContactButton =
    document.getElementById("signInContactButton");

if (signInContactButton) {
    signInContactButton.addEventListener(
        "click",
        () => {
            openSignInModal(
                "✉️",
                "Contact PersianAcademy",
                "A real contact page will be added soon."
            );
        }
    );
}

const welcomeSoundButton =
    document.getElementById("welcomeSoundButton");

if (welcomeSoundButton) {
    welcomeSoundButton.addEventListener(
        "click",
        () => {
            const speechSupported =
                "speechSynthesis" in window &&
                "SpeechSynthesisUtterance" in window;

            if (!speechSupported) {
                openSignInModal(
                    "🔊",
                    "Pronunciation",
                    "Your browser does not support speech playback."
                );

                return;
            }

            window.speechSynthesis.cancel();

            const speech =
                new SpeechSynthesisUtterance(
                    "Khosh amadid"
                );

            speech.rate = 0.78;
            speech.pitch = 1;
            speech.volume = 1;

            window.speechSynthesis.speak(speech);
        }
    );
}

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

window.addEventListener("load", () => {
    revealElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("visible");
        }, index * 120);
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        if (signInNavigation) {
            signInNavigation.classList.remove("open");
        }

        if (signInMenuButton) {
            signInMenuButton.classList.remove("active");

            signInMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }
});
