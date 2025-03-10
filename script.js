document.getElementById('submit-button').addEventListener('click', function() {
    const countryName = document.getElementById('country-name').value;
    if (countryName) {
        fetchCountryData(countryName);
    } else {
        alert('Please enter a country name.');
    }
});

function fetchCountryData(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
                   const country = data[0];
                displayCountryInfo(country);
                fetchBorderingCountries(country.borders);
        })

}

function displayCountryInfo(country) {
    const countryInfoSection = document.getElementById('country-info');
    countryInfoSection.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
    `;
}

function fetchBorderingCountries(borders) {
    const borderingCountriesSection = document.getElementById('bordering-countries');
    borderingCountriesSection.innerHTML = '<h3>Bordering Countries:</h3>';

    borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(response => response.json())
            .then(data => {
                const country = data[0];
                borderingCountriesSection.innerHTML += `
                    <p><strong>${country.name.common}</strong> <img src="${country.flags.png}" alt="Flag of ${country.name.common}"></p>
                `;
            })
    });
}
