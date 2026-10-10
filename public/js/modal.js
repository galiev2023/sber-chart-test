const modalBackdrop = document.getElementById('modalBackdrop');
const openModalButton = document.querySelector('.modal-open');
const closeModalButtons = document.querySelectorAll('.modal-close');

if(modalBackdrop) {

    // Open the modal
    if(openModalButton) {
        openModalButton.addEventListener('click', () => {
            modalBackdrop.style.display = 'flex';
        });
    }

    // Close the modal
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            modalBackdrop.style.display = 'none';
        });
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            modalBackdrop.style.display = 'none';
        }
    });

}

