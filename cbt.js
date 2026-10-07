const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const middleName = document.getElementById("middleName").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const school = document.getElementById("school").value;
    const year = document.getElementById("year").value;
    const course = document.getElementById("course").value;

    // Save student's information
    localStorage.setItem("name", name);
    localStorage.setItem("middleName", middleName);
    localStorage.setItem("surname", surname);
    localStorage.setItem("phone", phone);
    localStorage.setItem("school", school);
    localStorage.setItem("year", year);
    localStorage.setItem("course", course);

    alert("Student registration successful! You can now start your exam.");

    // Go to the exam page
    window.location.href = "exam.html";
});