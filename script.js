

// Skeleton Screen UI shown for 3 seconds
setTimeout(() => {
    document.querySelectorAll('.skeleton').forEach((el) => el.style.display = 'none');
    document.querySelectorAll('.hidden').forEach((el) => el.style.display = 'block');
}, 1000);

// Function to check if page is scrolled and adjust the logo size
function checkScroll() {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('logo');
  let scrollPosition = window.scrollY;

//   Add/Remove 'scrolled' class based on scroll position
    if (scrollPosition > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Calculate new font size based on scroll position
    let newSize = 3 - (scrollPosition * 0.03); // Decrease by 0.03 rem for every 1px scrolled

    // Clamping the font size between 1.5rem and 3rem
    newSize = Math.max(1.5, newSize);
    newSize = Math.min(3, newSize);

    logo.style.fontSize = newSize + 'rem';
}

// Event Listener to check scroll position
window.addEventListener('scroll', checkScroll);


// -------------------------------------------------
// ------------------- Dark Mode -------------------
// -------------------------------------------------
const themeSwitcher = document.querySelector('.theme-switcher');

// Update Theme Icon
function darklightMode(newMode) {
    const currentFavicon = newMode === 'dark' ? 'fa-sun' : 'fa-moon';
    const newFavicon = newMode === 'dark' ? 'fa-moon' : 'fa-sun';
    const capitalized = newMode.charAt(0).toUpperCase() + newMode.slice(1)

    themeSwitcher.children[0].classList.replace(`${currentFavicon}`, `${newFavicon}`);
}

// Determines if Dark Mode is Enabled
function prefersDarkScheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Set Initial Theme
function setThemeBasedOnPreferences() {
    const isDarkMode = prefersDarkScheme();
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    darklightMode(currentTheme);
}

// Switch Theme
function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeMode = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', `${themeMode}`)
    localStorage.setItem('theme', `${themeMode}`);
    darklightMode(`${themeMode}`);
}

themeSwitcher.addEventListener('click', switchTheme);

// Check local Storage for Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        darklightMode(savedTheme);
    } else {
        setThemeBasedOnPreferences();
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreferences);

// Initialize Theme when the script loads
initializeTheme();
// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------