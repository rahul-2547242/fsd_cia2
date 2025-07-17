
displayStoredData();

document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const fav_coffee = document.getElementById("fav-coffee").value;

        const formData = {
            name: name,
            email: email,
            fav_coffee: fav_coffee
        };
        console.log("Form submitted:", formData);

        localStorage.setItem("contactFormData", JSON.stringify(formData));

        sessionStorage.setItem("contactFormData", JSON.stringify(formData));

        displayStoredData();

        this.reset();
    });

function displayStoredData() {
    const localData = JSON.parse(localStorage.getItem("contactFormData"));
    const sessionData = JSON.parse(sessionStorage.getItem("contactFormData"));

    const name = JSON.stringify(localData.name);
    const fav_coffee = JSON.stringify(localData.fav_coffee);

    // document.getElementById("form-output").textContent = `Hello, ${localData.name}! You Love ${localData.fav_coffee}.`;
    document.getElementById("form-output").textContent = `Hello, ${name}! You Love ${fav_coffee}`;

    // document.getElementById("localData").textContent = `Local Storage: ${JSON.stringify(localData)}`;
    // document.getElementById("sessionData").textContent = `Session Storage: ${JSON.stringify(sessionData)}`;
}

window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, showErr);
    }
    else {
        console.log("Browser does not support geolocation.");
    }
}

function getPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("lat").textContent = lat.toFixed(2);
    document.getElementById("lon").textContent = lon.toFixed(2);
}

function showErr(error) {
    const errorElement = document.getElementById("error");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorElement.textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorElement.textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorElement.textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorElement.textContent = "An unknown error occurred.";
            break;
    }
}