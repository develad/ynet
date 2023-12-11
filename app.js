const card = document.querySelector('.news-card');
const spinner = document.querySelector('.spinner');
const logo = document.querySelector('.logo');
const arrowUp = document.querySelector('.arrow-up');
const _clockTime = document.querySelector('.clock-time');
const _clockDate = document.querySelector('.clock-date');
const _weather = document.querySelector('.weather');
const _audio = new Audio('./alarm_sound.mp3');

const RenderAlertsToScreen = (alertsToShow) => {
  console.log('alertsToShow: ', alertsToShow);
  alertsToShow.reverse().map((item, index) => {
    if (index === 0) {
      _audio.play();
    }

    item.isDrill === false &&
      Toastify({
        text: `<span style="padding: 0 0.5rem;flex:1;text-align:center;">${moment(
          new Date(item.time)
        )
          .locale('he')
          .format('HH:mm')} - ${item.cities.join(' , ')}</span>`,
        // Display the alert notification on the screen for 30 secondes
        duration: 1000 * 30,
        newWindow: true,
        close: true,
        escapeMarkup: false,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background:
            'linear-gradient(to right, rgb(182 1 21), rgb(255 91 78))',
        },
        avatar: './Pakar.png',
      }).showToast();
  });
};

// const exampleData = [
//   {
//     notificationId: 'cfb22a75-8777-4195-a08f-139a91babb02',
//     time: 1702206929,
//     threat: 0,
//     isDrill: false,
//     cities: ['נתיב העשרה'],
//   },
//   {
//     notificationId: 'ff268978-4737-47d6-b127-59e8d2db1549',
//     time: 1702205108,
//     threat: 0,
//     isDrill: false,
//     cities: ['נחל עוז'],
//   },
// ];

let ids = [];
let shownData = [];
const getRedAlert = async () => {
  const res = await fetch(
    'https://dark-gray-snail-ring.cyclic.app/redAlertNotifications'
  );
  let data = await res.json();
  console.log('data: ', data);

  data = data.map((item) => ({
    ...item,
    time: item.time * 1000,
  }));

  ids = shownData.map((item) => item.notificationId);

  const fliterdData = data?.filter(
    (item) => !ids.includes(item.notificationId)
  );

  shownData = [...shownData, ...fliterdData];
  console.log('fliterdData: ', fliterdData);
  fliterdData.length !== 0 && RenderAlertsToScreen(fliterdData);
};

getRedAlert();
setInterval(getRedAlert, 1000);

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
