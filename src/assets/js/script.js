document.addEventListener("DOMContentLoaded", function () {
  // Definisikan daftar produk di sini
  const imageMedia = "../img/produk/media tanam/mediatanam";
  const imageBenih = "../img/produk/benih/benih";

  const daftarBenih = [
    {
      productId: "B-01",
      imageRef: imageBenih + "1.png",
      nama: "Benih Okra",
      harga: 9000,
      berat: "1 pcs = 25gr",
      isi: "+- 10 butir",
      semai: "3 HSS",
      panen: "30 HST",
      lingkungan:
        "Cocok ditanam di dataran rendah hingga sedang (1-800 mdpl), rentang suhu 27-30 derajat celsius",
      ilmiah: "Abelmoschus esculentus L. Moench",
      family: "Malvaceae",
      sisaProduk: 100,
    },
    {
      productId: "B-02",
      imageRef: imageBenih + "2.png",
      nama: "Benih Pakchoy",
      harga: 9000,
      berat: "1 pcs = 25gr",
      isi: "+- 330 butir",
      semai: "1-5 HSS",
      panen: "30-45 HST",
      lingkungan:
        "Dataran tinggi atau rendah, rentang suhu 16-35 derajat celcius",
      ilmiah: "Brassica Rapa L.",
      family: "Brassicaceae",
      sisaProduk: 100,
    },
    {
      productId: "B-03",
      imageRef: imageBenih + "3.png",
      nama: "Benih Tomat",
      harga: 9000,
      berat: "1 pcs = 25gr",
      isi: "+- 30 butir",
      semai: "3 HSS",
      panen: "90 HST",
      lingkungan:
        "Cocok ditanam di dataran tinggi maupun rendah, rentang suhu 25-35 derajat celsius",
      ilmiah: "Lycopersicon esculentum",
      family: "Solanaceae",
      sisaProduk: 100,
    },
    {
      productId: "B-04",
      imageRef: imageBenih + "4.png",
      nama: "Benih Wortel",
      harga: 9000,
      berat: "1 pcs = 25gr",
      isi: "+-200 butir",
      semai: "8 HSS",
      panen: "65 HST",
      lingkungan:
        "Dataran tinggi (1200-1500 mdpl), rentang suhu 15-21 derajat celsius",
      ilmiah: "Daucus carota L.",
      family: "Apiaceae",
      sisaProduk: 100,
    },

    // Tambahkan objek-objek lain untuk produk lainnya...
  ];

  const daftarMediaTanam = [
    {
      productId: "MT-01",
      imageRef: imageMedia + "1.png",
      nama: "Pupuk Kandang",
      harga: 15000,
      berat: "1 pcs = 3327gr",
      deskripsi:
        "Pupuk kandang merupakan pupuk yang berasal dari kotoran ternak yang sudah dikomposkan dan siap digunakan. Pupuk kandang ini tidak ditambahkan dengan zat kimia lain, sehingga cocok digunakan dalam pertanian organik.",
      manfaat:
        "<li>Menambahkan unsur hara pada tanah <li>Memelihara organisme yang baik untuk tanah <li>Memperbaiki struktur tanah <li>Menggemburkan tanah <li>Memperbaiki kemampuan tanah dalam menyimpan air",
      sisaProduk: 100,
    },
    {
      productId: "MT-02",
      imageRef: imageMedia + "2.png",
      nama: "Pupuk Organik",
      harga: 15000,
      berat: "1 pcs = 3327gr",
      deskripsi:
        "Pupuk Organik merupakan pupuk yang berasal dari sisa-sisa tanaman yang sudah dikomposkan dan siap digunakan. Pupuk organik ini tidak ditambahkan dengan zat kimia lain, sehingga cocok digunakan dalam pertanian organik.",
      manfaat:
        "<li>Menambahkan unsur hara pada tanah <li>Memelihara organisme yang baik untuk tanah <li>Memperbaiki struktur tanah <li>Menggemburkan tanah <li>Memperbaiki kemampuan tanah dalam menyimpan air",
    },
    {
      productId: "MT-03",
      imageRef: imageMedia + "3.png",
      nama: "Sekam Bakar",
      harga: 15000,
      berat: "1 pcs = 880gr",
      deskripsi:
        "Arang sekam terbuat dari kulit biji padi yang telah melalui proses pembakaran tidak sempurna, menghasilkan sebuah media yang steril dari bakteri/patogen, namun masih memiliki kandungan unsur hara yang dibutuhkan oleh tanaman.",
      manfaat:
        "<li>Menambahkan unsur hara pada tanah <li>Memelihara organisme yang baik untuk tanah <li>Memperbaiki struktur tanah <li>Menggemburkan tanah <li>Memperbaiki kemampuan tanah dalam menyimpan air",
      sisaProduk: 100,
    },
    {
      productId: "MT-04",
      imageRef: imageMedia + "4.png",
      nama: "Cocopeat",
      harga: 15000,
      berat: "1 pcs = 790gr",
      deskripsi:
        "Cocopeat adalah media tanam yang dibuat dari sabut kelapa yang belum terfermentasikan. Cocopeat memiliki sifat mudah menyerap dan menyimpan air, sehigga cocok digunakan untuk menanam tanaman yang membutuhkan kondisi lembab.",
      manfaat:
        "<li>Ramah lingkungan, sebab terbuat dari bahan organik serta dapat terdegradasi dalam tanah dengan baik, jika sudah tak digunakan <li>Dengan proses tertentu bisa didaur ulang kembali menjadi media tanam baru. <li>Beberapa jenis hama seperti yang berasal dari tanah tak suka berada dalam cocopeat.",
      sisaProduk: 100,
    },
  ];

  // Seleksi elemen list-card-product
  const listCardProductBenih = document.querySelector(
    ".list-card-product-benih"
  );

  // Fungsi untuk mengisi konten card produk dengan data dari array daftarProduk
  function populateCardProduk() {
    listCardProductBenih.innerHTML = ""; // Hapus konten yang sudah ada

    // Loop melalui setiap produk dalam daftarProduk
    daftarBenih.forEach((produk, index) => {
      // Buat elemen card
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.margin = "1.2rem";

      // Isi konten card
      card.innerHTML = `<img src="${imageBenih}${
        index + 1
      }.png" class="card-img-top" alt="${produk.nama}" />
            <div class="card-body">
              <div class="card-title-price" style="text-align: center;">
                <h5 class="card-title">${produk.nama}</h5>
                 <h5 class="card-price">Rp${produk.harga.toLocaleString(
                   "id-ID"
                 )}</h5>
              </div>
              <a href="produk.html" class="btn btn-success benih " style="margin-top: 2.5rem; display: block" data-bs-toggle="modal" data-bs-target="#exampleModal" data-produk-id="${index}">Detail Produk</a>
            </div>
          `;

      // Tambahkan card ke dalam elemen list-card-product
      listCardProductBenih.appendChild(card);
    });
  }

  const listCardProductMediaTanam = document.querySelector(
    ".list-card-product-mediaTanam"
  );

  // Fungsi untuk mengisi konten card produk dengan data dari array daftarProduk
  function populateCardProdukMediaTanam() {
    listCardProductMediaTanam.innerHTML = ""; // Hapus konten yang sudah ada

    // Loop melalui setiap produk dalam daftarProduk
    daftarMediaTanam.forEach((produk, index) => {
      // Buat elemen card
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.margin = "1.2rem";

      // Isi konten card
      card.innerHTML = `
            <img src="${imageMedia}${
        index + 1
      }.png" class="card-img-top" alt="${produk.nama}" />
            <div class="card-body">
              <div class="card-title-price" style="text-align: center;">
                <h5 class="card-title">${produk.nama}</h5>
            <h5 class="card-price">Rp${produk.harga.toLocaleString(
              "id-ID"
            )}</h5>
              </div>
              <a href="produk.html" class="btn btn-success mediaTanam " style="margin-top: 2.5rem; display: block" data-bs-toggle="modal" data-bs-target="#exampleModal" data-produk-id="${index}">Detail Produk</a>
            </div>
          `;

      // Tambahkan card ke dalam elemen list-card-product
      listCardProductMediaTanam.appendChild(card);
    });
  }
  populateCardProdukMediaTanam();
  //   <p class="card-text">
  //   <span class="card-text-span" style="font-weight: 500">Isi Benih</span>: ${
  //     produk.deskripsi
  //   }<br />
  //   <span class="card-text-span" style="font-weight: 500">Masa Semai</span>: ${
  //     produk.semai
  //   }<br />
  //   <span class="card-text-span" style="font-weight: 500">Masa Panen</span>: ${
  //     produk.panen
  //   }<br />
  //   <span class="card-text-span" style="font-weight: 500">Lingkungan Tumbuh</span>: ${
  //     produk.lingkungan
  //   }<br />
  //   <span class="card-text-span" style="font-weight: 500">Nama Ilmiah</span>: ${
  //     produk.ilmiah
  //   }<br />
  //   <span class="card-text-span" style="font-weight: 500">Family</span>: ${
  //     produk.family
  //   }<br />
  // </p>
  // Panggil fungsi untuk mengisi konten card produk

  populateCardProduk();

  // Tangani acara klik pada tombol "Detail Produk"
  const detailprodukButtons = document.querySelectorAll(
    ".btn.btn-success.benih"
  );
  detailprodukButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      const produkId = event.target.dataset.produkId;
      const produk = daftarBenih[produkId];

      // Seleksi elemen modal
      const modal = document.getElementById("exampleModal");
      const modalTitle = modal.querySelector(".modal-title");
      const modalBody = modal.querySelector(".modal-body");
      const modalFooter = modal.querySelector(".modal-footer");

      // Isi konten modal dengan data produk yang sesuai
      modalTitle.textContent = produk.nama;
      modalBody.innerHTML = `
            <p>Nama: ${produk.nama}</p>
            <p>Harga: ${produk.harga}</p>
            <p>Berat Bersih: ${produk.berat}</p>
            <p>Isi Benih: ${produk.isi}</p>
            <p>Masa Semai: ${produk.semai}</p>
            <p>Masa Pertumbuhan: ${produk.panen}</p>
            <p>Lingkungan Tumbuh: ${produk.lingkungan}</p>
            <p>Nama Ilmiah: ${produk.ilmiah}</p>
            <p>Family: ${produk.family}</p>
            <!-- Tambahkan informasi produk lainnya sesuai kebutuhan -->
          `;
      modalFooter.innerHTML = `
       <button type="button" class="btn btn-success" id="masukkanKeranjang">Masukkan Keranjang</button>
      `;
      const masukkanKeranjangButton =
        modalFooter.querySelector(".btn.btn-success");
      masukkanKeranjangButton.addEventListener("click", function () {
        tambahkanKeKeranjang(
          produk.nama,
          produk.harga,
          produk.imageRef,
          produk.productId,
          produk.sisaProduk
        );
        modal.querySelector(".btn-close").click();
      });
    });
  });

  const detailprodukButtonsMediaTanam = document.querySelectorAll(
    ".btn.btn-success.mediaTanam"
  );
  detailprodukButtonsMediaTanam.forEach(button => {
    button.addEventListener("click", function (event) {
      const produkId = event.target.dataset.produkId;
      const produk = daftarMediaTanam[produkId];

      // Seleksi elemen modal
      const modal = document.getElementById("exampleModal");
      const modalTitle = modal.querySelector(".modal-title");
      const modalBody = modal.querySelector(".modal-body");
      const modalFooter = modal.querySelector(".modal-footer");
      // Isi konten modal dengan data produk yang sesuai
      modalTitle.textContent = produk.nama;
      modalBody.innerHTML = `
            <p>Nama: ${produk.nama}</p>
            <p>Harga: ${produk.harga}</p>
            <p>Berat Bersih: ${produk.berat}</p>
            <p>Deskripsi: ${produk.deskripsi}</p>
            <p>Manfaat: ${produk.manfaat}</p>
           
          `;
      modalFooter.innerHTML = `
       <button type="button" class="btn btn-success" id="masukkanKeranjang">Masukkan Keranjang</button>
      `;
      const masukkanKeranjangButton =
        modalFooter.querySelector("#masukkanKeranjang");
      masukkanKeranjangButton.addEventListener("click", function () {
        tambahkanKeKeranjang(
          produk.nama,
          produk.harga,
          produk.imageRef,
          produk.productId,
          produk.sisaProduk
        );
        console.log("Tombol Masukkan Keranjang Ditekan");
        modal.querySelector(".btn-close").click();
      });
    });
  });

  // Seleksi tombol "Masukkan Keranjang" di dalam modal
  function tambahkanKeKeranjang(
    namaProduk,
    hargaProduk,
    imageRef,
    productId,
    sisaProduk
  ) {
    // Cek apakah data produk sudah ada di local storage
    let keranjangProduk = localStorage.getItem("keranjangProduk");
    if (!keranjangProduk) {
      keranjangProduk = [];
    } else {
      keranjangProduk = JSON.parse(keranjangProduk);
    }

    // Cek apakah produk sudah ada di dalam keranjang
    const produkIndex = keranjangProduk.findIndex(
      produk => produk.namaProduk === namaProduk
    );

    if (produkIndex === -1) {
      // Jika produk belum ada di dalam keranjang, tambahkan produk baru
      keranjangProduk.push({
        productId: productId,
        imageRef: imageRef,
        namaProduk: namaProduk,
        hargaSatuan: hargaProduk,
        jumlah: 1,
        sisaProduk: sisaProduk,
      });
    } else {
      // Jika produk sudah ada di dalam keranjang, tambahkan jumlah
      keranjangProduk[produkIndex].jumlah += 1;
    }
    console.log(keranjangProduk);
    // Simpan kembali data keranjangProduk ke dalam local storage
    localStorage.setItem("keranjangProduk", JSON.stringify(keranjangProduk));
    console.log("harusnya diklik");
    // Tampilkan pesan berhasil atau lakukan aksi lainnya
    alert("Produk berhasil ditambahkan ke dalam keranjang!");
  }
});

console.log(localStorage.getItem("keranjangProduk"));
// localStorage.clear();
