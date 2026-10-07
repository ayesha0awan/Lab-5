// 2. Select form elements

const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const program = document.getElementById("program");
const semester = document.getElementById("semester");

const studentList = document.getElementById("studentList");


// Preview elements using querySelector

const previewName = document.querySelector("#previewName");
const previewEmail = document.querySelector("#previewEmail");
const previewProgram = document.querySelector("#previewProgram");
const previewSemester = document.querySelector("#previewSemester");


// 3. Live preview using input event

fullName.addEventListener("input", function () {
    previewName.textContent = fullName.value || "Your Name";
});

email.addEventListener("input", function () {
    previewEmail.textContent = email.value || "Your Email";
});

program.addEventListener("input", function () {
    previewProgram.textContent = program.value || "Your Program";
});

semester.addEventListener("input", function () {
    previewSemester.textContent = semester.value || "Your Semester";
});


// 4. Submit and validation

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("programError").textContent = "";
    document.getElementById("semesterError").textContent = "";

    let valid = true;


    // Validate Name
    if (fullName.value.trim() === "") {
        document.getElementById("nameError").textContent =
            "Full Name is required";
        valid = false;
    }


    // Validate Email
    if (email.value.trim() === "") {
        document.getElementById("emailError").textContent =
            "Email is required";
        valid = false;
    }


    // Validate Program
    if (program.value === "") {
        document.getElementById("programError").textContent =
            "Please select a program";
        valid = false;
    }


    // Validate Semester
    if (
        semester.value === "" ||
        semester.value < 1 ||
        semester.value > 8
    ) {
        document.getElementById("semesterError").textContent =
            "Semester must be between 1 and 8";
        valid = false;
    }


    // 5. If valid, create new list item

    if (valid) {

        const li = document.createElement("li");

        li.textContent =
            fullName.value +
            " | " +
            email.value +
            " | " +
            program.value +
            " | Semester " +
            semester.value;

        studentList.appendChild(li);

        // Clear form
        form.reset();

        // Reset preview
        previewName.textContent = "Your Name";
        previewEmail.textContent = "Your Email";
        previewProgram.textContent = "Your Program";
        previewSemester.textContent = "Your Semester";
    }

});


// 6. Dark Mode using classList.toggle

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});