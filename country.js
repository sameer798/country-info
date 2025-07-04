const flag = document.querySelector('.flag');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const language = document.querySelector('.language')
const countryName = document.querySelector('.country-name');
const borderCountries = document.querySelector('.border-countries');
const backButton = document.querySelector('.back-button')

const error = document.querySelector('.error')

backButton.addEventListener('click',()=>{
    history.back()
})

const countryParam = new URLSearchParams(location.search).get('name')
fetch(`https://restcountries.com/v3.1/name/${countryParam}?fullText=true`).then((res)=> res.json())
.then(([country])=>{
    // console.log(country)
    flag.src = country.flags.svg
    countryName.innerText = country.name.common;

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }

    population.innerText = country.population.toLocaleString();
    region.innerText = country.region;

    if(country.subregion){
        subRegion.innerText = country.subregion;
    }

    capital.innerText = country.capital[0];
    
    currencies.innerText = Object.values(country.currencies)[0].name;
    language.innerText = Object.values(country.languages).join(',')
    domain.innerText = country.tld

    if(country.borders){
        // console.log(country.borders)
       country.borders.forEach((border)=>{
        // console.log(border)
         fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(data => data.json())
        .then(([borderCountry])=>{
            const a = document.createElement('a')
            a.href = `./country.html?name=${borderCountry.name.common}`
            a.innerText = borderCountry.name.common
            borderCountries.append(a)

            // console.log(borderCountry.name)

        })
       
       })
    }
}
)
.catch((err)=>{
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    p1.innerText = 'Try after some time...'
    p1.style.color = 'black'
    p.innerText = err.message
    error.append(p)
    error.append(p1)

console.log(p)
})


//  country.borders.forEach(border => {
            // const a = document.createElement('a');
            // a.href = `https://restcountries.com/v3.1/alpha/${border}`;
            // a.innerText = border
            // borderCountries.append(a)
        // });
        // console.log(country.borders)