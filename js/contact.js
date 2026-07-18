// ===============================
// Contact Form Validation
// ===============================

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    // Safety: bail out if required elements are missing
    if (!contactForm || !formMessage) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim() ?? "";
        const email = document.getElementById("email")?.value.trim() ?? "";
        const phone = document.getElementById("phone")?.value.trim() ?? "";
        const message = document.getElementById("message")?.value.trim() ?? "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]+$/;

        if (name === "" || email === "" || phone === "" || message === "") {
            formMessage.style.color = "red";
            formMessage.textContent = "Please fill in all fields.";
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        if (!phonePattern.test(phone)) {
            formMessage.style.color = "red";
            formMessage.textContent = "Phone number must contain digits only.";
            return;
        }

        formMessage.style.color = "green";
        formMessage.textContent = "Message submitted successfully!";
        contactForm.reset();
    });
});