const serviceForm = document.getElementById('serviceForm');
const selectContainer = document.querySelector('.select-container');
const selectItem = document.querySelector('.select-item');
const confirmBtn = document.getElementById('confirm');
const spinner = document.querySelector('.spinner');
const loginName = document.getElementById('login-name');

fetch('/api/data')
    .then((response) => response.json())
    .then((data) => {
        data.service.forEach((service, ind) => {
            // disabled selected
            selectItem.insertAdjacentHTML(
                'beforeend', '<option ' + ((ind === 0) ? 'disabled selected ' : '') + 'value="' + ((ind === 0) ? '' : service) + '">' + service + '</option>'
            );
        });

        selectItem.addEventListener('focus', () => {
            const firstOption = selectItem.querySelector('option[value=""]');
            if (firstOption) {
                firstOption.style.display = 'none'; // Hide the prompt
            }
        });

        selectItem.addEventListener('change',  () => {
            confirmBtn.removeAttribute('disabled');
        });

        serviceForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const chart = e.target.chart.value;

            try {
                const response = await fetch('/api/store', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ chart: chart }),
                });
                const result = await response.json();
                selectContainer.style.display = 'none';
                spinner.style.display = 'block';

            } catch (error) {
            } finally {
                // Update the status message on the page
                setTimeout(() => {
                    selectContainer.style.display = 'flex';
                    spinner.style.display = 'none';
                    if(loginName) {
                        loginName.innerText = chart;
                        loginName.setAttribute('data-chart', chart);
                    }

                    window.location.href = "/chart";
                }, 1500);
            }

        });
    });

