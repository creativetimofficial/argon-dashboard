"use strict";
(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if (document.getElementsByClassName('main-content')[0]) {
      var mainpanel = document.querySelector('.main-content');
      var ps = new PerfectScrollbar(mainpanel);
    };

    if (document.getElementsByClassName('sidenav')[0]) {
      var sidebar = document.querySelector('.sidenav');
      var ps1 = new PerfectScrollbar(sidebar);
    };

    if (document.getElementsByClassName('navbar-collapse')[0]) {
      var fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
      var ps2 = new PerfectScrollbar(fixedplugin);
    };

    if (document.getElementsByClassName('fixed-plugin')[0]) {
      var fixedplugin = document.querySelector('.fixed-plugin');
      var ps3 = new PerfectScrollbar(fixedplugin);
    };
  };
})();

// Verify navbar blur on scroll
if (document.getElementById('navbarBlur') && document.getElementById('navbarBlur').getAttribute('data-scroll') == 'true') {
  navbarBlurOnScroll('navbarBlur');
}

// initialization of Popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// initialization of Toasts
document.addEventListener("DOMContentLoaded", function() {
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));

  var toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl);
  });

  var toastButtonList = [].slice.call(document.querySelectorAll(".toast-btn"));

  toastButtonList.map(function(toastButtonEl) {
    toastButtonEl.addEventListener("click", function() {
      var toastToTrigger = document.getElementById(toastButtonEl.dataset.target);

      if (toastToTrigger) {
        var toast = bootstrap.Toast.getInstance(toastToTrigger);
        toast.show();
      }
    });
  });
});

//
// Widget Calendar
//

if (document.querySelector('[data-toggle="widget-calendar"]')) {
  var calendarEl = document.querySelector('[data-toggle="widget-calendar"]');
  var today = new Date();
  var mYear = today.getFullYear();
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var mDay = weekday[today.getDay()];

  var m = today.getMonth();
  var d = today.getDate();
  document.getElementsByClassName('widget-calendar-year')[0].innerHTML = mYear;
  document.getElementsByClassName('widget-calendar-day')[0].innerHTML = mDay;

  var calendar = new FullCalendar.Calendar(calendarEl, {
    contentHeight: 'auto',
    initialView: 'dayGridMonth',
    selectable: true,
    initialDate: '2020-12-01',
    editable: true,
    headerToolbar: false,
    events: [{
        title: 'Call with Dave',
        start: '2020-11-18',
        end: '2020-11-18',
        className: 'bg-gradient-danger'
      },

      {
        title: 'Lunch meeting',
        start: '2020-11-21',
        end: '2020-11-22',
        className: 'bg-gradient-warning'
      },

      {
        title: 'All day conference',
        start: '2020-11-29',
        end: '2020-11-29',
        className: 'bg-gradient-success'
      },

      {
        title: 'Meeting with Mary',
        start: '2020-12-01',
        end: '2020-12-01',
        className: 'bg-gradient-info'
      },

      {
        title: 'Winter Hackaton',
        start: '2020-12-03',
        end: '2020-12-03',
        className: 'bg-gradient-danger'
      },

      {
        title: 'Digital event',
        start: '2020-12-07',
        end: '2020-12-09',
        className: 'bg-gradient-warning'
      },

      {
        title: 'Marketing event',
        start: '2020-12-10',
        end: '2020-12-10',
        className: 'bg-gradient-primary'
      },

      {
        title: 'Dinner with Family',
        start: '2020-12-19',
        end: '2020-12-19',
        className: 'bg-gradient-danger'
      },

      {
        title: 'Black Friday',
        start: '2020-12-23',
        end: '2020-12-23',
        className: 'bg-gradient-info'
      },

      {
        title: 'Cyber Week',
        start: '2020-12-02',
        end: '2020-12-02',
        className: 'bg-gradient-warning'
      },

    ]
  });
  calendar.render();
}

// when input is focused add focused class for style
function focused(el) {
  if (el.parentElement.classList.contains('input-group')) {
    el.parentElement.classList.add('focused');
  }
}

// when input is focused remove focused class for style
function defocused(el) {
  if (el.parentElement.classList.contains('input-group')) {
    el.parentElement.classList.remove('focused');
  }
}

// helper for adding on all elements multiple attributes
function setAttributes(el, options) {
  Object.keys(options).forEach(function(attr) {
    el.setAttribute(attr, options[attr]);
  })
}

// adding on inputs attributes for calling the focused and defocused functions
if (document.querySelectorAll('.input-group').length != 0) {
  var allInputs = document.querySelectorAll('input.form-control');
  allInputs.forEach(el => setAttributes(el, {
    "onfocus": "focused(this)",
    "onfocusout": "defocused(this)"
  }));
}

