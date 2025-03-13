function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === name) return cookie[1];
    }
    return null;
}

function applyDarkMode() {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
    document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
    document.body.classList.add('bg-dark', 'text-light');
    document.querySelector('.sun').style.display = 'none';  
    document.querySelector('.moon').style.display = 'block';
    document.getElementById('checkbox').checked = true;  
    setCookie("theme", "dark", 365);
}

function applyLightMode() {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.querySelector('nav').classList.add('navbar-light');
    document.querySelector('nav').classList.remove('navbar-dark', 'bg-dark');
    document.querySelector('nav').classList.add('bg-light');
    document.body.classList.remove('bg-dark', 'text-light');
    document.querySelector('.sun').style.display = 'block';  
    document.querySelector('.moon').style.display = 'none';
    document.getElementById('checkbox').checked = false;  
    setCookie("theme", "light", 365);
}

function toggleDarkMode() {
    let theme = document.documentElement.getAttribute('data-bs-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
        applyDarkMode();
    } else {
        applyLightMode();
    }
}

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    let savedTheme = getCookie("theme");
    if (savedTheme === "dark") {
        applyDarkMode();
    } else {
        applyLightMode();
    }
});

document.getElementById('checkbox').addEventListener('change', toggleDarkMode);
