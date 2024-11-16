// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".mySlides");
  slides.forEach(slide => slide.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

// Scroll Animation
const sections = document.querySelectorAll('.animate');

window.addEventListener('scroll', function() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

// Map Initialization
function initMap() {
  const mapOptions = {
    zoom: 10,
    center: { lat: 40.7128, lng: -74.0060 }
  };
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

const updates = [
  "New food donation received from ABC Corp.",
  "Food delivery completed at Local Shelter.",
  "New volunteer drive scheduled for next Saturday.",
];

let updateIndex = 0;

function showNextUpdate() {
  updateIndex = (updateIndex + 1) % updates.length;
  const updatesList = document.getElementById("updatesList");
  const li = document.createElement("li");
  li.textContent = updates[updateIndex];
  updatesList.appendChild(li);
  if (updatesList.children.length > 5) {
    updatesList.removeChild(updatesList.children[0]);
  }
}

setInterval(showNextUpdate, 5000); // Show a new update every 5 seconds


// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent =
    document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// Food Waste Calculator
function calculateImpact() {
  const foodAmount = document.getElementById("foodAmount").value;
  if (foodAmount) {
    const meals = foodAmount * 5; // Assuming 1 kg feeds 5 people
    const co2Saved = (foodAmount * 0.8).toFixed(2); // CO2 saved per kg
    document.getElementById(
      "calculationResult"
    ).textContent = `With ${foodAmount} kg of food, you can serve ${meals} meals and save ${co2Saved} kg of CO2 emissions.`;
  } else {
    alert("Please enter a valid food weight!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pickDropForm');
  const trackingStatus = document.getElementById('trackingStatus');
  const mapContainer = document.getElementById('map');

  // Submit form and show tracking simulation
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const pickupAddress = document.getElementById('pickupAddress').value;
    const dropAddress = document.getElementById('dropAddress').value;
    const pickupTime = document.getElementById('pickupTime').value;

    trackingStatus.textContent = `Pickup scheduled from "${pickupAddress}" to "${dropAddress}" at ${pickupTime}. Tracking in progress...`;

    simulateTracking(mapContainer);
  });

  // Simulate live tracking
  function simulateTracking(mapContainer) {
    mapContainer.textContent = "Simulating real-time tracking...";
    mapContainer.style.backgroundColor = "#e0ffe0";
    mapContainer.style.display = "flex";
    mapContainer.style.justifyContent = "center";
    mapContainer.style.alignItems = "center";

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      mapContainer.textContent = `Driver is ${progress}% on the way to pick up your order.`;

      if (progress >= 100) {
        clearInterval(interval);
        mapContainer.textContent = "Driver has arrived at the pickup location!";
        trackingStatus.textContent = "Your request is being processed!";
      }
    }, 1000); // Update every second
  }
});

// Handle FAQ toggling
function toggleFaq(event) {
  const content = event.target.parentElement.nextElementSibling;
  content.style.display = content.style.display === "block" ? "none" : "block";
  event.target.textContent = event.target.textContent === "+" ? "-" : "+";
}

// Add a new FAQ
function addFaq() {
  const questionInput = document.getElementById("userQuestion");
  const answerInput = document.getElementById("userAnswer");

  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (question && answer) {
    const faqContainer = document.getElementById("faq-container");

    // Create FAQ item
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const faqHeader = document.createElement("h3");
    faqHeader.innerHTML = `${question} <span class="toggle">+</span>`;
    faqHeader.querySelector(".toggle").addEventListener("click", toggleFaq);

    const faqContent = document.createElement("p");
    faqContent.classList.add("faq-content");
    faqContent.style.display = "none";
    faqContent.textContent = answer;

    faqItem.appendChild(faqHeader);
    faqItem.appendChild(faqContent);

    faqContainer.appendChild(faqItem);

    // Clear inputs
    questionInput.value = "";
    answerInput.value = "";
  } else {
    alert("Please fill out both the question and answer fields.");
  }
}

// Attach toggle functionality to existing FAQs
document.querySelectorAll(".faq-item .toggle").forEach((toggle) => {
  toggle.addEventListener("click", toggleFaq);
});


// Logout Functionality
document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logout');

  logoutLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior

      // Redirect to the login page
      window.location.href = 'food management/codeash/index.html';
  });
});


