const card = document.querySelector('.news-card');
const spinner = document.querySelector('.spinner');
const logo = document.querySelector('.logo');
const arrowUp = document.querySelector('.arrow-up');
const _clockTime = document.querySelector('.clock-time');
const _clockDate = document.querySelector('.clock-date');

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
