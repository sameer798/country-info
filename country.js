const flag = document.querySelector('.flag');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const domain = document.querySelector('.domain');
const currencies = document.querySelector('.currencies');
const language = document.querySelector('.language');
const countryName = document.querySelector('.country-name');
const borderCountries = document.querySelector('.border-countries');
const backButton = document.querySelector('.back-button');
const error = document.querySelector('.error');

backButton.addEventListener('click', () => {
    history.back();
});

const countryParam = new URLSearchParams(location.search).get('name');

fetch(`https://restcountries.com/v3.1/name/${countryParam}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Country not found or API returned invalid format.");
    }

    const country = data[0];

    flag.src = country.flags?.svg || '';
    countryName.innerText = country.name?.common || 'N/A';

    if (country.name?.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0]?.common || 'N/A';
    } else {
      nativeName.innerText = 'N/A';
    }

    population.innerText = country.population?.toLocaleString() || 'N/A';
    region.innerText = country.region || 'N/A';
    subRegion.innerText = country.subregion || 'N/A';
    capital.innerText = country.capital?.[0] || 'N/A';

    currencies.innerText = country.currencies
      ? Object.values(country.currencies)[0]?.name || 'N/A'
      : 'N/A';

    language.innerText = country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';

    domain.innerText = country.tld?.[0] || 'N/A';

    if (Array.isArray(country.borders)) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const a = document.createElement('a');
            a.href = `./country.html?name=${borderCountry.name.common}`;
            a.innerText = borderCountry.name.common;
            borderCountries.append(a);
          })
          .catch((err) => {
            console.error("Failed to fetch border country:", err);
          });
      });
    } else {
      borderCountries.innerText = 'No border countries';
    }
  })
  .catch((err) => {
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    p1.innerText = 'Try after some time...';
    p1.style.color = 'black';
    p.innerText = err.message;
    error.append(p, p1);
    console.error("Error fetching country data:", err);
  });
