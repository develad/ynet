const card = document.querySelector('.news-card');
const spinner = document.querySelector('.spinner');
const logo = document.querySelector('.logo');
const arrowUp = document.querySelector('.arrow-up');

const _radio_btn = document.querySelector('.radio_btn');
const _glgltz = document.querySelector('.glgltz');
const body = document.querySelector('body');

const button = document.querySelector('#btn');

button.addEventListener('change', (e) => {
  body.classList.toggle('light-mode');
});

let isShowing = false;
_radio_btn.addEventListener('click', (e) => {
  isShowing = !isShowing;
  isShowing
    ? (_glgltz.style.display = 'block')
    : (_glgltz.style.display = 'none');
});

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
        <p>${item.publish_time}</p>
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
