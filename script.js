document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav li");
  const content = document.getElementById("content");

  // Attach click handlers
  links.forEach(link => {
    link.addEventListener("click", () => {
      const page = link.dataset.page;
      loadPage(page);
      setActive(link);
    });
  });

  // Load the default page
  loadPage("home");
});

function loadPage(page) {
  fetch(`${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Cannot load ${page}.html`);
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      document.getElementById("content").innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}

function setActive(selectedLink) {
  document.querySelectorAll("nav li").forEach(li => li.classList.remove("active"));
  selectedLink.classList.add("active");
}

const pageCache = {}; // in-memory store

document.addEventListener("DOMContentLoaded", () => {
  const links   = document.querySelectorAll("nav li");
  const content = document.getElementById("content");

  // 1) Nav click handlers
  links.forEach(li => {
    li.addEventListener("click", () => {
      const page = li.dataset.page;
      setActiveTab(li);
      loadPage(page, true);
    });
  });

  // 2) Handle back/forward
  window.addEventListener("popstate", e => {
    const page = (e.state && e.state.page) || "home";
    const tab  = document.querySelector(`nav li[data-page="${page}"]`);
    setActiveTab(tab);
    loadPage(page, false);
  });

  // 3) Initial load from URL hash or default
  const initPage = location.hash.replace("#", "") || "home";
  const initTab  = document.querySelector(`nav li[data-page="${initPage}"]`)
                   || document.querySelector(`nav li[data-page="home"]`);
  setActiveTab(initTab);
  loadPage(initPage, false);
});

function loadPage(page, pushHistory=true) {
  const content = document.getElementById("content");

  // trigger fade-out
  content.classList.remove("visible");

  // wait for fade-out before swapping
  setTimeout(() => {
    if (pageCache[page]) {
      // serve from cache
      render(pageCache[page], page, pushHistory);
    } else {
      // fetch + cache
      fetch(`${page}.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${page}.html`);
          return res.text();
        })
        .then(html => {
          pageCache[page] = html;
          render(html, page, pushHistory);
        })
        .catch(err => {
          content.innerHTML = `<p style="color:red">${err.message}</p>`;
          content.classList.add("visible");
        });
    }
  }, 300); // match or exceed your CSS transition
}


function setActiveTab(el) {
  document.querySelectorAll("nav li").forEach(x => x.classList.remove("active"));
  el.classList.add("active");
}


