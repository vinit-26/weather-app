const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msgOne = document.getElementById('message-1');
const msgTwo = document.getElementById('message-2');

function fetchForcast(address) {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response) => {
      if (response.status === 404) {
        msgOne.textContent = response.statusText;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.error) {
        msgOne.textContent = data.error.message;
        return;
      }
      msgOne.textContent = data.location;
      msgTwo.textContent = data.forcast.description;
      searchInput.value = '';
    })
    .catch((error) => {});
}

function weatherHandler(e) {
  e.preventDefault();
  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';
  const location = searchInput.value;
  fetchForcast(location);
}

weatherForm.addEventListener('submit', weatherHandler);
