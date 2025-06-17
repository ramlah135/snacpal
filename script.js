let inputBahan = document.getElementById('inputBahan');
let btnTambah = document.getElementById('btnTambah');
let listBahan = document.getElementById('listBahan');
let btnCari = document.getElementById('btnCari');
let hasilResep = document.getElementById('hasilResep');

let bahanUser = [];

let daftarResep = [
  { nama: 'Telur Dadar Keju', bahan: ['telur', 'keju', 'garam', 'lada'], deskripsi: 'Telur dadar dengan keju.' },
  { nama: 'Roti Bakar Coklat', bahan: ['roti', 'mentega', 'coklat'], deskripsi: 'Roti bakar coklat.' },
  { nama: 'Pancake Sederhana', bahan: ['tepung', 'telur', 'susu', 'gula'], deskripsi: 'Pancake sederhana.' },
  { nama: 'Smoothie Pisang', bahan: ['pisang', 'susu', 'madu', 'es batu'], deskripsi: 'Minuman pisang segar.' },
  { nama: 'bakso bakar', bahan: ['terigu', 'lada', 'garam', 'daging'], deskripsi: 'bakso bakar enak.' }
];

btnTambah.onclick = function() {
  let bahan = inputBahan.value.trim().toLowerCase();
  if (bahan && !bahanUser.includes(bahan)) {
    bahanUser.push(bahan);
    tampilkanBahan();
    inputBahan.value = '';
  }
}

function tampilkanBahan() {
  listBahan.innerHTML = '';
  bahanUser.forEach((bahan, index) => {
    let li = document.createElement('li');
    li.textContent = bahan + ' ';
    let btnHapus = document.createElement('button');
    btnHapus.textContent = 'Hapus';
    btnHapus.onclick = function() {
      bahanUser.splice(index, 1);
      tampilkanBahan();
    }
    li.appendChild(btnHapus);
    listBahan.appendChild(li);
  });
}

btnCari.onclick = function() {
  let hasil = '';
  daftarResep.forEach(resep => {
    let total = resep.bahan.length;
    let cocok = 0;

    resep.bahan.forEach(b => {
      bahanUser.forEach(input => {
        if (b.includes(input) || input.includes(b)) {
          cocok++;
        }
      });
    });

    let persentase = (cocok * 100) / total;

    if (persentase >= 50) {
      hasil += `<h3>${resep.nama} (Kecocokan: ${persentase.toFixed(0)}%)</h3>`;
      hasil += `<p>${resep.deskripsi}</p>`;
      hasil += `<p><strong>Bahan:</strong> ${resep.bahan.join(', ')}</p><hr>`;
    }
  });

  hasilResep.innerHTML = hasil || 'Tidak ada resep yang cocok.';
}
