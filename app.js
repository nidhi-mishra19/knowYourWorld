let country;
function validate(){
    let name = document.getElementById("text").value;
    if(name==""){
        alert("Please enter your country");
    }else{
        let coun = document.querySelector("input").value;
        let countryArray = coun.split(" ");
        for (let i = 0; i < countryArray.length; i++) {
            countryArray[i] = countryArray[i].charAt(0).toUpperCase() + countryArray[i].slice(1);
        }
        
        let country = countryArray.join(" ");
        
        localStorage.setItem('country', country);
        
        window.location.assign("second.html");
        // document.getElementById("div").innerHTML = `Country: ${country}`;

        return;
    };
};
   

document.addEventListener("DOMContentLoaded", function () {  
    let country = localStorage.getItem('country'); 



    let btnLocation = document.querySelector("#location");
    btnLocation.addEventListener("click", async () => {
        await clearContent();
        await getPosition(country);
    });

    
    let btnCurrency = document.querySelector("#currency");
    btnCurrency.addEventListener("click", async () => {
        await clearContent();
        await getCurrency(country);
    });

    let btnCapital = document.querySelector("#capital");
    btnCapital.addEventListener("click", async () => {
        await clearContent();
        await getCapital(country);
    });

    let btnPopulation = document.querySelector("#population");
    btnPopulation.addEventListener("click", async () => {
        await clearContent();
        await getPopulation(country);
    });
    
});

async function clearContent() {
    document.getElementById("pos").innerHTML = "";
    document.getElementById("curr").innerHTML = "";
    document.getElementById("cap").innerHTML = "";
    document.getElementById("pop").innerHTML = "";
}





let position = "https://countriesnow.space/api/v0.1/countries/positions" //POST
let currency = "https://countriesnow.space/api/v0.1/countries/info?returns=currency"//GET
let capital = "https://countriesnow.space/api/v0.1/countries/info?returns=capital" //GET
let population = "https://countriesnow.space/api/v0.1/countries/population/cities" //POST

async function getPosition(country){
    fetch(position)
    .then(res => res.json())
    .then(res => {
        let data = res.data;
        let rows = "";
      

            for(let i=0; i<data.length; i++){
                if(data[i].name == country){
                    rows += `<p><span class="label">LONGITUDE:</span>  <span class="response">${data[i].long},</span> <span class="label">LATITUDE:</span>  <span class="response">${data[i].lat}</span></p><hr>`
                }
            }
            document.getElementById("pos").innerHTML = "";
            document.getElementById("pos").innerHTML = rows;
    })
    .catch(err => {
        console.log(err);
    });
};

async function getCurrency(country){
    fetch(currency)
    .then(res => res.json())
    .then(res => {
        let data = res.data;
        let rows = "";
      

            for(let i=0; i<data.length; i++){
                if(data[i].name == country){
                    rows += `<p><span class="label">CURRENCY:</span>  <span class="response">${data[i].currency}</span></p><hr>`
                }
            }

            document.getElementById("curr").innerHTML = "";
            document.getElementById("curr").innerHTML = rows;
    })
    .catch(err => {
        console.log(err);
    });
};

async function getCapital(country){
    fetch(capital)
    .then(res => res.json())
    .then(res => {
        let data = res.data;
        let rows = "";
      

            for(let i=0; i<data.length; i++){
                if(data[i].name == country){
                    rows += `<p><span class="label">CAPITAL:</span> <span class="response">${data[i].capital}</span></p><hr>`
                }
            }

            document.getElementById("cap").innerHTML = "";
            document.getElementById("cap").innerHTML = rows;
    })
    .catch(err => {
        console.log(err);
    });
};


async function getPopulation(country){
    fetch(population)
    .then(res => res.json())
    .then(res => {
        let data = res.data;
        let rows = "";
      

            for(let i=0; i<(data.length)-2; i++){
                if(data[i].country == country){
                    rows += `<p><span class="label">CITY:</span>  <span class="response">${data[i].city},</span> <span class="label">YEAR:</span>  <span class="response">${data[i].populationCounts[0].year},</span> <span class="label">POPULATION:</span>  <span class="response">${data[i].populationCounts[0].value}</span></p>`
                }
            }


            document.getElementById("pop").innerHTML = "";
            document.getElementById("pop").innerHTML = rows;
    })
    .catch(err => {
        console.log(err);
    });
};












