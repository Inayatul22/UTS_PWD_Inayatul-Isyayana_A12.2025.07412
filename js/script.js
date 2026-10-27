// Ruang Rona - script utama

// ---------- foto (semua diambil dari folder image) ----------
// Mau ganti foto? Cukup ubah nama file di sini, filenya taruh di folder "image".
var fotoBunga = {
  logo: 'image/logo.jpg',
  hero: 'image/bouquet.jpg',
  produk: ['image/sweet.jpg', 'image/memorable.jpg', 'image/Purely Yours.jpg'],
  deal: ['image/bouquet.jpg', 'image/Grad broad.jpg', 'image/selempang.jpg'],
  alasan: 'image/sweet.jpg',
  koleksi: ['image/Purely Yours.jpg', 'image/Grad broad.jpg', 'image/memorable.jpg', 'image/bouquet.jpg', 'image/selempang.jpg']
};

// ---------- data ----------
// harga ditulis angka biasa, nanti diubah jadi format Rp 185.000
var produkTerlaris = [['Sweet Memories01', 185000], ['Memorable03', 235000], ['Purely Yours01', 275000]];
var dealHariIni = [['Sweetest Bloom02', 165000, 195000], ['Memorable 03', 349000, 399000], ['Golden Hues01', 145000, 175000]];
var testimoni = [
  ['RuangRona Design', 'UI/UX Designer', 'Setiap moment merupakan kenangan berharga. Kenangan penuh kasih dan kehangatan. Setiap moment merupakan kenangan berharga. Kenangan penuh kasih dan kehangatan'],
  ['Nadya Putri', 'Pemilik Toko Kue', 'Bunganya segar, rangkaiannya rapi, dan sampai tepat waktu. Sudah tiga kali pesan untuk acara toko dan selalu memuaskan.'],
  ['Raka Pratama', 'Fotografer', 'Warna bunganya hangat dan tidak pasaran. Cocok sekali untuk properti sesi foto prewedding klien saya.']
];

