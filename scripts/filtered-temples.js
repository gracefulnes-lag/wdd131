document.addEventListener('DOMContentLoaded', () => {
    // Footer date info
    const yearElement = document.getElementById('current-year');
    const modifiedElement = document.getElementById('lastModified');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (modifiedElement) modifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // Menu toggle (reuse behavior from original)
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('site-nav');
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            siteNav.classList.toggle('open');
            menuToggle.textContent = isOpen ? '☰' : '✕';
        });
    }

    // Temple data array (local image paths) - added at least 3 extra entries
    const temples = [
        { name: "Salt Lake Temple", location: "Salt Lake City, Utah", dedicated: "April 6, 1893", area: 253000, imageUrl: "images/Salt Lake Temple.jpg" },
        { name: "Utah Temple", location: "St. George, Utah", dedicated: "April 6, 1877", area: 15000, imageUrl: "images/Utah temple.jpg" },
        { name: "London England Temple", location: "London, England", dedicated: "September 7, 1958", area: 42000, imageUrl: "images/London Temple.jpg" },
        { name: "New Layton Temple", location: "Layton, Utah", dedicated: "October 27, 2020", area: 88000, imageUrl: "images/New Layton Temple.jpg" },
        { name: "Washington D.C. Temple", location: "Potomac, Maryland", dedicated: "November 19, 1974", area: 56488, imageUrl: "images/Washington D.C Temple.jpg" },
        { name: "Gilbert Arizona Temple", location: "Gilbert, Arizona", dedicated: "May 2, 2014", area: 15000, imageUrl: "images/Gilbert arizona Temple.jpg" },
        { name: "Colorado Springs Temple", location: "Colorado Springs, Colorado", dedicated: "May 19, 2012", area: 8800, imageUrl: "images/Colordo Springs Colorado Temple.jpg" },
        { name: "Provo Utah Temple", location: "Provo, Utah", dedicated: "February 26, 1972", area: 25000, imageUrl: "images/Provo Utah Temple.jpg" },
        { name: "Paris France Temple", location: "Le Chesnay, France", dedicated: "May 17, 2017", area: 20000, imageUrl: "images/Paris France Temple.jpg" }
    ];

    const grid = document.getElementById('temple-grid');

    function createTempleCard(t) {
        const fig = document.createElement('figure');

        const img = document.createElement('img');
        img.src = t.imageUrl;
        img.alt = `${t.name} in ${t.location}`;
        img.loading = 'lazy';

        const caption = document.createElement('figcaption');
        caption.innerHTML = `<strong>${t.name}</strong><br>${t.location}<br>Dedicated: ${t.dedicated}<br>Area: ${t.area.toLocaleString()} sq ft`;

        fig.appendChild(img);
        fig.appendChild(caption);
        return fig;
    }

    function renderList(list) {
        if (!grid) return;
        grid.innerHTML = '';
        if (list.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No temples match that filter.';
            grid.appendChild(p);
            return;
        }
        const fragment = document.createDocumentFragment();
        list.forEach(t => fragment.appendChild(createTempleCard(t)));
        grid.appendChild(fragment);
    }

    // Initial render (all temples)
    renderList(temples);

    // Filtering
    const filterLinks = document.querySelectorAll('#site-nav a[data-filter]');
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            switch (filter) {
                case 'old':
                    renderList(temples.filter(t => {
                        const year = new Date(t.dedicated).getFullYear();
                        return year < 1900;
                    }));
                    break;
                case 'new':
                    renderList(temples.filter(t => {
                        const year = new Date(t.dedicated).getFullYear();
                        return year > 2000;
                    }));
                    break;
                case 'large':
                    renderList(temples.filter(t => t.area > 90000));
                    break;
                case 'small':
                    renderList(temples.filter(t => t.area < 10000));
                    break;
                default:
                    renderList(temples);
            }
            // Close nav for small screens
            if (siteNav && siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.textContent = '☰';
                }
            }
        });
    });
});
