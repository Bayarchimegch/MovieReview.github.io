class TopMovie extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'}); // using shadow DOM for encapsulation
    }

    static get observedAttributes() {
        return ['id','title','description','releaseYear','genre','posterUrl','rating',];
    }

    connectedCallback() {
        //render when content connected to the dom
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Only re-render if the relevant attributes change
        if (oldValue !== newValue) {
            this.render(); // Re-render the component when data changes
        }
    }
    render() {
        const id = this.getAttribute('id');
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const releaseYear = this.getAttribute('releaseYear');
        const genre = this.getAttribute('genre') ? this.getAttribute('genre').split(',') : [];
        const posterUrl = this.getAttribute('posterUrl');
        const rating = this.getAttribute('rating');

        // Only render if required attributes are present
        if (id && title && posterUrl) {
            // The movie details in an array format
            const movies = [{
                id, title, description, releaseYear, genre, posterUrl, rating
            }];

            this.shadowRoot.innerHTML = `
                <style>
                    .movies {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        gap: 5px;
                        margin: 0 auto;
                    }

                    .movies img {
                        width: 100%;
                        height: 650px;
                        width: 450px;
                        border: 1px solid black;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    /* Additional styling for hover effects on images */
                    .movies img:hover {
                        transform: scale(1.05);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    .movies-title {
                        margin-left: 3%;
                    }

                    /* Center movie title text */
                    article h3 {
                        text-align: center;
                        margin: 10px 0; /* Optional: Adjust space around the title */
                        font-size: 18px;
                        color: #333;
                        font-weight: bold;
                    }
                </style>
                <div class="movies">
                    ${movies.map(movie => ` 
                        <article>
                            <img src="${movie.posterUrl}" alt="${movie.title}" />
                            <h3>${movie.title}</h3>
                        </article>
                    `).join('')}
                </div>
            `;
        }
    }

}

// Define the custom element
customElements.define('top-movie', TopMovie);
