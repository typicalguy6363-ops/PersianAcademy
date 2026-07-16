document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupRevealAnimations();
    setupModalButtons();
    setupPasswordButtons();
    setupSignInForm();
    setupSignUpForm();
    setupLessonPage();
});

function setupNavigation() {
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            navigation.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}

function ensureModal() {
    let modalOverlay = document.getElementById("globalModal");

    if (modalOverlay) {
        return modalOverlay;
    }

    modalOverlay = document.createElement("div");
    modalOverlay.id = "globalModal";
    modalOverlay.className = "modal-overlay";

    modalOverlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true">
            <button
                class="modal-close"
                id="globalModalClose"
                type="button"
                aria-label="Close"
            >
                ×
            </button>

            <div class="modal-icon" id="globalModalIcon">✨</div>

            <h2 id="globalModalTitle">QuranAcademy</h2>

            <p id="globalModalMessage"></p>

            <button
                class="button button-primary"
                id="globalModalAction"
                type="button"
            >
                Okay
            </button>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeModal = () => {
        modalOverlay.classList.remove("show");
        document.body.classList.remove("modal-open");
    };

    document
        .getElementById("globalModalClose")
        .addEventListener("click", closeModal);

    document
        .getElementById("globalModalAction")
        .addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    return modalOverlay;
}

function showModal(icon, title, message) {
    const modal = ensureModal();

    document.getElementById("globalModalIcon").textContent =
        icon;

    document.getElementById("globalModalTitle").textContent =
        title;

    document.getElementById("globalModalMessage").textContent =
        message;

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function setupModalButtons() {
    document
        .querySelectorAll("[data-modal-title]")
        .forEach((button) => {
            button.addEventListener("click", () => {
                showModal(
                    button.dataset.modalIcon || "✨",
                    button.dataset.modalTitle || "QuranAcademy",
                    button.dataset.modalMessage || ""
                );
            });
        });
}

function setupPasswordButtons() {
    document
        .querySelectorAll("[data-password-toggle]")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const inputId =
                    button.dataset.passwordToggle;

                const input =
                    document.getElementById(inputId);

                if (!input) {
                    return;
                }

                const showing =
                    input.type === "text";

                input.type =
                    showing ? "password" : "text";

                button.textContent =
                    showing ? "👁️" : "🙈";
            });
        });
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(input, error, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    error.textContent = message;
}

function setFieldSuccess(input, error) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    error.textContent = "";
}

function setupSignInForm() {
    const form =
        document.getElementById("signInForm");

    if (!form) {
        return;
    }

    const email =
        document.getElementById("signInEmail");

    const password =
        document.getElementById("signInPassword");

    const emailError =
        document.getElementById("signInEmailError");

    const passwordError =
        document.getElementById("signInPasswordError");

    const rememberEmail =
        document.getElementById("rememberEmail");

    const savedEmail =
        localStorage.getItem("quranAcademyRememberedEmail");

    if (savedEmail) {
        email.value = savedEmail;
        rememberEmail.checked = true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let valid = true;

        if (!validEmail(email.value.trim())) {
            setFieldError(
                email,
                emailError,
                "Please enter a valid email address."
            );

            valid = false;
        } else {
            setFieldSuccess(email, emailError);
        }

        if (password.value.length < 6) {
            setFieldError(
                password,
                passwordError,
                "Your password must have at least 6 characters."
            );

            valid = false;
        } else {
            setFieldSuccess(password, passwordError);
        }

        if (!valid) {
            return;
        }

        if (rememberEmail.checked) {
            localStorage.setItem(
                "quranAcademyRememberedEmail",
                email.value.trim()
            );
        } else {
            localStorage.removeItem(
                "quranAcademyRememberedEmail"
            );
        }

        showModal(
            "🔐",
            "Sign In Design Works",
            "The form is ready. Real sign in will work after QuranAcademy is connected to secure authentication."
        );
    });
}

function setupSignUpForm() {
    const form =
        document.getElementById("signUpForm");

    if (!form) {
        return;
    }

    const name =
        document.getElementById("signUpName");

    const email =
        document.getElementById("signUpEmail");

    const password =
        document.getElementById("signUpPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const nameError =
        document.getElementById("signUpNameError");

    const emailError =
        document.getElementById("signUpEmailError");

    const passwordError =
        document.getElementById("signUpPasswordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let valid = true;

        if (name.value.trim().length < 2) {
            setFieldError(
                name,
                nameError,
                "Please enter your first name."
            );

            valid = false;
        } else {
            setFieldSuccess(name, nameError);
        }

        if (!validEmail(email.value.trim())) {
            setFieldError(
                email,
                emailError,
                "Please enter a valid email address."
            );

            valid = false;
        } else {
            setFieldSuccess(email, emailError);
        }

        if (password.value.length < 6) {
            setFieldError(
                password,
                passwordError,
                "Use at least 6 characters."
            );

            valid = false;
        } else {
            setFieldSuccess(password, passwordError);
        }

        if (
            !confirmPassword.value ||
            confirmPassword.value !== password.value
        ) {
            setFieldError(
                confirmPassword,
                confirmPasswordError,
                "The passwords do not match."
            );

            valid = false;
        } else {
            setFieldSuccess(
                confirmPassword,
                confirmPasswordError
            );
        }

        if (!valid) {
            return;
        }

        showModal(
            "🎉",
            "Account Page Works",
            "The sign-up design is ready. Real accounts will work after secure authentication is connected."
        );
    });
}

