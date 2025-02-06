class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background-color: rgba(15, 15, 15, 0.10);
          box-shadow: 0px 4px 4px rgba(240, 251, 255, 0.20);
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo img {
          width: 120px;
          height: 111111111111auto;
        }
        .search-field {
          flex: 1;
          margin: 0 1.5rem;
        }
        nav {
          display: flex;
          gap: 1.5rem;
        }
        nav a {
          text-decoration: none;
          font-size: 1rem;
          color: #333;
          transition: color 0.3s;
        }
        nav a:hover {
          color: #007BFF;
        }
        .auth-buttons {
          display: flex;
          gap: 1rem;
        }
          search-field input {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 2px solid #EE5151; /* Change border color to primary color */
          background-color: white;  /* Inside color is white */
          border-radius: 0.5rem;
        }

        .auth-buttons button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          color: white;
          background-color: #EE5151; /* Button background color */
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .auth-buttons button:hover {
          background-color: #D14D4D; /* Hover color slightly darker */
        }

        .auth-buttons .signup {
          background-color: #28a745;
        }

        .auth-buttons .signup:hover {
          background-color: #218838;
        }

      </style>
      <header>
        <!-- Logo -->
        <div class="logo">
          <a href="index.html">
            <img src="https://i.imgur.com/l40T1lI.png" alt="Logo">
          </a>
        </div>
        
        <!-- Search Field -->
        <div class="search-field">
          <input type="text" placeholder="Search...">
        </div>

        <!-- Navigation Links -->
        <nav>
          <a href="movies.html">Movies</a>
          <a href="contact.html">Contacts</a>
        </nav>

        <!-- Authentication Buttons -->
        <div class="auth-buttons">
          <button class="login">Log In</button>
          <button class="signup">Sign Up</button>
        </div>
      </header>
    `;
  }
}

// Register the component
customElements.define("header-component", HeaderComponent);