// Sample data for your 12 restaurants
// Make sure the order here matches data-index="0"…data-index="11" in food.html
const foodData = [
  {
    title: "The Peoples Kitchen",
    desc: "YUMMY",
    images: [
      "/img/people1.png",
      "/img/people2.png",
      "/img/people3.png",
      "/img/people4.png"
    ],
    address: "2722 E Michigan Ave, Lansing, MI 48912",
     coords: [42.73343426951525, -84.51273556113648], // sample lat/lng — replace with real location
    website: "https://www.eatpeoples.com/", // or any valid URL
    price: "$$"

  },
  {
    title: "Yard House",
    desc: "YUMMY",
    images: [
      "/img/YH1.png",
    ],
    address:"Yard House, 950 W Big Beaver Rd, Troy, MI 48084",
     coords: [42.56276782604857, -83.16642610162292], // sample lat/lng — replace with real location
    website: "https://www.yardhouse.com/home", // or any valid URL
    price: "$$-$$$"
      
  },

  {
    title: "Sedona Taphouse",
    desc: "Where you ordered burger me salmon :p",
    images: [
      "/",
    ],
    address:"Sedona Taphouse, 198 E Big Beaver Rd, Troy, MI 48083",
     coords: [42.56228830042317, -83.14325621881636], // sample lat/lng — replace with real location
    website: "https://sedonataphouse.com/locations/troy-mi/", // or any valid URL
    price: "$$-$$$"
      
  },

  {
    title: "Luckys Steak House",
    desc: "You Like theee Steak",
    images: [
      "/",
    ],
    address:"Lucky's Steakhouse, 3554 Okemos Rd, Okemos, MI 48864",
     coords: [42.56228830042317, -83.14325621881636], // sample lat/lng — replace with real location
    website: "https://luckyssteakhouse.com/locations/luckys-steakhouse-okemos/", // or any valid URL
    price: "$$-$$$"
      
  },

  {
    title:"Texas Roadhouse",
    desc:"Rolls = Too Good",
    images:[

    ],
    address:"Texas Roadhouse, 280 E Edgewood Blvd, Lansing, MI 48911",
    coords: [42.66203380574558, -84.54761913152555],
    website:"https://www.texasroadhouse.com/location/60-lansingmi/digital-menu",
    price:"$-$$"
  },
  {
    title:"Zen Ramen",
    desc:"Must have during school year",
    images:[

    ],
    address:"Zhen Ramen & Grill, 4790 Hagadorn Rd #142, East Lansing, MI 48823",
    coords:[42.72038786534223, -84.459534556698],
    website:"https://www.zhenrameneastlansing.com/",
    price:"$-$$"
  },
  {
    title:"Daves Hot CHicken",
    desc:"Reaper flavor is too GOOD",
    images:[

    ],
    address:"Dave's Hot Chicken, 194 Albert St, East Lansing, MI 48823",
    coords:[42.73572030253766, -84.4825198477795],
    website:"https://restaurants.daveshotchicken.com/mi/east-lansing/best-hot-chicken-sandwich-on-albert-st/?utm_source=google&utm_medium=wiideman&utm_campaign=pageleap",
    price:"$-$$"
  },
  {
    title:"Steak & Shake",
    desc:"explanation needed?",
    images:[

    ],
    address:"Steak 'n Shake, 540 E Edgewood Blvd, Lansing, MI 48911",
    coords:[42.664409521301586, -84.5434774223574],
    website:"https://order.steaknshake.com/menu/steaknshake366",
    price:"$"
  },
  {
    title:"Wing Stop",
    desc:"Best Chicken Nuggies",
    images:[

    ],
    address:"Wingstop, 6333 S Cedar St, Lansing, MI 48911",
    coords:[42.66517967637217, -84.5407534516289],
    website:"https://www.wingstop.com/location/wingstop-2313-lansing-mi-48911/menu?y_source=1_MTA5NDU3NjAyMi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
    price:"$"
  },
  {
    title:"King Ocean Crab",
    desc:"",
    images:[

    ],
    address:"King Ocean Crab, 727 E Miller Rd, Lansing, MI 48911",
    coords:[42.66960793198666, -84.54202529063895],
    website:"https://kingoceancrab.net/menu",
    price:"$$-$$$"
  },
  {
    title:"One North Kitchen",
    desc:"",
    images:[

    ],
    address:"One North Kitchen & Bar, 5001 W Saginaw Hwy, Lansing, MI 48917",
    coords:[42.740535781737044, -84.62006247777502],
    website:"https://onenorthdining.com/lansingmi",
    price:"$$-$$$"
  },
  {
    title:"Hot Pot",
    desc:"",
    images:[

    ],
    address:"",
    coords:[],
    website:"",
    price:"$$-$$$"
  },
  {
    title:"Sushi",
    desc:"",
    images:[

    ],
    address:"",
    coords:[],
    website:"",
    price:"$$-$$$"
  },
  {
    title:"Tacos",
    desc:"",
    images:[

    ],
    address:"",
    coords:[],
    website:"",
    price:"$$-$$$"
  },

];

