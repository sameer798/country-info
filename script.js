const countryContainer = document.querySelector('.country-container');
const countryInput = document.querySelector('.country-input');
let countriesDetails;


const error = document.querySelector('.error')
fetch('https://restcountries.com/v3.1/all').then((data)=> data.json())
.then((country)=>{
    //  https://restcountries.com/v3.1/name/{name}

    // console.log(country[0])
    countriesDetails = country
    renderCountries(country)
    
})
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


countryInput.addEventListener('input',(e)=>{

    // console.log(countriesDetails)

     const fiteredCountries = countriesDetails.filter((country)=>{
    return country.name.common.toLowerCase().includes(e.target.value.toLowerCase()); 
      
    })
    // console.log(fiteredCountries)
    countryContainer.innerHTML = ''
    renderCountries(fiteredCountries)
})



function renderCountries(countries) {
  if (Array.isArray(countries)) {
    countries.forEach((country) => {
      const a = document.createElement('a');
      a.href = `./country.html?name=${encodeURIComponent(country.name.common)}`;

      const newHTML = `
        <div class="country-card">
          <div class="country-image-container">
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
          </div>
          <div class="card-text">
            <h3 class="country-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString()}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      `;

      a.innerHTML = newHTML;
      countryContainer.append(a);
    });
  } else {
    console.error("Something went wrong!!");
  }
}



// function renderCountries(countries){


//     if (Array.isArray(countries)) {
//     countries.forEach((country)=>{
//      const a = document.createElement('a');

//      a.href = `./country.html?name=${country.name.common}`
     
//         const newHTML = `        
        
//                 <div class="country-card">
                
//                 <div class="country-image-container">
//                     <img src=${country.flags.svg} alt="${country.name.common} flag">
//                 </div>
//                 <div class="card-text">
//                     <h3 class="country-title">${country.name.common}</h3>
//                 <p><b>Population: </b>${country.population.toLocaleString()}</p>
//                 <p><b>Region: </b>${country.region}</p>
//                 <p><b>Capital: </b>${country.capital?.[0]}</p>
//                 </div>
//             </div>
        
//         `
//         a.innerHTML = newHTML
//         countryContainer.append(a)
//     })

// } else {
//   console.error("Something went wrong!!");
// }



  
// }