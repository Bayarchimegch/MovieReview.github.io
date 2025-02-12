class TopMovie extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // using shadow DOM for encapsulation
  }

  static get observedAttributes() {
    return [
      "id",
      "title",
      "description",
      "releaseYear",
      "genre",
      "posterUrl",
      "rating",
    ];
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
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const releaseYear = this.getAttribute("releaseYear");
    const genre = this.getAttribute("genre")
      ? this.getAttribute("genre").split(",")
      : [];
    const posterUrl = this.getAttribute("posterUrl");
    const rating = this.getAttribute("rating");

    // Only render if required attributes are present
    if (id && title && posterUrl) {
      // The movie details in an array format
      const movies = [
        {
          id,
          title,
          description,
          releaseYear,
          genre,
          posterUrl,
          rating,
        },
      ];

      this.shadowRoot.innerHTML = `
  <style>
    .card {
      display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: space-between; /* Push the button to the bottom */
  width: 200px;
  min-height: 400px; /* Fixed height for uniform card size */
  text-align: center;
  border: 2px solid var(--ligthPrimary);
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .card .imagee img {
      width: 100%;
  height: 300px; /* Fixed height for all images */
  object-fit: cover; /* Ensures images maintain aspect ratio while covering the container */
  border-radius: 5px;
    }

    .card h4 {
      font-size: 16px;
      height: 30px;
      padding: 10px;
      margin: 0;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
      color: var(--textPrimary)
    }

    .watchlist-btn {
  color: var(--textPrimary);
  background-color: var(--containerBg);
  border-color: var(--inputBorder);
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
}

    .watchlist-btn:hover {
  background-color: var(--buttonHoverBg);
    }

    /* Responsive styles (unchanged) */
    @media (max-width: 1200px) { .card { max-width: 160px; } }
    @media (max-width: 992px) { .card { max-width: 140px; } }
    @media (max-width: 768px) { .card { max-width: 120px; } }
    @media (max-width: 576px) { .card { max-width: 100px; } }
    @media (max-width: 400px) { .card { max-width: 80px; } }
  </style>
  <div class="movies">
    ${movies
      .map(
        (movie) => ` 
        <div class="card">
          <div class="imagee">
            <img src="${movie.posterUrl}" alt="${movie.title}" />
          </div>
          <h4>${movie.title}</h4>
          <button class="watchlist-btn" data-id="${movie.id}">
            Жагсаалтанд нэмэх
          </button>
        </div>
      `
      )
      .join("")}
  </div>
`;
    }
  }
}

// Define the custom element
customElements.define("top-movie", TopMovie);