const drinkData = [
  {
    title: "Wagon Whisked",
    desc: "NOMNOM",
    address: "WagonWhisked, W Warren Ave, Dearborn, MI 48126",
    coords: [42.34372924154586, -83.19404431936651],
    website: "https://www.instagram.com/wagonwhisked/?hl=en",
    price: "$-$$",
    images: [
      "/img/people1.png",
      "/img/matcha1.jpg",
      "/img/drink1c.jpg"
    ],
  },
  {
    title: "Premium Matcha Maiko",
    desc: "Get matcha iced and the icecream version and ube icecream is soo good",
    address: "5082 Rochester Rd, Troy, MI 48085",
    coords: [42.59831407906098, -83.11033801122274],
    website: "https://www.matchacafe-maiko.com/eng/menu/",
    price: "$",
    images: [
      "img/matchamaiko1.jpg",
      "img/matcha2.jpg",
      "img/matcha3.jpg"],
  },
   {
    title: "Small World Coffee",
    desc: "Pop up shop with limited openings",
    address: "2895 E Grand Blvd, Detroit, MI 48202",
    coords: [42.37815119549004, -83.05604894635572],
    website: "https://smlwrld.square.site/#44NLYL4GIY4YRKPBJKQADKMY",
    price: "$",
    images: [
      "img/smll1.png",
      "img/smll2.png",
      "img/smll3.png"
    ],
  },
  {
    title: "Umai Cafe",
    desc: "We are dedicated to bountiful waffles and decadent sushi at our warm and cozy cafe.",
    address: "3277 Rochester Rd, Troy, MI 48083",
    coords: [42.56736866391196, -83.12908862350716],
    website: "https://umaicafe.square.site/",
    price: "$-$$",
    images: [
      "img/umai2.png",
      "img/umai3.png",
      "img/umai4.png"
    ],
  },
  {
    title: "Utopia Coffee",
    desc: "Blending tradition with innovation for your perfect cup of coffee  ",
    address: "766 W Big Beaver Rd, Troy, MI 48084",
    coords: [42.56300875315195, -83.16403909538454],
    website: "https://utopia-coffee.menu-world.com/menu",
    price: "$-$$",
    images: [
      "img/utopia1.png",
      "img/utopia2.png"
    ],
  },

   {
    title: "A-Ok Cafe (inside sommerset mall)",
    desc: "in SOmmerset mall the wiener dog logo ",
    address: "2800 W Big Beaver Rd, Troy, MI 48084",
    coords: [42.563037790158354, -83.18463259259961],
    website: "https://www.instagram.com/a.okcafe/?hl=en",
    price: "$-$$",
    images: [
      "img/ok1.png",
      "img/ok2.png",
      "img/ok3.png"
    ],
  },

  {
    title: "Experience Muse",
    desc: "where andy live ",
    address: "2133 15 Mile Rd, Sterling Heights, MI 48310",
    coords: [42.55282881432926, -83.0786198707082],
    website: "https://www.instagram.com/experience_muse/?hl=en",
    price: "$-$$",
    images: [
      "img/emuse2.png",
      "img/emuse3.png",
      "img/emuse4.png",
      "img/emuse5.png"
    ],
  },

  {
    title: "Cafe Sous Terre",
    desc: "Serious coffee, serious cocktAils, delicious French food and fresh bagels ",
    address: "445 W Forest Ave, Detroit, MI 48201 ",
    coords: [42.35370601847352, -83.06629895398818],
    website: "https://www.cafesousterre.com/menu/",
    price: "$-$$",
    images: [
      "img/sous2.png",
      "img/sous3.png",
      "img/sous4.png",
    ],
  },
  
  // …add entries index 2–11 here…
];

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav li");
  const content  = document.getElementById("content");

  // 1) Nav click handlers
  navLinks.forEach(link =>
    link.addEventListener("click", () => {
      const page = link.dataset.page;
      setActiveTab(link);
      loadPage(page, true);
    })
  );

  // 2) Handle back/forward buttons
  window.addEventListener("popstate", e => {
    const page = (e.state && e.state.page) || "home";
    const tab  = document.querySelector(`nav li[data-page="${page}"]`);
    setActiveTab(tab);
    loadPage(page, false);
  });

  // 3) Initial load (read from URL hash or default to home)
  const initPage = location.hash.replace("#", "") || "home";
  const initTab  = document.querySelector(`nav li[data-page="${initPage}"]`)
                 || document.querySelector('nav li[data-page="home"]');
  setActiveTab(initTab);
  loadPage(initPage, false);
});

function loadPage(page, pushHistory = true) {
  const content = document.getElementById("content");
  // fade-out
  content.classList.remove("visible");

  // wait for CSS transition
  setTimeout(() => {
    if (pageCache[page]) {
      render(pageCache[page], page, pushHistory);
    } else {
      fetch(`${page}.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Cannot load ${page}.html`);
          return res.text();
        })
        .then(html => {
          pageCache[page] = html;
          render(html, page, pushHistory);
        })
        .catch(err => {
          content.innerHTML = `<p style="color:red">${err.message}</p>`;
          content.classList.add("visible");
        });
    }
  }, 300);
}

function render(html, page, pushHistory) {
  const content = document.getElementById("content");

  if (pushHistory) {
    history.pushState({ page }, "", `#${page}`);
  }

  content.innerHTML = html;

  // Fade-in after DOM is updated
  setTimeout(() => {
    content.classList.add("visible");

    // Section-specific initialization
    if (page === "food") initFoodSection();
    if (page === "drinks") initDrinksSection();
    if (page === "activities") initActivitiesSection();
  }, 10);
}



function setActiveTab(el) {
  document.querySelectorAll("nav li").forEach(li => li.classList.remove("active"));
  if (el) el.classList.add("active");
}

