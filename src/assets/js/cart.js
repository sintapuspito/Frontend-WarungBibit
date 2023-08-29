document.addEventListener("DOMContentLoaded", function () {
  updateCart();
  // ...
});

const storedCartData = localStorage.getItem("keranjangProduk");
const keranjangProduk = JSON.parse(storedCartData) || [];

const keranjang = document.getElementById("keranjang");

// Data produk dalam bentuk array (contoh)
const produkData = [
  {
    id: 1,
    imgSrc: "../img/produk/benih/benih1.png",
    namaProduk: "Benih Okra",
    hargaSatuan: 9000,
    sisaProduk: 100,
  },
  {
    id: 2,
    imgSrc: "../img/produk/benih/benih1.png",
    namaProduk: "Benih Okra",
    hargaSatuan: 9000,
    sisaProduk: 100,
  },
  // ... data produk lainnya
];

function updateCart() {
  keranjang.innerHTML = "";

  keranjangProduk.forEach(keranjangItem => {
    const produk = keranjangProduk.find(
      item => item.productId === keranjangItem.productId
    );
    if (produk) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <th scope="row">
        <button type="button" class="btn btn-outline-danger btn-sm delete-produk" data-produk-id="${
          produk.productId
        }">
          <i class="df-icon" data-feather="x"></i>
        </button>
      </th>
      <td>
        <a href="#">
          <img src="${produk.imageRef}" class="img-keranjang" />
        </a>
      </td>
      <td>${produk.namaProduk}</td>
      <td>Rp${produk.hargaSatuan}</td>
      <td>
        <form class="form-jumlah-produk">
          <input
            type="text"
            class="form-control jumlah-produk"
            data-produk-id="${produk.productId}"
            value="${keranjangItem.jumlah}"
          />
        </form>
      </td>
      <td class="total-harga">Rp${(
        produk.hargaSatuan * keranjangItem.jumlah
      ).toLocaleString("id-ID")}</td>
    `;
      // Tambahkan event listener untuk tombol delete
      const deleteButton = row.querySelector(".delete-produk");
      deleteButton.addEventListener("click", function () {
        hapusDariKeranjang(produk.productId);
        // Hapus baris dari tampilan (DOM)
        row.remove();
        // Hitung ulang total harga
        calculateTotal();
      });

      keranjang.appendChild(row);
    }
  });
  feather.replace();
  calculateTotal(); // Panggil fungsi calculateTotal() untuk menghitung total harga
}
function calculateTotal() {
  const inputJumlah = document.querySelectorAll(".jumlah-produk");
  let totalHargaKeseluruhan = 0;

  inputJumlah.forEach(input => {
    const productId = input.getAttribute("data-produk-id");
    const keranjangItem = keranjangProduk.find(
      item => item.productId === productId
    );
    const produk = keranjangProduk.find(item => item.productId === productId);
    const jumlah = parseInt(input.value);

    if (!isNaN(jumlah) && jumlah > 0 && produk && keranjangItem) {
      const totalHarga = produk.hargaSatuan * jumlah;
      totalHargaKeseluruhan += totalHarga;

      const row = input.closest("tr");
      row.querySelector(
        ".total-harga"
      ).textContent = `Rp${totalHarga.toLocaleString("id-ID")}`;
    } else {
      const row = input.closest("tr");
      row.querySelector(".total-harga").textContent = "Rp0";
    }
  });

  const totalHargaElement = document.getElementById("total-harga");
  totalHargaElement.textContent = `Rp${totalHargaKeseluruhan.toLocaleString(
    "id-ID"
  )}`;
}
keranjang.addEventListener("input", event => {
  const input = event.target;
  const productId = input.getAttribute("data-produk-id");
  const keranjangItem = keranjangProduk.find(
    item => item.productId === productId
  );
  const sisaProduk = keranjangItem.sisaProduk;

  // Pastikan nilai yang dimasukkan tidak melebihi sisa produk
  let jumlah = parseInt(input.value);
  if (isNaN(jumlah) || jumlah < 1) {
    jumlah = 1;
  } else if (jumlah > sisaProduk) {
    jumlah = sisaProduk;
  }

  // Update nilai input dengan nilai yang sudah divalidasi
  input.value = jumlah;
  keranjangItem.jumlah = jumlah;

  calculateTotal(); // Panggil fungsi calculateTotal() setelah memperbarui nilai input
});

// Fungsi untuk menghapus produk dari keranjang
function hapusDariKeranjang(productId) {
  // Cek apakah data produk sudah ada di local storage
  let keranjangProduk = localStorage.getItem("keranjangProduk");
  if (!keranjangProduk) {
    keranjangProduk = [];
  } else {
    keranjangProduk = JSON.parse(keranjangProduk);
  }

  // Cari indeks produk yang akan dihapus
  const produkIndex = keranjangProduk.findIndex(
    produk => produk.productId === productId
  );

  if (produkIndex !== -1) {
    // Hapus produk dari array menggunakan splice
    keranjangProduk.splice(produkIndex, 1);

    // Simpan kembali data keranjangProduk ke dalam local storage
    localStorage.setItem("keranjangProduk", JSON.stringify(keranjangProduk));

    // Lakukan tindakan lain jika diperlukan
    console.log("Produk berhasil dihapus dari keranjang");
  } else {
    console.log("Produk tidak ditemukan dalam keranjang");
  }
}

// Contoh penggunaan untuk menghapus produk berdasarkan productId

console.log(localStorage.getItem("keranjangProduk"));
