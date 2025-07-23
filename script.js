
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
    
    localStorage.setItem("contactFormData", JSON.stringify(formData));
    sessionStorage.setItem("contactFormData", JSON.stringify(formData));
    
    displayStoredData();
    this.reset();
});

function displayStoredData() {
    const localData = JSON.parse(localStorage.getItem("contactFormData"));
    const sessionData = JSON.parse(sessionStorage.getItem("contactFormData"));

    const outputElement = document.getElementById("form-output");
    outputElement.textContent = "";
    
    if (localData) {
        outputElement.textContent = `Hello, ${localData.name}! You Love ${localData.fav_coffee}.`;
    }
    
}
displayStoredData();

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

$(document).ready(function() {
    const apiUrl = 'https://api.sampleapis.com/coffee/hot';
    
    function fetchCoffees() {
        $.get(apiUrl, function(data) {
            const coffees = data.slice(0, 8); 
            displayCoffees(coffees);
        }).fail(function() {
            $('#coffee-list').html('<p class="text-red-600 col-span-4 text-center">Failed to load coffee data. Please try again later.</p>');
        });
    }
    
    function displayCoffees(coffeeArray) {
        if (coffeeArray.length === 0) {
            $('#coffee-list').html('<p class="text-gray-600 col-span-4 text-center">No coffees available at the moment.</p>');
            return;
        }
        
        $('#coffee-list').empty();
        coffeeArray.forEach(coffee => {
            const coffeeCard = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <img src="${coffee.image}" alt="${coffee.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-bold mb-2">${coffee.title}</h3>
                        <p class="text-gray-600 mb-4">${coffee.description}</p>
                        <div class="mt-4">
                            <h4 class="font-semibold text-gray-800">Ingredients:</h4>
                            <p class="text-gray-600">${coffee.ingredients.join(', ')}</p>
                        </div>
                    </div>
                </div>
            `;
            $('#coffee-list').append(coffeeCard);
        });
    }
    
    fetchCoffees();
});
