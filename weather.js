document.addEventListener("DOMContentLoaded", () => {
  // Function to create Bootstrap card
  const createCard = (capital, lat, long, flag, region, name, countryCode) => {
    // Create card elements
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-12");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "mb-3");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.innerText = name;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Populate card body
    cardBody.innerHTML = `
          <img src="${flag}" class="card-img-top" alt="Flag">
          <p class="card-text">Capital: ${capital}</p>
          <p class="card-text">Lat Long: ${lat}, ${long}</p>
          <p class="card-text">Region: ${region}</p>
          <p class="card-text">Country Code: ${countryCode}</p>
      `;
    // Create button
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Check Weather";
    // Add click event to button
    button.addEventListener("click", () => {
      // Fetch weather data when button is clicked
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bc51a9f19fc89b52ec3e9593ace61d66&units=metric`
      )
        .then((response) => response.json())
        .then((weatherData) => {
          // Display weather information
          alert(
            `Weather in ${capital}:\n${weatherData.weather[0].description}\nTemperature: ${weatherData.main.temp}°C`
          );
        })
        .catch((error) => console.error("Error fetching weather:", error));
    });
    // Append elements to card
    cardBody.appendChild(button);
    cardInner.appendChild(cardHeader);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);
    // Append card to container
    document.getElementById("cardContainer").appendChild(card);
  };

  // Fetch countries data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Loop through the countries
      data.forEach((country) => {
        const capital = country.capital[0];
        const lat = country.latlng[0];
        const long = country.latlng[1];
        const flag = country.flags.png;
        const region = country.region;
        const name = country.name.common;
        const countryCode = country.cca2;

        // Create card for each country
        createCard(capital, lat, long, flag, region, name, countryCode);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
});