function setupLessonPage() {
    const lessonPage =
        document.querySelector("[data-lesson-page]");

    if (!lessonPage) {
        return;
    }

    const lessons =
        window.QURAN_LESSONS || [];

    if (!lessons.length) {
        showModal(
            "⚠️",
            "Lessons Missing",
            "The lessons.js file could not be loaded."
        );

        return;
    }

    const parameters =
        new URLSearchParams(window.location.search);

    const requestedId =
        parameters.get("id") || lessons[0].id;

    let lessonIndex =
        lessons.findIndex(
            (lesson) => lesson.id === requestedId
        );

    if (lessonIndex === -1) {
        lessonIndex = 0;
    }

    const lesson =
        lessons[lessonIndex];

    document.title =
        `${lesson.title} | QuranAcademy`;

    document.getElementById("lessonCategory").textContent =
        lesson.category;

    document.getElementById("lessonTitle").textContent =
        lesson.title;

    document.getElementById("lessonDescription").textContent =
        lesson.description;

    document.getElementById("lessonArabic").textContent =
        lesson.arabic;

    document.getElementById("lessonPronunciation").textContent =
        lesson.pronunciation;

    const teacherAudio =
        document.getElementById("teacherAudio");

    const audioMessage =
        document.getElementById("audioMessage");

    teacherAudio.src = lesson.audio;
    teacherAudio.load();

    teacherAudio.addEventListener("canplay", () => {
        audioMessage.textContent =
            "Human recording loaded and ready.";
    });

    teacherAudio.addEventListener("error", () => {
        audioMessage.textContent =
            `Upload the MP3 file here: ${lesson.audio}`;
    });

    setupLessonNavigation(lessons, lessonIndex);
    setupVoiceRecording();
}

function setupLessonNavigation(lessons, lessonIndex) {
    const previousButton =
        document.getElementById("previousLessonButton");

    const nextButton =
        document.getElementById("nextLessonButton");

    if (lessonIndex > 0) {
        const previousLesson =
            lessons[lessonIndex - 1];

        previousButton.href =
            `lesson.html?id=${previousLesson.id}`;

        previousButton.textContent =
            `← ${previousLesson.title}`;
    } else {
        previousButton.classList.add("disabled");
        previousButton.removeAttribute("href");
        previousButton.textContent = "← First lesson";
    }

    if (lessonIndex < lessons.length - 1) {
        const nextLesson =
            lessons[lessonIndex + 1];

        nextButton.href =
            `lesson.html?id=${nextLesson.id}`;

        nextButton.textContent =
            `${nextLesson.title} →`;
    } else {
        nextButton.classList.add("disabled");
        nextButton.removeAttribute("href");
        nextButton.textContent = "Last lesson →";
    }
}

function setupVoiceRecording() {
    const startButton =
        document.getElementById("startRecordingButton");

    const stopButton =
        document.getElementById("stopRecordingButton");

    const checkButton =
        document.getElementById("checkPronunciationButton");

    const studentAudio =
        document.getElementById("studentAudio");

    const recordingStatus =
        document.getElementById("recordingStatus");

    if (
        !startButton ||
        !stopButton ||
        !studentAudio ||
        !recordingStatus
    ) {
        return;
    }

    let mediaRecorder = null;
    let mediaStream = null;
    let audioChunks = [];
    let studentRecording = null;
    let studentRecordingUrl = null;

    startButton.addEventListener("click", async () => {
        const supported =
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia &&
            window.MediaRecorder;

        if (!supported) {
            showModal(
                "🎙️",
                "Recording Not Supported",
                "This browser does not support microphone recording. Try a recent version of Chrome, Edge, Firefox, or Safari."
            );

            return;
        }

        try {
            mediaStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

            audioChunks = [];

            mediaRecorder =
                new MediaRecorder(mediaStream);

            mediaRecorder.addEventListener(
                "dataavailable",
                (event) => {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                }
            );

            mediaRecorder.addEventListener(
                "stop",
                () => {
                    studentRecording =
                        new Blob(audioChunks, {
                            type:
                                mediaRecorder.mimeType ||
                                "audio/webm"
                        });

                    if (studentRecordingUrl) {
                        URL.revokeObjectURL(
                            studentRecordingUrl
                        );
                    }

                    studentRecordingUrl =
                        URL.createObjectURL(
                            studentRecording
                        );

                    studentAudio.src =
                        studentRecordingUrl;

                    studentAudio.hidden = false;

                    recordingStatus.textContent =
                        "Recording complete. Play it back below.";

                    mediaStream
                        .getTracks()
                        .forEach((track) => {
                            track.stop();
                        });

                    mediaStream = null;
                }
            );

            mediaRecorder.start();

            startButton.disabled = true;
            stopButton.disabled = false;

            recordingStatus.textContent =
                "Recording now... read the lesson aloud.";
        } catch (error) {
            showModal(
                "🎙️",
                "Microphone Permission Needed",
                "Please allow microphone access so QuranAcademy can record your practice."
            );
        }
    });

    stopButton.addEventListener("click", () => {
        if (
            mediaRecorder &&
            mediaRecorder.state === "recording"
        ) {
            mediaRecorder.stop();

            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });

    checkButton.addEventListener("click", () => {
        if (!studentRecording) {
            showModal(
                "🎙️",
                "Record Your Voice First",
                "Listen to the lesson, record yourself, and then press Check My Pronunciation."
            );

            return;
        }

        showModal(
            "✨",
            "Recording Ready for AI Checking",
            "Your recording was captured successfully. The secure AI pronunciation checker still needs to be connected through a backend. QuranAcademy will not pretend to score your recitation before that system is ready."
        );
    });
}