function rupiah(angka) {
  return 'Rp ' + String(angka).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// bikin tag img; kalau file-nya tidak ketemu, gambarnya disembunyikan
function tagFoto(alamat, keterangan, malas) {
  return '<img src="' + alamat + '" alt="' + keterangan + '"' + (malas ? ' loading="lazy"' : '') +
    ' onerror="this.style.visibility=\'hidden\'">';
}

// ---------- tampilkan ke halaman ----------
var logoImg = tagFoto(fotoBunga.logo, 'Logo Ruang Rona');
document.querySelector('#logo').innerHTML = logoImg + 'Ruang Rona';
document.querySelector('#logoFooter').innerHTML = logoImg + 'Flowers';
document.querySelector('#heroGambar').innerHTML = tagFoto(fotoBunga.hero, 'Buket bunga Ruang Rona');

var html = '';
var i;
for (i = 0; i < produkTerlaris.length; i++) {
  html += '<article class="kartu"><div class="gbr">' + tagFoto(fotoBunga.produk[i], produkTerlaris[i][0], true) + '</div>' +
    '<h3>' + produkTerlaris[i][0] + '</h3><div class="info"><span>' + rupiah(produkTerlaris[i][1]) + '</span><span><i>★</i> 5.0</span></div></article>';
}
document.querySelector('#produkTerlaris').innerHTML = html;

html = '';
for (i = 0; i < dealHariIni.length; i++) {
  html += '<article class="deal"><div class="gbr">' + tagFoto(fotoBunga.deal[i], dealHariIni[i][0], true) + '</div>' +
    '<h3>' + dealHariIni[i][0] + ' <em>flower/ bouquet</em></h3>' +
    '<p>Setiap moment merupakan kenangan berharga. Kenangan penuh kasih dan kehangatan.</p>' +
    '<div class="beli"><span class="harga">' + rupiah(dealHariIni[i][1]) + '<s>' + rupiah(dealHariIni[i][2]) + '</s></span><button class="tambah">Add to Cart</button></div></article>';
}
document.querySelector('#daftarDeal').innerHTML = html;

document.querySelector('#bungaTengah').innerHTML = tagFoto(fotoBunga.alasan, 'Bunga pilihan Ruang Rona', true);

html = '';
for (i = 0; i < fotoBunga.koleksi.length; i++) {
  html += '<div class="foto">' + tagFoto(fotoBunga.koleksi[i], 'Koleksi bunga ' + (i + 1), true) + '</div>';
}
document.querySelector('#slider').innerHTML = html;

html = '';
for (i = 0; i < fotoBunga.koleksi.length; i++) html += '<button aria-label="Slide ' + (i + 1) + '"></button>';
document.querySelector('#titik').innerHTML = html;

// ---------- kelopak jatuh di hero ----------
var kotakKelopak = document.querySelector('#kelopak');
for (i = 0; i < 14; i++) {
  var k = document.createElement('i');
  k.style.left = Math.random() * 100 + '%';
  k.style.animationDuration = (7 + Math.random() * 7) + 's';
  k.style.animationDelay = (Math.random() * -12) + 's';
  k.style.setProperty('--geser', (Math.random() * 160 - 80) + 'px');
  kotakKelopak.appendChild(k);
}

// ---------- hitung mundur (sampai akhir bulan) ----------
function nol(n) { return n < 10 ? '0' + n : n; }

function jalankanHitungan() {
  var akhir = new Date();
  akhir.setMonth(akhir.getMonth() + 1, 1);
  akhir.setHours(0, 0, 0, 0);
  var sisa = Math.floor((akhir - new Date()) / 1000);
  if (sisa < 0) sisa = 0;
  var angka = [Math.floor(sisa / 86400), Math.floor((sisa % 86400) / 3600), Math.floor((sisa % 3600) / 60), sisa % 60];
  var label = ['Days', 'Hours', 'Mins', 'Secs'];
  var teks = '';
  for (var n = 0; n < 4; n++) teks += '<div>' + nol(angka[n]) + '<small>' + label[n] + '</small></div>';
  document.querySelector('#hitung').innerHTML = teks;
}
jalankanHitungan();
setInterval(jalankanHitungan, 1000);

// ---------- keranjang ----------
var isiKeranjang = 0;
var totalBelanja = 0;
var tombolTambah = document.querySelectorAll('.tambah');
for (i = 0; i < tombolTambah.length; i++) {
  tombolTambah[i].addEventListener('click', (function (nomor) {
    return function () {
      var badge = document.querySelector('#jumlahKeranjang');
      var tombol = this;
      isiKeranjang++;
      totalBelanja += dealHariIni[nomor][1];
      badge.textContent = isiKeranjang;
      badge.parentNode.title = 'Total belanja: ' + rupiah(totalBelanja);
      badge.classList.remove('muncul');
      void badge.offsetWidth; // supaya animasi bisa diulang
      badge.classList.add('muncul');

      tombol.textContent = 'Added';
      tombol.classList.add('sudah');
      setTimeout(function () {
        tombol.textContent = 'Add to Cart';
        tombol.classList.remove('sudah');
      }, 1200);
    };
  })(i));
}

// ---------- foto hero ikut bergerak pelan saat mouse digeser ----------
var heroGambar = document.querySelector('#heroGambar');
document.querySelector('#home').addEventListener('mousemove', function (e) {
  var x = (e.clientX / window.innerWidth - 0.5) * 8;
  var y = (e.clientY / window.innerHeight - 0.5) * 8;
  heroGambar.style.transform = 'rotate(' + x / 3 + 'deg) translate(' + x + 'px, ' + y + 'px)';
});

// ---------- navbar ----------
var navbar = document.querySelector('#navbar');
var menu = document.querySelector('#menu');
var linkMenu = menu.querySelectorAll('a');
var idSection = ['home', 'product', 'deal', 'gallery', 'contact'];

document.querySelector('#burger').addEventListener('click', function () {
  menu.classList.toggle('buka');
});
menu.addEventListener('click', function () { menu.classList.remove('buka'); });

window.addEventListener('scroll', function () {
  navbar.classList.toggle('bayangan', window.scrollY > 10);
  var posisi = window.scrollY + window.innerHeight / 3;
  var sekarang = 0;
  for (var n = 0; n < idSection.length; n++) {
    var el = document.getElementById(idSection[n]);
    if (el && el.offsetTop <= posisi) sekarang = n;
  }
  for (n = 0; n < linkMenu.length; n++) {
    linkMenu[n].classList.toggle('aktif', n === sekarang);
  }
});

// ---------- slider koleksi ----------
var slider = document.querySelector('#slider');
var titik = document.querySelectorAll('#titik button');
var slideKe = 0;

function keSlide(n) {
  slideKe = (n + titik.length) % titik.length;
  var foto = slider.children[slideKe];
  slider.scrollTo({ left: foto.offsetLeft - (slider.clientWidth - foto.clientWidth) / 2, behavior: 'smooth' });
}

for (i = 0; i < titik.length; i++) {
  titik[i].addEventListener('click', (function (n) { return function () { keSlide(n); }; })(i));
}

slider.addEventListener('scroll', function () {
  var tengah = slider.scrollLeft + slider.clientWidth / 2;
  var aktif = titik.length - 1;
  for (var n = 0; n < slider.children.length; n++) {
    var f = slider.children[n];
    if (tengah < f.offsetLeft + f.clientWidth) { aktif = n; break; }
  }
  for (n = 0; n < titik.length; n++) titik[n].classList.toggle('nyala', n === aktif);
});
titik[0].classList.add('nyala');

setInterval(function () {
  if (!slider.matches(':hover')) keSlide(slideKe + 1);
}, 4500);

// ---------- testimoni ----------
var kotakTesti = document.querySelector('#kotakTesti');
var testiKe = 0;

function tampilTesti() {
  var t = testimoni[testiKe];
  kotakTesti.style.opacity = 0;
  setTimeout(function () {
    kotakTesti.innerHTML = '<p>' + t[2] + '</p><div class="penulis"><div>' + t[0] + '<small>' + t[1] + '</small></div><span class="bintang">★★★★★</span></div>';
    kotakTesti.style.opacity = 1;
  }, 300);
}
tampilTesti();
setInterval(function () {
  testiKe = (testiKe + 1) % testimoni.length;
  tampilTesti();
}, 6000);

// ---------- lihat foto lebih besar ----------
var kotakFoto = document.createElement('div');
kotakFoto.className = 'lightbox';
kotakFoto.innerHTML = '<img alt="">';
document.body.appendChild(kotakFoto);

document.addEventListener('click', function (e) {
  var foto = e.target.closest('.hero-gambar img, .kartu img, .deal .gbr img, .tengah img, .foto img');
  if (foto) {
    kotakFoto.firstChild.src = foto.src;
    kotakFoto.firstChild.alt = foto.alt;
    kotakFoto.classList.add('buka');
  } else {
    kotakFoto.classList.remove('buka');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') kotakFoto.classList.remove('buka');
});

// ---------- form pemesanan ----------
var formPesan = document.querySelector('#formPesan');
var hasilForm = document.querySelector('#hasilForm');

// aturan isian yang wajib diisi
var aturanForm = [
  { id: 'nama', min: 3, pesan: 'Nama minimal 3 huruf ya' },
  { id: 'alamat', min: 10, pesan: 'Alamat jangan terlalu singkat, minimal 10 karakter' },
  { id: 'kota', min: 1, pesan: 'Pilih kotanya dulu' }
];

function cekIsian(aturan) {
  var kolom = document.querySelector('#' + aturan.id);
  var pesan = kolom.parentNode.querySelector('.invalid-feedback');
  if (kolom.value.trim().length < aturan.min) {
    kolom.classList.add('is-invalid');
    pesan.textContent = aturan.pesan;
    return false;
  }
  kolom.classList.remove('is-invalid');
  return true;
}

// pesan merah hilang begitu isiannya dibetulkan
for (i = 0; i < aturanForm.length; i++) {
  document.querySelector('#' + aturanForm[i].id).addEventListener('input', (function (aturan) {
    return function () { cekIsian(aturan); };
  })(aturanForm[i]));
}

formPesan.addEventListener('submit', function (e) {
  e.preventDefault(); // supaya halaman tidak ter-reload
  var semuaBenar = true;
  for (var k = 0; k < aturanForm.length; k++) {
    if (!cekIsian(aturanForm[k])) semuaBenar = false;
  }
  if (!semuaBenar) {
    hasilForm.classList.remove('tampil');
    return;
  }

  var hobi = [];
  var dicentang = formPesan.querySelectorAll('.form-check-input:checked');
  for (k = 0; k < dicentang.length; k++) hobi.push(dicentang[k].value);

  // pakai textContent biar isian orang tidak dibaca sebagai kode html
  hasilForm.textContent = 'Terima kasih, ' + document.querySelector('#nama').value.trim() +
    '! Pesananmu akan dikirim ke ' + document.querySelector('#alamat').value.trim() +
    ', ' + document.querySelector('#kota').value + '. Hobi: ' + (hobi.length ? hobi.join(', ') : '-') + '.';
  hasilForm.classList.add('tampil');
  formPesan.reset();
});
