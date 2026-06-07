
let currentPage = 'home';
const galleryImages = [
  'https://kimi-web-img.moonshot.cn/img/belsteel.com/3bd464f20161b29b70ec994d1ea81ff3f4a05098.jpg',
  'https://kimi-web-img.moonshot.cn/img/belsteel.com/1b91da4d20f405554c29ea3b6e2125a6cb24dcb9.jpg',
  'https://kimi-web-img.moonshot.cn/img/belsteel.com/2d1bb19889d8f1b13a5571e24a045ef060aaebd0.jpg',
  'https://kimi-web-img.moonshot.cn/img/belsteel.com/9ec790e2377c13329f7f2a36cd2191cc7166b881.jpg',
  'https://kimi-web-img.moonshot.cn/img/hardhub.ru/dfd3815d4661ed58b0b5298e0399d7415b904d4f.jpg',
  'https://kimi-web-img.moonshot.cn/img/avatars.mds.yandex.net/ea0284dd942a76adbab34ed04d3b20f6d740dc55',
  'https://kimi-web-img.moonshot.cn/img/belsteel.com/738c48a3a021769e08a189b69f442a0ebe51e384.jpg',
  'https://kimi-web-img.moonshot.cn/img/tnp.belsteel.com/19be3f556a5e931bff9d1899451e18f740fb1033.jpg',
  'https://kimi-web-img.moonshot.cn/img/vivascale.by/4c07c0c78264ca7dc3410c9586dc0318b55112e9.jpg'
];

// Навигация теперь через обычные ссылки, эта функция оставлена для совместимости
function nav(page) {
  window.location.href = page + '.html';
}

function tmm() {
  document.getElementById('nav').classList.toggle('a');
  document.getElementById('mmb').classList.toggle('a');
}

function checkScroll() {
  document.querySelectorAll('.aos').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      el.classList.add('v');
    }
  });
}

function animateCounters() {
  document.querySelectorAll('.sn[data-c]').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-c'));
    if (counter.getBoundingClientRect().top < window.innerHeight && !counter.classList.contains('done')) {
      counter.classList.add('done');
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString('ru-RU');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('ru-RU');
        }
      }, 25);
    }
  });
}

function handleScroll() {
  const header = document.getElementById('header');
  const scrollTop = document.getElementById('scrollTop');
  header.classList.toggle('s', window.scrollY > 50);
  scrollTop.classList.toggle('v', window.scrollY > 500);
  checkScroll();
  animateCounters();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterGallery(cat) {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('a'));
  document.querySelectorAll('.fb[data-f="' + cat + '"]').forEach(b => b.classList.add('a'));
  document.querySelectorAll('.gi').forEach(item => {
    if (cat === 'all' || item.getAttribute('data-cat') === cat) {
      item.style.display = 'block';
      setTimeout(() => item.style.opacity = '1', 10);
    } else {
      item.style.opacity = '0';
      setTimeout(() => item.style.display = 'none', 300);
    }
  });
}

let currentImg = 0;

function openLightbox(index) {
  currentImg = index;
  document.getElementById('lbImg').src = galleryImages[index];
  document.getElementById('lightbox').classList.add('a');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('a');
  document.body.style.overflow = '';
}

function nextImg() {
  currentImg = (currentImg + 1) % galleryImages.length;
  document.getElementById('lbImg').src = galleryImages[currentImg];
}

function prevImg() {
  currentImg = (currentImg - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lbImg').src = galleryImages[currentImg];
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').classList.contains('a')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  }
});

function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.fs2');
  btn.innerHTML = '<span>Сообщение отправлено!</span>';
  btn.style.background = '#4CAF50';
  setTimeout(() => {
    btn.innerHTML = '<span>Отправить сообщение</span>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('h'), 1500);
  checkScroll();
  animateCounters();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.getElementById('nav').classList.remove('a');
    document.getElementById('mmb').classList.remove('a');
  }
});
