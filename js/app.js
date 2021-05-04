/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.querySelector ("#navbar__list");
const sectionList = document.querySelectorAll ("section");
const sectionOffsetList = {};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const buildSectionOffsetList = () => {
  sectionList.forEach (section => {
    sectionOffsetList [section.id] = Math.floor (section.getBoundingClientRect().top);
  });
};

const getSectionOffset = (id) => {
  return sectionOffsetList [id];
};

const buildLiHTML = (id, data) => {
  return `<li id="li_${id}"><a id="li__a_${id}" href="#${id}">${data}</a></li>`;
};

const scrollToTop = (e) => {
  /* Prevent the default behavior of the anchor hyperlinking */
  e.preventDefault ();
  window.scrollTo ( {left: 0, top: 0, behavior: 'smooth'} );
};

/* Scroll to section on link click */
const navBarMenuClickEventHandler = (e) => {
  /* Prevent the default behavior of the anchor hyperlinking */
  e.preventDefault ();

  let element = document.querySelector (e.target.hash);
  let offset = getSectionOffset (element.id);

  /* Scroll to anchor ID using scrollTO event */
  window.scrollTo ( {left: 0, top: offset, behavior: 'smooth'} );
}

/* Add class 'active' to section when near top of viewport */
const intersectionHandler = (entries) => {
  entries.forEach (entry => {
    let navItem = document.querySelector (`#li_${entry.target.id}`);
    /* Remove the active class first. Add it only if the section is currently under View Port */
    entry.target.classList.remove ("your-active-class");
    navItem.classList.remove ("navbar__active");
    if (entry ['isIntersecting'] === true) {
      /* Set sections as active */
      navItem.classList.add ("navbar__active");
      entry.target.classList.add ("your-active-class");
    }
  });
}

const createIntersectionObserver = () => {
  let observer;

  let options = {
    root: null,
    rootMargin: '50px 0px 50px 0px',
    threshold: [0.5]
  };

  observer = new IntersectionObserver (intersectionHandler, options);

  sectionList.forEach (section => {
    observer.observe (section);
  });
}

const buildNavigation = () => {
  /* Iterate through sectionList and add the li items to navBar, dynamically */
  for(let section of sectionList) {
    /* Get the section Id */
    let sectionId = section.id;
    /* Get the section data */
    let sectionData = section.dataset.nav;

    /* Build menu */
    /* create the new li element */
    let navBarItem = document.createElement ("li");
    navBarItem.innerHTML = buildLiHTML (sectionId, sectionData);
  
    /* Now, insert the li item to navBar */
    navBar.insertAdjacentElement ('beforeend', navBarItem);
  }

  createIntersectionObserver ();
};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* build the nav */
buildNavigation ();
buildSectionOffsetList ();
/**
 * End Main Functions
 * Begin Events
 * 
*/
navBar.addEventListener ('click', navBarMenuClickEventHandler);
document.querySelector ("#button__scroll_to_top").addEventListener ('click', scrollToTop);