function initFoodSection() {
  const cards   = document.querySelectorAll(".food-card");
  const modal   = document.getElementById("food-modal");
  const overlay = modal.querySelector(".modal-overlay");
  const closeBtn= modal.querySelector(".modal-close");
  const titleEl = document.getElementById("modal-title");
  const descEl  = document.getElementById("modal-desc");
  const imageEl = document.getElementById("modal-image");
  const spinner = document.getElementById("image-spinner");
  const prevBtn = modal.querySelector(".gallery-arrow.prev");
  const nextBtn = modal.querySelector(".gallery-arrow.next");

  let currentIdx = 0;
  let currentImg = 0;

  function openModal(idx) {
  currentIdx = parseInt(idx, 10);
  currentImg = 0;
  const item = foodData[currentIdx];

  titleEl.textContent = item.title;
  descEl.textContent  = item.desc;
  showImage();
  modal.classList.remove("hidden");

  // Price tier (💲 emojis with glow if styled in CSS)
  const emojiPrice = item.price.replace(/\$/g, "💲");
  document.getElementById("modal-price").innerHTML = `<span>${emojiPrice}</span>`;

  // Website link
  const linkEl = document.getElementById("modal-link");
  linkEl.href = item.website;
  linkEl.textContent = "View Menu & Info";

  // Address
const addressEl = document.getElementById("modal-address-link");
addressEl.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address)}`;
addressEl.textContent = item.address;



  // Map
  initMap(item.coords);
}



  function initMap([lat, lng]) {
  // destroy old map if exists
  if (window.modalMap) window.modalMap.remove();

  // create map instance
  const map = L.map("modal-map", { zoomControl: false }).setView([lat, lng], 15);
  window.modalMap = map; // store globally so you can remove next time

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
}


  function closeModal() {
    modal.classList.add("hidden");
    if (window.modalMap) {
    window.modalMap.remove();
    delete window.modalMap;
  }
}

  function showImage(delta = 0) {
    const item = foodData[currentIdx];
    currentImg = (currentImg + delta + item.images.length) % item.images.length;

    // show spinner, hide img
    spinner.classList.remove("hidden");
    imageEl.classList.add("hidden");

    imageEl.onload = () => {
      spinner.classList.add("hidden");
      imageEl.classList.remove("hidden");
    };

    imageEl.src = item.images[currentImg];
  }

  // Attach listeners
  cards.forEach(card =>
    card.addEventListener("click", () => openModal(card.dataset.index))
  );
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => showImage(-1));
  nextBtn.addEventListener("click", () => showImage(+1));
}

function initDrinksSection() {
  
  const cards   = document.querySelectorAll(".drink-card");
  const modal   = document.getElementById("food-modal");
  const overlay = modal.querySelector(".modal-overlay");
  const closeBtn= modal.querySelector(".modal-close");
  const titleEl = document.getElementById("modal-title");
  const descEl  = document.getElementById("modal-desc");
  const imageEl = document.getElementById("modal-image");
  const spinner = document.getElementById("image-spinner");
  const prevBtn = modal.querySelector(".gallery-arrow.prev");
  const nextBtn = modal.querySelector(".gallery-arrow.next");

  let currentIdx = 0;
  let currentImg = 0;

  function openModal(idx) {


    currentIdx = parseInt(idx, 10);
    currentImg = 0;
    const item = drinkData[currentIdx];

    titleEl.textContent = item.title;
    descEl.textContent  = item.desc;

    // address + website
    const linkEl = document.getElementById("modal-link");
    linkEl.href = item.website;
    linkEl.textContent = "View Menu & Info";

    const addressEl = document.getElementById("modal-address-link");
    addressEl.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address)}`;
    addressEl.textContent = item.address;

    // emoji price tier
    const emojiPrice = item.price.replace(/\$/g, "🍸");
    document.getElementById("modal-price").innerHTML = `<span>${emojiPrice}</span>`;

    // map
    initMap(item.coords);

    // image gallery
    showImage();
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    if (window.modalMap) {
      window.modalMap.remove();
      delete window.modalMap;
    }
  }

  function showImage(delta = 0) {
    const item = drinkData[currentIdx];
    currentImg = (currentImg + delta + item.images.length) % item.images.length;

    spinner.classList.remove("hidden");
    imageEl.classList.add("hidden");

    imageEl.onload = () => {
      spinner.classList.add("hidden");
      imageEl.classList.remove("hidden");
    };

    imageEl.src = item.images[currentImg];
  }

  cards.forEach(card =>
    card.addEventListener("click", () => openModal(card.dataset.index))
  );
  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => showImage(-1));
  nextBtn.addEventListener("click", () => showImage(+1));
}

function initMap([lat, lng]) {
  if (window.modalMap) window.modalMap.remove();

  const map = L.map("modal-map", { zoomControl: false }).setView([lat, lng], 15);
  window.modalMap = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
}


