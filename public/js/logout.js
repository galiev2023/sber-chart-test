const logoutBtn = document.getElementById('logout');

if(logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            // Send login data via an AJAX POST request
            const response = await fetch('/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = "/";
            } else {
                console.log(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    });
}
