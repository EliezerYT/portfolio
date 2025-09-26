'use strict';

// -------------------------------
// ELEMENT TOGGLE FUNC
// -------------------------------
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// -------------------------------
// SIDEBAR
// -------------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// -------------------------------
// TESTIMONIALS MODAL
// -------------------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// -------------------------------
// CUSTOM SELECT & FILTER
// -------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// -------------------------------
// CONTACT FORM
// -------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// -------------------------------
// PAGE NAVIGATION
// -------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// -------------------------------
// PROJECT OVERLAY & CAROUSEL
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.getElementById('projectOverlay');
  const closeBtn = document.getElementById('closeOverlay');
  const carouselImagesContainer = document.querySelector('.carousel-images');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const projectItems = document.querySelectorAll('.project-item');

  let currentIndex = 0;
  let currentImages = [];

  // Define las imágenes de cada proyecto
  const projectsData = {
    orizon: [
      './assets/images/project-2.png',
      './assets/images/project-2b.png'
    ],
    fundo: [
      './assets/images/project-3.jpg'
    ],
    brawlhalla: [
      './assets/images/project-4.png',
      './assets/images/project-4b.png'
    ]
  };

  function loadProjectImages(project) {
    carouselImagesContainer.innerHTML = '';
    currentImages = projectsData[project] || [];
    currentImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.classList.toggle('active', i === 0);
      carouselImagesContainer.appendChild(img);
    });
    currentIndex = 0;
  }

  function showSlide(index) {
    const imgs = carouselImagesContainer.querySelectorAll('img');
    imgs.forEach((img, i) => img.classList.toggle('active', i === index));
  }

  projectItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const project = item.dataset.project;
      if (!project) return;
      loadProjectImages(project);
      overlay.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));

  nextBtn.addEventListener('click', () => {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showSlide(currentIndex);
  });

});