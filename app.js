const card = document.querySelector('.news-card');
const spinner = document.querySelector('.spinner');
const logo = document.querySelector('.logo');
const arrowUp = document.querySelector('.arrow-up');
const _clockTime = document.querySelector('.clock-time');
const _clockDate = document.querySelector('.clock-date');
const _weather = document.querySelector('.weather');
const _audio = new Audio('./alarm-sound.wav');

// moment.updateLocale('he', {
//   relativeTime: {
//     future: 'בעוד %s',
//     past: '%s לפני',
//     s: 'לפני %d שניות',
//     ss: 'לפני מספר שניות',
//     m: 'לפני כדקה',
//     mm: 'לפני %d דקות',
//     h: 'לפני כשעה',
//     hh: 'לפני %d שעות',
//     d: 'לפני כיום',
//     dd: 'לפני %d ימים',
//     w: 'לפני שבוע',
//     ww: 'לפני %d דקות',
//     M: 'לפני כחודש',
//     MM: 'לפני %d חודשים',
//     y: 'לפני שנה',
//     yy: 'לפני %d שנים',
//   },
// });

//  // Retrieve existing thresholds
//  moment().relativeTimeThreshold('ss'); // 44
//  moment().relativeTimeThreshold('s');  // 45
//  moment().relativeTimeThreshold('m');  // 45
//  moment().relativeTimeThreshold('h');  // 22
//  moment().relativeTimeThreshold('d');  // 26
//  moment().relativeTimeThreshold('w');  // null (disabled)
//  moment().relativeTimeThreshold('M');  // 11

// Set new thresholds
moment.relativeTimeThreshold('ss', 10);
moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 28);

const threats = {
  0: {
    category: 1,
    code: 'missilealert',
    duration: 10,
    label: 'ירי רקטות וטילים',
    description1: 'היכנסו למרחב המוגן ושהו בו 10 דקות',
    description2: '',
    link1: '',
    link2: 'https://www.oref.org.il/12943-he/pakar.aspx',
    matrixid: 1,
  },
  5: {
    category: 2,
    code: 'uav',
    duration: 10,
    label: 'חדירת כלי טיס עוין',
    description1:
      'היכנסו מיד למרחב המוגן ושהו בו למשך 10 דקות, אלא אם ניתנה התרעה נוספת',
    description2: '',
    link1: '',
    link2: 'https://www.oref.org.il/12754-he/pakar.aspx',
    matrixid: 6,
  },
};

