document.addEventListener("alpine:init", () => {
  Alpine.data("Product", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.png", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.png", price: 30000 },
      { id: 3, name: "Primo Passo", img: "3.png", price: 25000 },
      { id: 4, name: "Aceh Gayo", img: "4.png", price: 32000 },
      { id: 5, name: "Sumatra Mantheling", img: "5.png", price: 40000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    isOpen: false,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambha quantity dan totalnya
            this.total -= item.total; // koreksi:
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.total; // koreksi:
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      // Penanganan jika item tidak ditemukan
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;

          this.quantity--;
          this.total -= item.price; // Perbaikan 1: Hanya kurangi harga satuan
          item.quantity--;
          item.total = item.price * item.quantity;
          return item;
        });
      } else {
        // Perbaikan 2: Gunakan cartItem untuk mengakses harga
        this.total -= cartItem.price;
        this.quantity--;
        this.items = this.items.filter((item) => item.id !== id);
      }

      if (this.items.length === 0) {
        this.isOpen = false;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