// Multi Level Dropdown
function dropDown(a) {
  if (!document.querySelector('.dropdown-hover')) {
    event.stopPropagation();
    event.preventDefault();
    var multilevel = a.parentElement.parentElement.children;

    for (var i = 0; i < multilevel.length; i++) {
      if (multilevel[i].lastElementChild != a.parentElement.lastElementChild) {
        multilevel[i].lastElementChild.classList.remove('show');
      }
    }

    if (!a.nextElementSibling.classList.contains("show")) {
      a.nextElementSibling.classList.add("show");
    } else {
      a.nextElementSibling.classList.remove("show");
    }
  }
}

// Fixed Plugin
if (document.querySelector('.fixed-plugin')) {
  var fixedPlugin = document.querySelector('.fixed-plugin');
  var fixedPluginButton = document.querySelector('.fixed-plugin-button');
  var fixedPluginButtonNav = document.querySelector('.fixed-plugin-button-nav');
  var fixedPluginCard = document.querySelector('.fixed-plugin .card');
  var fixedPluginCloseButton = document.querySelectorAll('.fixed-plugin-close-button');
  var navbar = document.getElementById('navbarBlur');
  var buttonNavbarFixed = document.getElementById('navbarFixed');

  if (fixedPluginButton) {
    fixedPluginButton.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  if (fixedPluginButtonNav) {
    fixedPluginButtonNav.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  fixedPluginCloseButton.forEach(function(el) {
    el.onclick = function() {
      fixedPlugin.classList.remove('show');
    }
  })

  document.querySelector('body').onclick = function(e) {
    if (e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest('.fixed-plugin .card') != fixedPluginCard) {
      fixedPlugin.classList.remove('show');
    }
  }

  if (navbar) {
    if (navbar.getAttribute('data-scroll') == 'true' && buttonNavbarFixed) {
      buttonNavbarFixed.setAttribute("checked", "true");
    }
  }

}

//Set Sidebar Color
function sidebarColor(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-color");

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');
  sidebar.setAttribute("data-color", color);

  if (document.querySelector('#sidenavCard')) {
    var sidenavCard = document.querySelector('#sidenavCard');
    let sidenavCardClasses = ['card', 'card-background', 'shadow-none', 'card-background-mask-' + color];
    sidenavCard.className = '';
    sidenavCard.classList.add(...sidenavCardClasses);

    var sidenavCardIcon = document.querySelector('#sidenavCardIcon');
    let sidenavCardIconClasses = ['ni', 'ni-diamond', 'text-gradient', 'text-lg', 'top-0', 'text-' + color];
    sidenavCardIcon.className = '';
    sidenavCardIcon.classList.add(...sidenavCardIconClasses);
  }
}

// Set Sidebar Type
function sidebarType(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-class");
  var body = document.querySelector("body");
  var bodyWhite = document.querySelector("body:not(.dark-version)");
  var bodyDark = body.classList.contains('dark-version');

  var colors = [];

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
    colors.push(parent[i].getAttribute('data-class'));
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');

  for (var i = 0; i < colors.length; i++) {
    sidebar.classList.remove(colors[i]);
  }

  sidebar.classList.add(color);


  // Remove text-white/text-dark classes
  if (color == 'bg-transparent' || color == 'bg-white') {
    var textWhites = document.querySelectorAll('.sidenav .text-white');
    for (let i = 0; i < textWhites.length; i++) {
      textWhites[i].classList.remove('text-white');
      textWhites[i].classList.add('text-dark');
    }
  } else {
    var textDarks = document.querySelectorAll('.sidenav .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  if (color == 'bg-transparent' && bodyDark) {
    var textDarks = document.querySelectorAll('.navbar-brand .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  // Remove logo-white/logo-dark

  if ((color == 'bg-transparent' || color == 'bg-white') && bodyWhite) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  } else {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;
    if (navbarBrandImg.includes('logo-ct-dark.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
      navbarBrand.src = navbarBrandImgNew;
    }
  }

  if (color == 'bg-white' && bodyDark) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  }
}

// Set Navbar Fixed
function navbarFixed(el) {
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  const navbar = document.getElementById('navbarBlur');

  if (!el.getAttribute("checked")) {
    navbar.classList.add(...classes);
    navbar.setAttribute('data-scroll', 'true');
    navbarBlurOnScroll('navbarBlur');
    el.setAttribute("checked", "true");
  } else {
    navbar.classList.remove(...classes);
    navbar.setAttribute('data-scroll', 'false');
    navbarBlurOnScroll('navbarBlur');
    el.removeAttribute("checked");
  }
};

// Set Navbar Minimized
function navbarMinimize(el) {
  var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];

  if (!el.getAttribute("checked")) {
    sidenavShow.classList.remove('g-sidenav-pinned');
    sidenavShow.classList.add('g-sidenav-hidden');
    el.setAttribute("checked", "true");
  } else {
    sidenavShow.classList.remove('g-sidenav-hidden');
    sidenavShow.classList.add('g-sidenav-pinned');
    el.removeAttribute("checked");
  }
}

// Navbar blur on scroll
function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
  let scrollDistance = 5;
  let classes = ['blur', 'shadow-blur', 'left-auto'];
  let toggleClasses = ['shadow-none'];

  if (navbarScrollActive == 'true') {
    window.onscroll = debounce(function() {
      if (window.scrollY > scrollDistance) {
        blurNavbar();
      } else {
        transparentNavbar();
      }
    }, 10);
  } else {
    window.onscroll = debounce(function() {
      transparentNavbar();
    }, 10);
  }

  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    var content = document.querySelector('.main-content');
    if (navbarScrollActive == 'true') {
      content.addEventListener('ps-scroll-y', debounce(function() {
        if (content.scrollTop > scrollDistance) {
          blurNavbar();
        } else {
          transparentNavbar();
        }
      }, 10));
    } else {
      content.addEventListener('ps-scroll-y', debounce(function() {
        transparentNavbar();
      }, 10));
    }
  }

  function blurNavbar() {
    navbar.classList.add(...classes)
    navbar.classList.remove(...toggleClasses)

    toggleNavLinksColor('blur');
  }

  function transparentNavbar() {
    navbar.classList.remove(...classes)
    navbar.classList.add(...toggleClasses)

    toggleNavLinksColor('transparent');
  }

  function toggleNavLinksColor(type) {
    let navLinks = document.querySelectorAll('.navbar-main .nav-link')
    let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

    if (type === "blur") {
      navLinks.forEach(element => {
        element.classList.remove('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.add('bg-dark')
      });
    } else if (type === "transparent") {
      navLinks.forEach(element => {
        element.classList.add('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.remove('bg-dark')
      });
    }
  }
}

// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Tabs navigation

var total = document.querySelectorAll('.nav-pills');

function initNavs() {
  total.forEach(function(item, i) {
    var moving_div = document.createElement('div');
    var li_active = item.querySelector(".nav-link.active");
    var tab = li_active.cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);
    item.appendChild(moving_div);

    var list_length = item.getElementsByTagName("li").length;

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }

    item.onmouseover = function(event) {
      let target = getEventTarget(event);
      let li = target.closest('li'); // get reference
      if (li) {
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
          moving_div = item.querySelector('.moving-tab');
          let sum = 0;
          if (item.classList.contains('flex-column')) {
            for (var j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
            }
            moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
            moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          } else {
            for (var j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
            }
            moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
            moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
          }
        }
      }
    }
  });
}

