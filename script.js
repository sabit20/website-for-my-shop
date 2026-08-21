/* =============================================================
   RORO BD — script.js
   Mobile menu, header state, cart/wishlist UI, newsletter,
   and scroll-reveal animation.
============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Menu ---------- */
  var menuToggle = document.getElementById('mobileMenuToggle');
  var mainNav = document.getElementById('mainNav');
  var navLinks = document.querySelectorAll('.main-nav a');

  function closeMenu() {
    menuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Header Scroll State + Back To Top ---------- */
  var header = document.getElementById('header');
  var backToTop = document.getElementById('backToTop');

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Add To Cart (demo UI only — no backend) ---------- */
  var cartCount = 0;
  var cartCountEl = document.querySelector('.cart-count');
  var addToCartButtons = document.querySelectorAll('.btn-add-cart');

  addToCartButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.classList.add('bump');
        setTimeout(function () { cartCountEl.classList.remove('bump'); }, 300);
      }
      var originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
      btn.classList.add('added');
      setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.classList.remove('added');
      }, 1600);
    });
  });

  /* ---------- Wishlist Toggle ---------- */
  var wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var nowActive = btn.classList.toggle('active');
      var icon = btn.querySelector('i');
      if (nowActive) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    });
  });

  /* ---------- Newsletter Form (demo UI only — no backend) ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var button = newsletterForm.querySelector('button');
      var originalText = button.textContent;
      button.textContent = 'Subscribed';
      newsletterForm.classList.add('submitted');
      setTimeout(function () {
        button.textContent = originalText;
        newsletterForm.classList.remove('submitted');
        emailInput.value = '';
      }, 2500);
    });
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

});
