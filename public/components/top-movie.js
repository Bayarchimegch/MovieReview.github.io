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
    display: inline-block;
    width: 180px; /* 40px-ээр багасгав */
    background-color: var(--secondary);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: var(--textPrimary);
    padding: 10px;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card .imagee img {
    width: 100%;
    max-height: 210px; /* 40px-ээр багасгав */
    object-fit: contain;
    display: block;
}

.card h4 {
    font-size: 16px; /* Анхны хэмжээ */
    height: 30px;
    padding: 10px;
    margin: 0;
    overflow: hidden;
    word-wrap: break-word; /* Шилжиж байх үед үг хугарах */
    word-break: break-word; /* Урт үг болон текстийг дараагийн мөрөнд шилжүүлэх */
    white-space: normal; /* Текстийг шинэ мөр рүү шилжүүлнэ */
}


/* ✅ Дэлгэцийн хэмжээнээс хамаарч үсгийн хэмжээ багасгах */
@media (max-width: 1200px) {
    .card {
        max-width: 160px;
    }
    .card .imagee img {
        max-height: 190px;
    }
    .card h4 {
        font-size: 12px; 
    }
}

@media (max-width: 992px) {
    .card {
        max-width: 140px;
    }
    .card .imagee img {
        max-height: 170px;
    }
    .card h4 {
        font-size: 12px; 
    }
}

@media (max-width: 768px) {
    .card {
        max-width: 120px;
    }
    .card .imagee img {
        max-height: 150px;
    }
    .card h4 {
        font-size: 10px;
    }
}

@media (max-width: 576px) {
    .card {
        max-width: 100px;
    }
    .card .imagee img {
        max-height: 130px;
    }
    .card h4 {
        font-size: 10px; 
    }
}

@media (max-width: 400px) {
    .card {
        max-width: 80px;
    }
    .card .imagee img {
        max-height: 110px;
    }
    .card h4 {
        font-size: 8px; 
    }
}

                </style>
                <div class="movies">
                    ${movies
                      .map(
                        (movie) => ` 
                        <a href="info.html?id=${movie.id}" class="card">
                            <div class="imagee">
                                <img
                                src="${movie.posterUrl}" alt="${movie.title}"
                                />
                            </div>
                            <h4>${movie.title}</h4>
                        </a>
                        
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