setTimeout(function() {
  initNavs();
}, 100);

// Tabs navigation resize

window.addEventListener('resize', function(event) {
  total.forEach(function(item, i) {
    item.querySelector('.moving-tab').remove();
    var moving_div = document.createElement('div');
    var tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }
  });

  if (window.innerWidth < 991) {
    total.forEach(function(item, i) {
      if (!item.classList.contains('flex-column')) {
        item.classList.remove('flex-row');
        item.classList.add('flex-column', 'on-resize');
        let li = item.querySelector(".nav-link.active").parentElement;
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        let sum = 0;
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        var moving_div = document.querySelector('.moving-tab');
        moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';

      }
    });
  } else {
    total.forEach(function(item, i) {
      if (item.classList.contains('on-resize')) {
        item.classList.remove('flex-column', 'on-resize');
        item.classList.add('flex-row');
        let li = item.querySelector(".nav-link.active").parentElement;
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        let sum = 0;
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        var moving_div = document.querySelector('.moving-tab');
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
      }
    })
  }
});

// Function to remove flex row on mobile devices
if (window.innerWidth < 991) {
  total.forEach(function(item, i) {
    if (item.classList.contains('flex-row')) {
      item.classList.remove('flex-row');
      item.classList.add('flex-column', 'on-resize');
    }
  });
}

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

// End tabs navigation

// click to minimize the sidebar or reverse to normal
if (document.querySelector('.sidenav-toggler')) {
  var sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
  var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];
  var toggleNavbarMinimize = document.getElementById('navbarMinimize');

  if (sidenavShow) {
    sidenavToggler.onclick = function() {
      if (!sidenavShow.classList.contains('g-sidenav-hidden')) {
        sidenavShow.classList.remove('g-sidenav-pinned');
        sidenavShow.classList.add('g-sidenav-hidden');
        if (toggleNavbarMinimize) {
          toggleNavbarMinimize.click();
          toggleNavbarMinimize.setAttribute("checked", "true");
        }
      } else {
        sidenavShow.classList.remove('g-sidenav-hidden');
        sidenavShow.classList.add('g-sidenav-pinned');
        if (toggleNavbarMinimize) {
          toggleNavbarMinimize.click();
          toggleNavbarMinimize.removeAttribute("checked");
        }
      }
    }
  }
}


// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function() {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}


// Resize navbar color depends on configurator active type of sidenav

let referenceButtons = document.querySelector('[data-class]');

window.addEventListener("resize", navbarColorOnResize);

function navbarColorOnResize() {
  if (sidenav) {
    if (window.innerWidth > 1200) {
      if (referenceButtons?.classList.contains('active') && referenceButtons?.getAttribute('data-class') === 'bg-transparent') {
        sidenav.classList.remove('bg-white');
      } else {
        if (!document.querySelector('body').classList.contains('dark-version')) {
          sidenav.classList.add('bg-white');
        }
      }
    } else {
      sidenav.classList.remove('bg-transparent');
    }
  }
}

// Deactivate sidenav type buttons on resize and small screens
window.addEventListener("resize", sidenavTypeOnResize);
window.addEventListener("load", sidenavTypeOnResize);

function sidenavTypeOnResize() {
  let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
  if (window.innerWidth < 1200) {
    elements.forEach(function(el) {
      el.classList.add('disabled');
    });
  } else {
    elements.forEach(function(el) {
      el.classList.remove('disabled');
    });
  }
}

// Notification function
function notify(el) {
  var body = document.querySelector('body');
  var alert = document.createElement('div');
  alert.classList.add('alert', 'position-absolute', 'top-0', 'border-0', 'text-white', 'w-50', 'end-0', 'start-0', 'mt-2', 'mx-auto', 'py-2');
  alert.classList.add('alert-' + el.getAttribute('data-type'));
  alert.style.transform = 'translate3d(0px, 0px, 0px)'
  alert.style.opacity = '0';
  alert.style.transition = '.35s ease';
  alert.style.zIndex = '9999';
  setTimeout(function() {
    alert.style.transform = 'translate3d(0px, 20px, 0px)';
    alert.style.setProperty("opacity", "1", "important");
  }, 100);

  alert.innerHTML = '<div class="d-flex mb-1">' +
    '<div class="alert-icon me-1">' +
    '<i class="' + el.getAttribute('data-icon') + ' mt-1"></i>' +
    '</div>' +
    '<span class="alert-text"><strong>' + el.getAttribute('data-title') + '</strong></span>' +
    '</div>' +
    '<span class="text-sm">' + el.getAttribute('data-content') + '</span>';

  body.appendChild(alert);
  setTimeout(function() {
    alert.style.transform = 'translate3d(0px, 0px, 0px)'
    alert.style.setProperty("opacity", "0", "important");
  }, 4000);
  setTimeout(function() {
    el.parentElement.querySelector('.alert').remove();
  }, 4500);
}

window.onload = function() {
  // Material Design Input function
  var inputs = document.querySelectorAll('input');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute('value')) {
      inputs[i].parentElement.classList.add('is-filled');
    }
    inputs[i].addEventListener('focus', function(e) {
      this.parentElement.classList.add('is-focused');
    }, false);

    inputs[i].onkeyup = function(e) {
      if (this.value != "") {
        this.parentElement.classList.add('is-filled');
      } else {
        this.parentElement.classList.remove('is-filled');
      }
    };

    inputs[i].addEventListener('focusout', function(e) {
      if (this.value != "") {
        this.parentElement.classList.add('is-filled');
      }
      this.parentElement.classList.remove('is-focused');
    }, false);
  }

  // Ripple Effect
  var ripples = document.querySelectorAll('.btn');

  for (var i = 0; i < ripples.length; i++) {
    ripples[i].addEventListener('click', function(e) {
      var targetEl = e.target;
      var rippleDiv = targetEl.querySelector('.ripple');

      rippleDiv = document.createElement('span');
      rippleDiv.classList.add('ripple');
      rippleDiv.style.width = rippleDiv.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
      targetEl.appendChild(rippleDiv);

      rippleDiv.style.left = (e.offsetX - rippleDiv.offsetWidth / 2) + 'px';
      rippleDiv.style.top = (e.offsetY - rippleDiv.offsetHeight / 2) + 'px';
      rippleDiv.classList.add('ripple');
      setTimeout(function() {
        rippleDiv.parentElement.removeChild(rippleDiv);
      }, 600);
    }, false);
  }
};

