
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message01 = document.querySelector('#message-01');
const message02 = document.querySelector('#message-02');


const getWeather = function (address) {

    fetch(`/weather?address=${address}`).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                message02.innerHTML = `Error: ${data.error}`;
                message01.innerHTML = '';
                search.value = '';
            }
            else {
                message01.innerHTML = ` <hr>
                                         Temperature: ${data.temperature} Fahrenheit. 
                                        <br> <hr> Forecast: ${data.summery} 
                                        <br> <hr>  Location: ${data.location} <br> <hr>`;
                message02.innerHTML = '';
                search.value = '';
            }
        });

    });
};



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const address = search.value;

    getWeather(address);

});
