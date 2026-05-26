document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    const modifiedElement = document.getElementById('lastModified');
    const windChillElement = document.getElementById('wind-chill');
    const temperature = 28;
    const windSpeed = 12;

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    function calculateWindChill(tempCelsius, speedKmh) {
        return 13.12 + 0.6215 * tempCelsius - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempCelsius * Math.pow(speedKmh, 0.16);
    }

    const windChill = (temperature <= 10 && windSpeed > 4.8)
        ? `${Math.round(calculateWindChill(temperature, windSpeed))}°C`
        : 'N/A';

    if (windChillElement) {
        windChillElement.textContent = windChill;
    }
});