// Light Mode / Dark Mode
function darkMode(el) {
  const body = document.getElementsByTagName('body')[0];
  const hr = document.querySelectorAll('div:not(.sidenav) > hr');
  const hr_card = document.querySelectorAll('div:not(.bg-gradient-dark) hr');
  const text_btn = document.querySelectorAll('button:not(.btn) > .text-dark');
  const text_span = document.querySelectorAll('span.text-dark, .breadcrumb .text-dark');
  const text_span_white = document.querySelectorAll('span.text-white, .breadcrumb .text-white');
  const text_strong = document.querySelectorAll('strong.text-dark');
  const text_strong_white = document.querySelectorAll('strong.text-white');
  const text_nav_link = document.querySelectorAll('a.nav-link.text-dark');
  const text_nav_link_white = document.querySelectorAll('a.nav-link.text-white');
  const secondary = document.querySelectorAll('.text-secondary');
  const bg_gray_100 = document.querySelectorAll('.bg-gray-100');
  const bg_gray_600 = document.querySelectorAll('.bg-gray-600');
  const btn_text_dark = document.querySelectorAll('.btn.btn-link.text-dark, .material-symbols-rounded.text-dark');
  const btn_text_white = document.querySelectorAll('.btn.btn-link.text-white, .material-symbols-rounded.text-white');
  const card_border = document.querySelectorAll('.card.border');
  const card_border_dark = document.querySelectorAll('.card.border.border-dark');
  const mainContent_blur = document.querySelectorAll('.main-content .container-fluid .card');
  const svg = document.querySelectorAll('g');
  const sidenavs = document.querySelectorAll('.sidenav');

  if (!el.getAttribute("checked")) {

    body.classList.add('dark-version');
    for (var i = 0; i < hr.length; i++) {
      if (hr[i].classList.contains('dark')) {
        hr[i].classList.remove('dark');
        hr[i].classList.add('light');
      }
    }

    for (let i = 0; i < sidenavs.length; i++) {
      const sidenav = sidenavs[i];
      console.log(sidenav);
      if (sidenav.classList.contains('bg-white')) {
        sidenav.classList.remove('bg-white');
        sidenav.classList.add('bg-dark');
      }
    }

    for (var i = 0; i < mainContent_blur.length; i++) {
      if (mainContent_blur[i].classList.contains('blur')) {
        mainContent_blur[i].classList.remove('blur', 'shadow-blur');
      }
    }
    for (var i = 0; i < hr_card.length; i++) {
      if (hr_card[i].classList.contains('dark')) {
        hr_card[i].classList.remove('dark');
        hr_card[i].classList.add('light');
      }
    }
    for (var i = 0; i < text_btn.length; i++) {
      if (text_btn[i].classList.contains('text-dark')) {
        text_btn[i].classList.remove('text-dark');
        text_btn[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_span.length; i++) {
      if (text_span[i].classList.contains('text-dark')) {
        text_span[i].classList.remove('text-dark');
        text_span[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_strong.length; i++) {
      if (text_strong[i].classList.contains('text-dark')) {
        text_strong[i].classList.remove('text-dark');
        text_strong[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < text_nav_link.length; i++) {
      if (text_nav_link[i].classList.contains('text-dark')) {
        text_nav_link[i].classList.remove('text-dark');
        text_nav_link[i].classList.add('text-white');
      }
    }
    for (var i = 0; i < secondary.length; i++) {
      if (secondary[i].classList.contains('text-secondary')) {
        secondary[i].classList.remove('text-secondary');
        secondary[i].classList.add('text-white');
        secondary[i].classList.add('opacity-8');
      }
    }
    for (var i = 0; i < bg_gray_100.length; i++) {
      if (bg_gray_100[i].classList.contains('bg-gray-100')) {
        bg_gray_100[i].classList.remove('bg-gray-100');
        bg_gray_100[i].classList.add('bg-gray-600');
      }
    }
    for (var i = 0; i < btn_text_dark.length; i++) {
      btn_text_dark[i].classList.remove('text-dark');
      btn_text_dark[i].classList.add('text-white');
    }
    for (var i = 0; i < svg.length; i++) {
      if (svg[i].hasAttribute('fill')) {
        svg[i].setAttribute('fill', '#fff');
      }
    }
    for (var i = 0; i < card_border.length; i++) {
      card_border[i].classList.add('border-dark');
    }
    el.setAttribute("checked", "true");
  } else {
    body.classList.remove('dark-version');
    for (var i = 0; i < hr.length; i++) {
      if (hr[i].classList.contains('light')) {
        hr[i].classList.add('dark');
        hr[i].classList.remove('light');
      }
    }

    for (let i = 0; i < sidenavs.length; i++) {
      if (sidenav.classList.contains('bg-dark')) {
        sidenav.classList.remove('bg-dark');
        sidenav.classList.add('bg-white');
      }
    }

    for (var i = 0; i < hr_card.length; i++) {
      if (hr_card[i].classList.contains('light')) {
        hr_card[i].classList.add('dark');
        hr_card[i].classList.remove('light');
      }
    }
    for (var i = 0; i < mainContent_blur.length; i++) {
      mainContent_blur[i].classList.add('blur', 'shadow-blur');
    }
    for (var i = 0; i < text_btn.length; i++) {
      if (text_btn[i].classList.contains('text-white')) {
        text_btn[i].classList.remove('text-white');
        text_btn[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < text_span_white.length; i++) {
      if (text_span_white[i].classList.contains('text-white') && !text_span_white[i].closest('.sidenav') && !text_span_white[i].closest('.card.bg-gradient-dark')) {
        text_span_white[i].classList.remove('text-white');
        text_span_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < text_strong_white.length; i++) {
      if (text_strong_white[i].classList.contains('text-white')) {
        text_strong_white[i].classList.remove('text-white');
        text_strong_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < text_nav_link_white.length; i++) {
      if (text_nav_link_white[i].classList.contains('text-white') && !text_nav_link_white[i].closest('.sidenav')) {
        text_nav_link_white[i].classList.remove('text-white');
        text_nav_link_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < secondary.length; i++) {
      if (secondary[i].classList.contains('text-white')) {
        secondary[i].classList.remove('text-white');
        secondary[i].classList.remove('opacity-8');
        secondary[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < bg_gray_600.length; i++) {
      if (bg_gray_600[i].classList.contains('bg-gray-600')) {
        bg_gray_600[i].classList.remove('bg-gray-600');
        bg_gray_600[i].classList.add('bg-gray-100');
      }
    }
    for (var i = 0; i < svg.length; i++) {
      if (svg[i].hasAttribute('fill')) {
        svg[i].setAttribute('fill', '#252f40');
      }
    }
    for (var i = 0; i < btn_text_white.length; i++) {
      if (!btn_text_white[i].closest('.card.bg-gradient-dark')) {
        btn_text_white[i].classList.remove('text-white');
        btn_text_white[i].classList.add('text-dark');
      }
    }
    for (var i = 0; i < card_border_dark.length; i++) {
      card_border_dark[i].classList.remove('border-dark');
    }
    el.removeAttribute("checked");
  }
};

// flatpickr init
if (document.querySelector('.datepicker')) {
  flatpickr('.datepicker', {
    mode: "range"
  });
}

// validation
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm_password');

//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'input-group input-group-outline my-5 is-invalid is-filled';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success colour
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = 'input-group input-group-outline my-5 is-valid is-filled';
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSucces(input)
  } else {
    showError(input, 'Email is not invalid');
  }
}

//checkRequired fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSucces(input);
    }
  });
}


//check input Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be les than ${max} characters`);
  } else {
    showSucces(input);
  }
}

//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}


//Event Listeners
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
  });
}


var material = {
  initFullCalendar: function() {
    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('fullCalendar');
      var today = new Date();
      var y = today.getFullYear();
      var m = today.getMonth();
      var d = today.getDate();
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        headerToolbar: {
          left: 'title',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          right: 'prev,next today'
        },
        select: function(info) {
          // on select we show the Sweet Alert modal with an input
          Swal.fire({
            title: 'Create an Event',
            html: '<div class="form-group">' +
              '<input class="form-control text-default" placeholder="Event Title" id="input-field">' +
              '</div>',
            showCancelButton: true,
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          }).then(function(result) {
            var eventData;
            var event_title = document.getElementById('input-field').value;
            if (event_title) {
              eventData = {
                title: event_title,
                start: info.startStr,
                end: info.endStr
              };
              calendar.addEvent(eventData);
            }
          });
        },
        editable: true,
        // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
        events: [{
            title: 'All Day Event',
            start: new Date(y, m, 1),
            className: 'event-default'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 4, 6, 0),
            allDay: false,
            className: 'event-rose'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 3, 6, 0),
            allDay: false,
            className: 'event-rose'
          },
          {
            title: 'Meeting',
            start: new Date(y, m, d - 1, 10, 30),
            allDay: false,
            className: 'event-green'
          },
          {
            title: 'Lunch',
            start: new Date(y, m, d + 7, 12, 0),
            end: new Date(y, m, d + 7, 14, 0),
            allDay: false,
            className: 'event-red'
          },
          {
            title: 'Md-pro Launch',
            start: new Date(y, m, d - 2, 12, 0),
            allDay: true,
            className: 'event-azure'
          },
          {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            className: 'event-azure'
          },
          {
            title: 'Click for Creative Tim',
            start: new Date(y, m, 21),
            end: new Date(y, m, 22),
            url: 'http://www.creative-tim.com/',
            className: 'event-orange'
          },
          {
            title: 'Click for Google',
            start: new Date(y, m, 23),
            end: new Date(y, m, 23),
            url: 'http://www.creative-tim.com/',
            className: 'event-orange'
          }
        ]
      });
      calendar.render();
    });
  },
  datatableSimple: function() {
    var columnDefs = [{
        field: 'athlete',
        minWidth: 150,
        sortable: true,
        filter: true
      },
      {
        field: 'age',
        maxWidth: 90,
        sortable: true,
        filter: true
      },
      {
        field: 'country',
        minWidth: 150,
        sortable: true,
        filter: true
      },
      {
        field: 'year',
        maxWidth: 90,
        sortable: true,
        filter: true
      },
      {
        field: 'date',
        minWidth: 150,
        sortable: true,
        filter: true
      },
      {
        field: 'sport',
        minWidth: 150,
        sortable: true,
        filter: true
      },
      {
        field: 'gold'
      },
      {
        field: 'silver'
      },
      {
        field: 'bronze'
      },
      {
        field: 'total'
      },
    ];

    // specify the data
    var rowData = [{
        "athlete": "Ronald Valencia",
        "age": 23,
        "country": "United States",
        "year": 2008,
        "date": "24/08/2008",
        "sport": "Swimming",
        "gold": 8,
        "silver": 0,
        "bronze": 0,
        "total": 8
      },
      {
        "athlete": "Lorand Frentz",
        "age": 19,
        "country": "United States",
        "year": 2004,
        "date": "29/08/2004",
        "sport": "Swimming",
        "gold": 6,
        "silver": 0,
        "bronze": 2,
        "total": 8
      },
      {
        "athlete": "Michael Phelps",
        "age": 27,
        "country": "United States",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 4,
        "silver": 2,
        "bronze": 0,
        "total": 6
      },
      {
        "athlete": "Natalie Coughlin",
        "age": 25,
        "country": "United States",
        "year": 2008,
        "date": "24/08/2008",
        "sport": "Swimming",
        "gold": 1,
        "silver": 2,
        "bronze": 3,
        "total": 6
      },
      {
        "athlete": "Aleksey Nemov",
        "age": 24,
        "country": "Russia",
        "year": 2000,
        "date": "01/10/2000",
        "sport": "Gymnastics",
        "gold": 2,
        "silver": 1,
        "bronze": 3,
        "total": 6
      },
      {
        "athlete": "Alicia Coutts",
        "age": 24,
        "country": "Australia",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 1,
        "silver": 3,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Missy Franklin",
        "age": 17,
        "country": "United States",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 4,
        "silver": 0,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Ryan Lochte",
        "age": 27,
        "country": "United States",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 2,
        "silver": 2,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Allison Schmitt",
        "age": 22,
        "country": "United States",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 3,
        "silver": 1,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Natalie Coughlin",
        "age": 21,
        "country": "United States",
        "year": 2004,
        "date": "29/08/2004",
        "sport": "Swimming",
        "gold": 2,
        "silver": 2,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Ian Thorpe",
        "age": 17,
        "country": "Australia",
        "year": 2000,
        "date": "01/10/2000",
        "sport": "Swimming",
        "gold": 3,
        "silver": 2,
        "bronze": 0,
        "total": 5
      },
      {
        "athlete": "Dara Torres",
        "age": 33,
        "country": "United States",
        "year": 2000,
        "date": "01/10/2000",
        "sport": "Swimming",
        "gold": 2,
        "silver": 0,
        "bronze": 3,
        "total": 5
      },
      {
        "athlete": "Cindy Klassen",
        "age": 26,
        "country": "Canada",
        "year": 2006,
        "date": "26/02/2006",
        "sport": "Speed Skating",
        "gold": 1,
        "silver": 2,
        "bronze": 2,
        "total": 5
      },
      {
        "athlete": "Nastia Liukin",
        "age": 18,
        "country": "United States",
        "year": 2008,
        "date": "24/08/2008",
        "sport": "Gymnastics",
        "gold": 1,
        "silver": 3,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Marit Bjørgen",
        "age": 29,
        "country": "Norway",
        "year": 2010,
        "date": "28/02/2010",
        "sport": "Cross Country Skiing",
        "gold": 3,
        "silver": 1,
        "bronze": 1,
        "total": 5
      },
      {
        "athlete": "Sun Yang",
        "age": 20,
        "country": "China",
        "year": 2012,
        "date": "12/08/2012",
        "sport": "Swimming",
        "gold": 2,
        "silver": 1,
        "bronze": 1,
        "total": 4
      }
    ];

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      rowSelection: 'multiple',
      rowMultiSelectWithClick: true,
      rowData: rowData
    };

    // setup the grid after the page has finished loading
    document.addEventListener('DOMContentLoaded', function() {
      var gridDiv = document.querySelector('#datatableSimple');
      new agGrid.Grid(gridDiv, gridOptions);
    });
  },
  initVectorMap: function() {
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.polygon.fillOpacity = 0.6;


      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = chart.colors.getIndex(0);

      // Add image series
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{title}";
      imageSeries.mapImages.template.propertyFields.url = "url";

      var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle.radius = 3;
      circle.propertyFields.fill = "color";

      var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle2.radius = 3;
      circle2.propertyFields.fill = "color";


      circle2.events.on("inited", function(event) {
        animateBullet(event.target);
      })


      function animateBullet(circle) {
        var animation = circle.animate([{
          property: "scale",
          from: 1,
          to: 5
        }, {
          property: "opacity",
          from: 1,
          to: 0
        }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function(event) {
          animateBullet(event.target.object);
        })
      }

      var colorSet = new am4core.ColorSet();

      imageSeries.data = [{
        "title": "Brussels",
        "latitude": 50.8371,
        "longitude": 4.3676,
        "color": colorSet.next()
      }, {
        "title": "Copenhagen",
        "latitude": 55.6763,
        "longitude": 12.5681,
        "color": colorSet.next()
      }, {
        "title": "Paris",
        "latitude": 48.8567,
        "longitude": 2.3510,
        "color": colorSet.next()
      }, {
        "title": "Reykjavik",
        "latitude": 64.1353,
        "longitude": -21.8952,
        "color": colorSet.next()
      }, {
        "title": "Moscow",
        "latitude": 55.7558,
        "longitude": 37.6176,
        "color": colorSet.next()
      }, {
        "title": "Madrid",
        "latitude": 40.4167,
        "longitude": -3.7033,
        "color": colorSet.next()
      }, {
        "title": "London",
        "latitude": 51.5002,
        "longitude": -0.1262,
        "url": "http://www.google.co.uk",
        "color": colorSet.next()
      }, {
        "title": "Peking",
        "latitude": 39.9056,
        "longitude": 116.3958,
        "color": colorSet.next()
      }, {
        "title": "New Delhi",
        "latitude": 28.6353,
        "longitude": 77.2250,
        "color": colorSet.next()
      }, {
        "title": "Tokyo",
        "latitude": 35.6785,
        "longitude": 139.6823,
        "url": "http://www.google.co.jp",
        "color": colorSet.next()
      }, {
        "title": "Ankara",
        "latitude": 39.9439,
        "longitude": 32.8560,
        "color": colorSet.next()
      }, {
        "title": "Buenos Aires",
        "latitude": -34.6118,
        "longitude": -58.4173,
        "color": colorSet.next()
      }, {
        "title": "Brasilia",
        "latitude": -15.7801,
        "longitude": -47.9292,
        "color": colorSet.next()
      }, {
        "title": "Ottawa",
        "latitude": 45.4235,
        "longitude": -75.6979,
        "color": colorSet.next()
      }, {
        "title": "Washington",
        "latitude": 38.8921,
        "longitude": -77.0241,
        "color": colorSet.next()
      }, {
        "title": "Kinshasa",
        "latitude": -4.3369,
        "longitude": 15.3271,
        "color": colorSet.next()
      }, {
        "title": "Cairo",
        "latitude": 30.0571,
        "longitude": 31.2272,
        "color": colorSet.next()
      }, {
        "title": "Pretoria",
        "latitude": -25.7463,
        "longitude": 28.1876,
        "color": colorSet.next()
      }];
    }); // end am4core.ready()
  },

  // Sweet Alerts

  showSwal: function(type) {
    if (type == 'basic') {
      const swalBasic = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-info'
        }
      });
      swalBasic.fire({
        title: 'Sweet!'
      })

    } else if (type == 'title-and-text') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        }
      });
      swalWithBootstrapButtons.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageAlt: 'Custom image',
      })

    } else if (type == 'success-message') {

      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )

    } else if (type == 'warning-message-and-confirmation') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    } else if (type == 'warning-message-and-cancel') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } else if (type == 'custom-html') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html: 'You can use <b>bold text</b>, ' +
          '<a href="//sweetalert2.github.io">links</a> ' +
          'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    } else if (type == 'rtl-language') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'هل تريد الاستمرار؟',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا',
        showCancelButton: true,
        showCloseButton: true
      })
    } else if (type == 'auto-close') {
      let timerInterval
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {}
      })

    } else if (type == 'input-field') {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn bg-gradient-success',
          cancelButton: 'btn bg-gradient-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
    }
  }

}