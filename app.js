const card = document.querySelector('.news-card');
const spinner = document.querySelector('.spinner');
const logo = document.querySelector('.logo');
const arrowUp = document.querySelector('.arrow-up');
const _clockTime = document.querySelector('.clock-time');
const _clockDate = document.querySelector('.clock-date');
const _weather = document.querySelector('.weather');
const _audio = new Audio('./alarm_sound.mp3');

const getRedAlert = async () => {
  // _audio.pause();
  const res = await fetch(
    'https://api.codetabs.com/v1/proxy?quest=https://api.tzevaadom.co.il/alerts-history'
  );
  let data = await res.json();

  data = data
    .map((alert) =>
      alert.alerts.filter(
        (item) =>
          // Filtering alerts from the last 10 minutes that are NOT a drill
          Math.floor(Date.now() / 1000) - item.time < 60 * 10 &&
          item.isDrill === false
      )
    )
    // Filtering empty arrays
    .filter((item) => item.length !== 0)
    // Setting the time property to standard epoch time
    .map((item) => item.map((item) => ({ ...item, time: item.time * 1000 })))
    // Reversing the array to show the alerts from recent to old at the top of the document
    .reverse();

  data.map((item) =>
    item.map((item, index) => {
      if (new Date() - new Date(item.time) < 1000 * 60) {
        if (index === 0) {
          // _audio.load();
          _audio.play();
          // _audio.loop = true;
        }
        Toastify({
          text: `<span style="padding: 0 0.5rem;flex:1">${moment(
            new Date(item.time)
          )
            .locale('he')
            .format('HH:mm')} - ${item.cities.join(' , ')}</span>`,
          // Display the alert notification on the screen for 30 secondes
          duration: 5000,
          // destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          escapeMarkup: false,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: false, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #cb2d3e, #ef473a)',
          },
          avatar: './Pakar.png',
          // onClick: function () {}, // Callback after click
        }).showToast();
      }
    })
  );
};

getRedAlert();
setInterval(getRedAlert, 5000);

const getWeather = async () => {
  const res = await fetch(
    'https://dark-gray-snail-ring.cyclic.app/minimal-forecast'
  );
  const data = await res.json();
  _weather.innerHTML =
    '<div style="text-align:center;margin-bottom:1.5rem;"><h1>תחזית מזג אוויר</h1><hr/></div>';
  _weather.innerHTML += data
    .map(
      (item) =>
        `<div>
      <h2 style="margin-bottom:0.5rem; color:gold;">
        ${item.daystring} | ${item.date.replaceAll('-', '.')}
      </h2>
      <p>${item.hebrewForecast}</p>
    </div>
    `
    )
    .join('<br/>');
};

getWeather();

const getData = async () => {
  spinner.style.display = 'block';
  logo.classList.remove('logo-flip');
  const res = await fetch('https://dark-gray-snail-ring.cyclic.app/ynet-news');
  let data = await res.json();
  data = data.reverse();
  spinner.style.display = 'none';
  logo.classList.add('logo-flip');
  card.classList.add('move-news-card');
  card.innerHTML = '';
  data.forEach((item) => {
    card.innerHTML += `
        <div class="card">
        <p>${item.publish_time}</p>
        <h1>${item.headline}</h1>
        <h3>${item.content}</h3>
        </div>
        `;
  });
  setTimeout(() => {
    card.classList.remove('move-news-card');
  }, 800);
};

window.addEventListener('scroll', () => {
  if (window.scrollY >= 250) {
    arrowUp.classList.add('show');
  } else {
    arrowUp.classList.remove('show');
  }
});

arrowUp.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

getData();
setInterval(getData, 1000 * 60 * 10);

const clock = () => {
  let timeString = moment().locale('he').format('LLLL');
  timeString = timeString.split(' ');
  _clockDate.innerHTML = `יום ${timeString[0]} ${timeString[1]} ${timeString[2]}`;
  const [hour, minutes] = timeString[4].split(':');
  if (minutes === '00') {
    _clockTime.style.color = 'lime';
    _clockTime.innerHTML = `${timeString[4]}`;
  } else {
    _clockTime.style.color = 'white';
    _clockTime.innerHTML = `${timeString[4]}`;
  }
};

clock();
setInterval(clock, 1000);
