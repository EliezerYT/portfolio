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
var carousel = (function () {
 
 	//
	var activeID = 0,
		itemW = 940,
		carousel_count = $('.carousel_item').length,
		$carouselItems = $('.carousel_items'),
		$carouselItem = $('.carousel_item'),
		$arrowPrev = $('.item_prev'),
		$arrowNext = $('.item_next'),
    $itemArrow = $('.item_arrow'),
		$navDot,
    $navDots = $('.nav_dots'),
		swipeDir,
		slideSpeed = .45,
		slideMeth = Power2.EaseInOut;
	
	//
  function init() {
     
    $carouselItems.css({'width': (itemW * carousel_count) + 'px'});
    $navDots.css({'width': (25 * carousel_count) + 'px'});
    $itemArrow.css({'opacity': .8});
    
    setupDraggable();
    setupDots();
    navigateSlide();
	}
  init();
    
	//
  function setupDraggable() { 
      
    Draggable.create($carouselItems, {
            type:'x',
            edgeResistance: 0.90,
            dragResistance: 0.0,
            bounds:'.carousel_container',
            onDrag:updateDirections,
            onThrowUpdate:updateDirections,
            throwProps:true,
            onDragStart:function(evt) {},
            onDragEnd :function() {

              if(swipeDir == 'left') {activeID++}
              else if(swipeDir == 'right') {activeID--};
              
              navigateSlide();
            }
      });    
  };
                
  // set up dots
  function setupDots() {    
    for(var i = 0; i < carousel_count; i++) {
      $navDots.append('<div class="nav_dot" id="dot_' + i + '"></div>');
    }    
    $navDot = $('.nav_dot');
  }  
  
  // navigate slide
	function navigateSlide() {
		
		if(activeID >= carousel_count-1) activeID = carousel_count-1;
		if(activeID <= 0) activeID = 0;		
						
		var xTarget = ((activeID * itemW) * -1);
		
		TweenMax.to($carouselItems, slideSpeed, {x: xTarget, ease: slideMeth, onComplete: slideDone});
	}
	
	function slideDone() {
		
		$navDot.css({backgroundColor: '#fff'});
    
    //
		TweenMax.to($navDot, .35, {scale: 1, color: 0xFFFFFF});
		TweenMax.to($('#dot_' + activeID), .35, {scale: 1.5, backgroundColor: 'transparent',color: 0xCC0000});
    
    //
    if(activeID == 0) {$arrowPrev.fadeOut()} 
    else {$arrowPrev.fadeIn()}
    
    if(activeID + 1 == carousel_count) {$arrowNext.fadeOut()}
    else {$arrowNext.fadeIn()}
	}
	
	//
	function updateDirections() {
		swipeDir = this.getDirection("start");
	}
  	
  //$itemArrow.click(function() {
  $itemArrow.on('click', function() {
    
    if(Modernizr.touch) return;
    
    if($(this).hasClass('item_next')) {activeID++}
    else {activeID--};
    
    navigateSlide();
	});
  
  $itemArrow.on('touchstart', function() {
    if($(this).hasClass('item_next')) {activeID++}
    else {activeID--};
    
    navigateSlide();
	});
  
	$navDot.hover(		
		function() {			
		    TweenMax.to($(this), .35, {scale: 1.5});
		}, function() {
			 if($(this).attr('id').split('_')[1] == activeID) return;
		   TweenMax.to($(this), .35, {scale: 1.0});
		}  
	);
	
  $navDot.click(function() {		
    var dotID = $(this).attr('id').split('_')[1];
		activeID = dotID;
			
	  navigateSlide();		
	});
  
	//
	$carouselItem.mousedown(function() {		
		activeID = $(this).attr('id').split('_')[1];
    
    $(this).removeClass('grab');
    $(this).addClass('grabbing');
    
	});
  
  //   
  $carouselItem.mouseenter(function() {        
    $(this).removeClass('grabbing');
    $(this).addClass('grab');
  });

  $carouselItem.mouseup(function() {        
    $(this).removeClass('grabbing');
    $(this).addClass('grab');
  });  
  
})();
    
});