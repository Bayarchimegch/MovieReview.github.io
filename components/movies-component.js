class MovieList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Initial render when the component is connected to the DOM
        this.render();
    }

    // Function to render movies based on data passed
    renderMovies(moviesToRender) {
        const movieListSection = this.shadowRoot.querySelector('.movie-list');
        movieListSection.innerHTML = ''; // Clear the existing movies

        // Check if no movies are available
        if (moviesToRender.length === 0) {
            const noResultsMessage = document.createElement('h1');
            noResultsMessage.textContent = 'Илэрц олдсонгүй.'; // "No results found"
            movieListSection.appendChild(noResultsMessage);
        } else {
            // Add filtered movies to the DOM
            moviesToRender.forEach(movie => {
                const movieArticle = document.createElement('article');
                movieArticle.classList.add('movie');
                movieArticle.setAttribute('data-genre', movie.genre.join(', '));

                movieArticle.innerHTML = `
                    <img src="${movie.posterUrl}" alt="${movie.title}" />
                    <h2>${movie.title}</h2>
                    <p>${movie.genre.join(', ')}</p>
                `;

                // Add click event listener to navigate to details page
                movieArticle.addEventListener('click', () => {
                    window.location.href = `movie-detail.html?id=${movie.id}`;
                });

                movieListSection.appendChild(movieArticle);
            });
        }
    }

    // Set the movies property to trigger re-rendering
    set movies(moviesData) {
        this.renderMovies(moviesData);
    }

    // Template for the component
    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .movie-list {
                    margin-left: 5%;
                    width: 90%;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                }

                .movie {
                    background-color: white;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .movie img {
                    width: 100%;
                    max-width: 250px;
                    height: auto;
                    border-radius: 8px;
                }

                .movie h2 {
                    margin-top: 10px;
                    font-size: 1.2rem;
                    color: #333;
                }

                .movie p {
                    font-size: 1rem;
                    color: #668;
                }

                /* Hover effect for movies */
                .movie:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            </style>
            <div class="movie-list">
                
                <slot></slot>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Define the custom element
customElements.define('movie-list', MovieList);
