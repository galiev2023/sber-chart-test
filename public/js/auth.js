const loginForm = document.getElementById('loginForm');
const statusDiv = document.querySelector('.status');
const loginButton = document.getElementById('loginButton');
const loginBtnText = loginButton.querySelector('.login-btn-text');
const spinner = loginButton.querySelector('.spinner');

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    statusDiv.style.display = 'none';
    loginBtnText.style.display = 'none';
    e.target.login.setAttribute("disabled", "");
    e.target.password.setAttribute("disabled", "");
    spinner.classList.add("active");

    const login = e.target.login.value;
    const password = e.target.password.value;

    try {
        // Send login data via an AJAX POST request
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        const result = await response.json();

        // Update the status message on the page
        setTimeout(() => {
            if (result.success) {
                statusDiv.style.display = 'none';
                window.location.href = '/service';
            } else {
                statusDiv.style.display = 'block';
            }
        }, 1500);

    } catch (error) {
        statusDiv.textContent = 'Ошибка сервера.';
        statusDiv.style.display = 'block';
    } finally {
        setTimeout(() => {
            e.target.login.removeAttribute("disabled");
            e.target.password.removeAttribute("disabled");
            // Hide spinner
            spinner.classList.remove("active");
            loginBtnText.style.display = 'block';
        }, 1500);
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.input-container input');

    inputs.forEach((input) => {
        // Check if the input has a value (for autofill or prefilled data)
        if (input.value) {
            input.classList.add('filled');
        }

        // Add event listeners for focus and blur
        input.addEventListener('focus', () => {
            input.classList.add('filled');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('filled');
            }
        });
    });
});