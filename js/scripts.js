/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Contack Form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contactForm');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const messageInput = document.querySelector('#message');
    const success = document.querySelector('#submitSuccessMessage');
    const error = document.querySelector('#submitErrorMessage');
    const inputs = form.querySelectorAll("[data-sb-validations]");

    // Fungsi untuk validasi form
    function validateForm() {
        let isValid = true;

        inputs.forEach((input) => {
            const validations = input.dataset.sbValidations.split(",");
            const feedbacks = form.querySelectorAll(`[data-sb-feedback="${input.id}:required"]`);

            if (validations.includes("required")) {
                if (input.value.trim() === "") {
                    feedbacks.forEach(feedback => feedback.classList.remove("d-none"));
                    input.classList.add("is-invalid");
                    isValid = false;
                } else {
                    feedbacks.forEach(feedback => feedback.classList.add("d-none"));
                    input.classList.remove("is-invalid");
                }
            }
        });

        return isValid;
    }

    // Fungsi untuk mengirim data ke webhook
    function submitForm() {
        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let message = messageInput.value.trim();

        // Konversi nomor telepon untuk WhatsApp
        if (phone.startsWith('0')) {
            phone = '62' + phone.slice(1);
        }

        const webhookURL = 'https://discord.com/api/webhooks/1318479486647406624/VdxysN2cM8qQWnEPlWPWeSuWZVpIL9wHpU2Hsm3jyEVpgfeymuAsxN5LHzsefOQ6NK34';
        const pesan = `<@877189246870515722>\n**Pesan Baru**\n**Nama**: ${name}\n**Email**: ${email}\n**WatsApp**: https://wa.me/${phone}\n**Pesan**: ${message}`;

        const payload = {
            content: pesan,
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    success.classList.remove('d-none');
                    error.classList.add('d-none');
                    form.reset();
                } else {
                    throw new Error('Gagal mengirim data');
                }
            })
            .catch(() => {
                error.classList.remove('d-none');
                success.classList.add('d-none');
            });
    }

    // Event submit form
    form.onsubmit = function (event) {
        event.preventDefault();

        if (validateForm()) {
            submitForm();
        }
    };

    // Validasi tombol submit real-time
    const submitButton = document.getElementById("submitButton");
    function checkInputs() {
        const allFilled = Array.from(inputs).every(input =>
            input.dataset.sbValidations.includes("required") ? input.value.trim() !== "" : true
        );
        submitButton.classList.toggle("disabled", !allFilled);
    }

    inputs.forEach((input) => {
        input.addEventListener("input", checkInputs);
    });

    checkInputs();
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopContainer = document.querySelector('#backToTopContainer');
    const backToTop = document.querySelector('#backToTop');

    // Fungsi untuk mengatur visibilitas tombol
    const toggleBackToTop = () => {
        if (window.scrollY > 100) {
            backToTopContainer.classList.remove('d-none');
        } else {
            backToTopContainer.classList.add('d-none');
        }
    };

    // Scroll event untuk menampilkan/menyembunyikan tombol
    window.addEventListener('scroll', toggleBackToTop);

    // Klik tombol untuk kembali ke atas
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // Inisialisasi pertama
    toggleBackToTop();
});
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});

