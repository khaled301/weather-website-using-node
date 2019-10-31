
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message01 = document.querySelector('#message-01');
const message02 = document.querySelector('#message-02');


const getWeather = function (address) {

    fetch(`/weather?address=${address}`).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                message02.textContent = `Error: ${data.error}`;
                message01.textContent = '';
                search.value = '';
            }
            else {
                message01.textContent = `Temperature: ${data.temperature} & Location: ${data.location}`;
                message02.textContent = '';
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
