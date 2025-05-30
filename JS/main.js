// toggle untuk navbar
const navbarNav = document.querySelector('.nav-item');

document.querySelector('#hamburger-menu').onclick = (e) => {
    e.preventDefault();
    navbarNav.classList.toggle('active');
}

// toggle untuk search button
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = () => {
    event.preventDefault();
    searchForm.classList.toggle('active');
    
    if (searchForm.classList.contains('active')) {
        searchBox.focus();
    };
}

// sembunyikan navbar ketika scrool
const navbar = document.querySelector('.navbar');
let prevScrollPos = window.pageYOffset; // Posisi scroll sebelumnya

window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        // Scroll ke atas
        navbar.classList.remove('hidden');
    } else {
        // Scroll ke bawah
        navbar.classList.add('hidden');
    }

    prevScrollPos = currentScrollPos;
});

// fungsi shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
const spcButton = document.querySelector('#shopping-cart-button')

spcButton.onclick = (e) => {
    e.preventDefault();
    shoppingCart.classList.toggle('active');
}

// klik dimana saja selama bkan di elemen yang memiliki class active
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');

document.addEventListener('click', function(e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    };

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    };

    if (!spcButton.contains(e.target) && !shoppingCart.contains(e.target)) {
        // Tutup hanya jika tidak sedang kosong
        if (Alpine.store('cart').items.length > 0) {
            Alpine.store('cart').close();
        }
    }
});

// hapus item di shopping cart
// shoppingCart.addEventListener('touchstart', function(e) {
//     if (e.target.classList.contains('remove-item')) {
//         e.preventDefault();
//         const cartitem = e.target.parentElement;
//         cartitem.remove();
//     }
// })

// shoppingCart.addEventListener('click', function(e) {
//     if (e.target.classList.contains('remove-item')) {
//         e.preventDefault();
//         const cartitem = e.target.parentElement;
//         cartitem.remove();
//     }
// })

// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButton = document.querySelectorAll('.item-detail-button');

itemDetailButton.forEach((btn) => {
    btn.onclick = (e) => {
        console.log('ok');
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    }
})

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

// klik diluar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    };
};