const RenderAlertsToScreen = (alertsToShow) => {
  alertsToShow.reverse().map((item, index) => {
    if (index === 0) {
      _audio.play();
    }

    item.isDrill === false &&
      Toastify({
        text: `
    <div style="display:flex;flex-direction: column;width:100%;padding: 0 0.5rem;line-height: 1.2;font-size:1.5rem;gap:0.5rem">
        <div style="display:flex;justify-content: space-between;align-items: center;"><span style="">${moment(
          new Date(item.time)
        )
          .locale('he')
          .format('HH:mm')}${
          threats[item.threat]?.label
            ? ` - ${threats[item.threat].label}`
            : ' - התראת צבע אדום'
        }</span><img src='./PakarLogo.png'/></div>
      <hr/>
      <div style="flex:1;">${item.cities.join(' , ')}</div>
    <hr/>
    <div>${
      threats[item.threat]?.description1
        ? threats[item.threat].description1
        : 'יש להיכנס לאתר פיקוד העורף ולפעול בהתאם להנחיות'
    }</div>
    </div>
      `,
        // Display the alert notification on the screen for 30 secondes
        duration: 1000 * 30,
        newWindow: true,
        close: true,
        escapeMarkup: false,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #cb2d3e, #ef473a)',
        },
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
//     threat: 5,
//     isDrill: false,
//     cities: ['נחל עוז'],
//   },
// ];

// RenderAlertsToScreen(exampleData);

let ids = [];
let shownData = [];
const getRedAlert = async () => {
  const res = await fetch(
    // 'https://dark-gray-snail-ring.cyclic.app/redAlertNotifications'
    'https://mainserver-bhss.onrender.com/redAlertNotifications'
  );
  let data = await res.json();

  data = data.map((item) => ({
    ...item,
    time: item.time * 1000,
  }));

  ids = shownData.map((item) => item.notificationId);

  const fliterdData = data?.filter(
    (item) => !ids.includes(item.notificationId)
  );

  shownData = [...shownData, ...fliterdData];
  fliterdData.length !== 0 && RenderAlertsToScreen(fliterdData);
};

getRedAlert();
setInterval(getRedAlert, 1000);

const getWeather = async () => {
  const res = await fetch(
    // 'https://dark-gray-snail-ring.cyclic.app/minimal-forecast'
    // 'https://mainserver-bhss.onrender.com/minimal-forecast'
    'https://express-gcloud-424017.oa.r.appspot.com/minimal-forecast'
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
setInterval(getWeather, 1000 * 60 * 60);

function distanceBetween(time) {
  const time_before = new Date(time);
  return moment(time_before).locale('he').fromNow();
}

let clearDistanceArray = [];

const getData = async () => {
  // Clearing all distance setIntervals
  clearDistanceArray.map((item) => clearInterval(item));
  clearDistanceArray = [];
  spinner.style.display = 'block';
  logo.classList.remove('logo-flip');
  // const res = await fetch('https://dark-gray-snail-ring.cyclic.app/ynet-news');
  // const res = await fetch('https://mainserver-bhss.onrender.com/ynet-news');
  const res = await fetch(
    'https://express-gcloud-424017.oa.r.appspot.com/ynet-news'
  );
  let data = await res.json();
  data = data.reverse();
  spinner.style.display = 'none';
  logo.classList.add('logo-flip');
  card.classList.add('move-news-card');
  card.innerHTML = '';
  card.innerHTML = `<div class="last-updated">
  <span><i class="fas fa-retweet"></i></span>
  עודכן לאחרונה ב ${moment(new Date())
    .locale('he')
    .format('HH:mm')
    .trim()}</div>`;

  data.forEach((item) => {
    let whatsAppTextStr =
      '*מבזקי Ynet*' +
      '%0a%0a' +
      item.publish_time +
      '%0a%0a' +
      item.headline +
      '%0a%0a' +
      item.content +
      '%0a%0a' +
      item.link;
    whatsAppTextStr = whatsAppTextStr
      .replaceAll('"', '&quot;')
      .replaceAll('#', '%23');

    card.innerHTML += `
        <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
          <div style="display:flex;align-items:baseline;gap:0.5rem;">
          <span id="watch_${item.time.replaceAll(
            /[-:.]+/g,
            '_'
          )}"style="font-size:1rem;"><i class="far fa-clock"></i></span>
          <p id="distance_${item.time.replaceAll(/[-:.]+/g, '_')}">
            <span style="color:#19ffca">${distanceBetween(item.time)}</span>
            </p>
          </div>
          <p>
            ${
              moment(new Date(item.time))
                .locale('he')
                .calendar()
                .split(' ')[0]
                .includes('היום')
                ? ''
                : `${
                    moment(new Date(item.time))
                      .locale('he')
                      .calendar()
                      .split(' ')[0]
                  } | `
            }
            ${moment(new Date(item.time)).locale('he').format('HH:mm')} 
            </p>
        </div>
        <h1>${item.headline}</h1>
        <h3>${item.content}</h3>
       <div style="margin-top:1rem;display: flex;align-items:center;justify-content: end;margin-bottom:-0.50rem;
       ">
        <a
          style="color: inherit; text-decoration: none;background:rgba(128, 128, 128, 0.3);border-radius:50%;padding:20px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;"
          href="https://api.whatsapp.com/send?text=${whatsAppTextStr}"
          
          target="_blank"
          ><span
            style="font-size: 1.4rem; color: greenyellow"
            ><i class="fab fa-whatsapp"></i
          ></span>
        </a>
        </div>
        `;
    const clearDistance = setInterval(() => {
      const distance = document.querySelector(
        `#distance_${item.time.replaceAll(/[-:.]+/g, '_')}`
      );
      const watch = document.querySelector(
        `#watch_${item.time.replaceAll(/[-:.]+/g, '_')}`
      );

      if (distance.textContent === distanceBetween(item.time)) {
        watch.classList.remove('spin');
        distance.innerHTML = `<span style="color:white">${distanceBetween(
          item.time
        )}</span>`;
      } else {
        watch.classList.add('spin');
        distance.innerHTML = `<span style="color:#19ffca">${distanceBetween(
          item.time
        )}</span>`;
      }
    }, 1000);

    clearDistanceArray.push(clearDistance);
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
