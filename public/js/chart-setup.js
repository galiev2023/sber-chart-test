// Fetch dataset and render the chart
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement, Tooltip, Legend, DoughnutController, ChartDataLabels);

fetch('/api/data')
    .then((response) => response.json())
    .then((data) => {
        const ctx = document.getElementById('chartCanvas').getContext('2d');

        // Examples Charts
        // 'census', 'ga', 'tourism'
        const selectChart = document.getElementById('login-name').getAttribute('data-chart');
        switch (selectChart) {
            case 'census':
                break;
            case 'ga':
                data.chart = data.chart2;
                break;
            case 'tourism':
                data.chart = data.chart3;
                break;
        }

        // Custom Plugin to Add Center Text
        const centerTextPlugin = {
            id: 'centerText',
            beforeDraw(chart) {
                const { width, height } = chart;
                const ctx = chart.ctx;

                // Save canvas state
                ctx.save();

                // Text 1: "text1"
                const text1 = data.sum.text;
                ctx.font = '12px SBSans'; // Font size 12px
                ctx.fillStyle = '#7D838A';  // Text color
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const text1Y = height / 2 - 10; // Move up by 10px for the first line
                ctx.fillText(text1, width / 2, text1Y);

                // Text 2: "text2"
                const text2 = data.sum.value;
                ctx.font = '600 16px SBSans'; // Font size 16px, weight 600
                ctx.fillStyle = '#1F1F22';  // Text color
                const text2Y = height / 2 + 10 + 5; // Move down by 10px and add 5px gap
                ctx.fillText(text2, width / 2, text2Y);

                // Restore canvas state
                ctx.restore();
            },
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.chart.map((item) => item.label),
                datasets: [
                    {
                        data: data.chart.map((item) => item.value),
                        backgroundColor: data.chart.map((item) => item.color),
                    },
                ],
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 50, // Add extra space on the left
                        right: 50, // Add extra space on the right
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: false, // Disable tooltips
                    },
                    legend: {
                        display: false, // Disable default legend
                    },
                    datalabels: {
                        color: data.chart.map((item) => item.color),
                        font: {
                            size: 12,
                        },
                        align: 'end', // Position the labels outside the chart
                        anchor: 'end', // Anchor the labels outside the chart
                        formatter: (value) => {
                            return `${value}%`; // Show value next to the label
                        },
                        offset: 1, // Adjust distance from the chart
                    },
                },
                cutout: '85%'
            },
            plugins: [ChartDataLabels ,centerTextPlugin], // Include the plugin
        });

        // Generate custom legend
        const legendContainer = document.getElementById('chartLegend');
        data.chart.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="legend-color" style="background-color: ${item.color};"></span>
                <span class="legend-text">
                    <span class="legend-text-label">${item.label}</span>
                    <span class="legend-text-value">${item.value}%</span>
                </span>
            `;
            legendContainer.appendChild(li);
        });
    });
