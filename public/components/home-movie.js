class HomeMovie extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Create template for component structure
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
                     .card {
    display: inline-block;
    width: 160px; 
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
    max-height: 180px; /* 40px-ээр багасгав */
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
        <a href="#" class="card">
          <div class="imagee">
            <img src="" alt="" />
          </div>
          <h4></h4> <!-- Movie Title -->
        </a>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(); // Re-render if attributes change
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
      const cardElement = this.shadowRoot.querySelector(".card");
      const imgElement = this.shadowRoot.querySelector("img");
      const h4Title = this.shadowRoot.querySelector("h4");
      const pDescription = this.shadowRoot.querySelector("p");

      imgElement.src = posterUrl;
      imgElement.alt = title;
      h4Title.textContent = title;
      pDescription.textContent = `${description}\nRelease Year: ${releaseYear}, Genre: ${genre.join(
        ", "
      )}, Rating: ${rating}`;

      // Ensure content is correctly rendered
      if (!h4Title.assignedNodes().length) {
        h4Title.textContent = title;
      }

      if (!pDescription.assignedNodes().length) {
        pDescription.textContent = `${description}\nRelease Year: ${releaseYear}, Genre: ${genre.join(
          ", "
        )}, Rating: ${rating}`;
      }
    }
  }
}

// Define the custom element
customElements.define("home-movie", HomeMovie);
