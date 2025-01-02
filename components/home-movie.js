class HomeMovie extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'}); // using shadow DOM for encapsulation

        //creating a template elements fot the components structure
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .movie-item {
                    text-align: center;
                    overflow: hidden; /* Hide overflow during hover */
                    position: relative;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    padding: 10px;
                    border-radius: 8px;
                    background: #fff;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }

                .movie-item img {
                    width: 100%;
                    max-width: 200px;
                    height: auto;
                    border-radius: 8px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .movie-item h4 {
                    margin-top: 8px;
                    font-size: 16px;
                    color: #333;
                }

                .movie-item p {
                    font-size: 14px;
                    color: #666;
                    margin-top: 10px;
                }

                .movie-item:hover img {
                    transform: scale(1.1); /* Zoom effect on image */
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow effect */
                }

                .movie-item:hover {
                    transform: translateY(-5px); /* Slight lift effect */
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Add shadow to the whole element */
                }

                .movie-item h4:hover {
                    color: #f39c12; /* Change title color on hover */
                    cursor: pointer; /* Add a pointer cursor to indicate clickable title */
                }
            </style>
            <article class="movie-item">
                <img src="" alt="" />
                <h4><slot name="title"></slot></h4> <!-- Slot for title -->
                <p><slot name="description"></slot></p> <!-- Slot for description -->
            </article>
        `;

        // Attach the template content to the shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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
            const imgElement = this.shadowRoot.querySelector('img');
            const slotTitle = this.shadowRoot.querySelector('slot[name = "title"]');
            const slotDescription = this.shadowRoot.querySelector('slot[name = "description"]');
            const descriptionParagraph = this.shadowRoot.querySelector('p');

            imgElement.src = posterUrl;
            imgElement.alt = title;

    
            slotTitle.textContent = title;
            slotDescription.textContent = description;
            description.textContent = `Release Year: ${releaseYear}, Genre: ${genre.join(', ')}`;
            description.textContent += `\nRating: ${rating}`;

            //setting the default value for title and description
            if(!slotTitle.assignedNodes().length){
                slotTitle.textContent = title;
            }

            if(!slotDescription.assignedNodes().length && description){
                descriptionParagraph.textContent = description;
            }
        }
    }

}

// Define the custom element
customElements.define('home-movie', HomeMovie);
