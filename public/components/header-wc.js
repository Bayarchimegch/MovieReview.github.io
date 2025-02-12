class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.#render();
    this.#loadTheme();
  }
  async #loadTheme() {
    await import("../js/theme.js").catch((err) =>
      console.error("Theme script алдаа:", err)
    );
    await import("../css/color.css").catch((err) =>
      console.error("Theme color алдаа:", err)
    );
  }
  #render() {
    this.innerHTML = `
      <style>
        .active{
    margin-left: 10%;
    margin-right: 10%;
    padding-left: 20px;
    padding-right: 20px;
}

header img {
    width: 150px;
}
header {
    background-color: var(--secondary);
    opacity: 0.9; 
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 2;
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px); 
    border-radius: 15px;
    box-shadow: 0px 4px 16px rgba(var(--background), 0.1);
}
header * {
    display: inline-flex;
}
nav{
   justify-content: space-between; 
   width: 100%;
}
header li {
    margin-left: 20px;
    margin-right: 20px;
   
    color: var(--textPrimary);
    font-weight: bold;
}
header li a {
    border-radius: 15px;
    color: var(--textPrimary);
    text-decoration: none;
    
    display: flex;
    align-items: center;
}
header li a:hover {
    color: var(--primary);
}

.search {
    border: none;
    border-radius: 15px;
    height: 30px;
    width: 400px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    
}
header li a:active {
    background-color: rgb(84, 75, 75);
    color: var(--textPrimary);
}

header nav label{
    color: var(--textPrimary);
    font-size: 2rem;
    display: none;
}

@media(max-width: 430px){
    header nav ul{
        position: fixed;
        top: 2.7rem;
        height: calc(100vh-100px);
        width: 80%;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    header nav ul.right{
        position: fixed;
        top: 12rem;
    }
    .menu{
        display: block;
    }
    header nav label{
        display: block;
        width: 100px;
        padding-left: 50%;
    } 
    header nav ul {
        display: none; 
    }

    header nav ul.active {
        display: flex; 
    }
    header nav ul {
        position: fixed;
        top: 60px; /* Header-ийн доор байрлах */
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        flex-direction: column;
        align-items: center;
        padding: 35px 0;
        border-radius: 10px;
        margin: 0 !important;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    header nav ul.active {
        display: flex;
        opacity: 1;
        
    }

    /* Меню доторх линкүүд */
    header li a {
        color: white; 
        padding: 10px 20px;
        display: block;
        text-align: center;
        width: 100%;
    }
    .search {
        width: 90%;
        max-width: 300px;
        padding: 8px;
        border-radius: 5px;
        border: none;
    }
    .menu {
        color: var(--textSecondary); 
        cursor: pointer;
    }
        .active{
    margin-left: 0;
    margin-right: 0;
}
}
@media(max-height: 430px){
    header nav ul{
        position: fixed;
        top: 2.7rem;
        height: calc(100vh-100px);
        width: 80%;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    header nav ul.right{
        position: fixed;
        top: 12rem;
    }
    header nav label{
        display: block;
        width: 100px;
    } 
    header nav ul {
        display: none; 
    }

    header nav ul.active {
        display: flex; 
    }
    header nav{
        display: flex;
        justify-content: end;
    }
    .menu{
        display: flex;
        justify-content: center;
    }
    header nav ul {
        position: fixed;
        top: 60px; /* Header-ийн доор байрлах */
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        flex-direction: column;
        align-items: center;
        padding: 35px 0;
        border-radius: 10px;
        margin: 0 !important;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    header nav ul.active {
        display: flex;
        opacity: 1;
        
    }

    /* Меню доторх линкүүд */
    header li a {
        color: white; 
        padding: 10px 20px;
        display: block;
        text-align: center;
        width: 100%;
    }
    .search {
        width: 90%;
        max-width: 300px;
        padding: 8px;
        border-radius: 5px;
        border: none;
    }
    .menu {
        color: var(--textSecondary); 
        cursor: pointer;
    }
        .active{
    margin-left: 0;
    margin-right: 0;
    padding-left: 20px;
    padding-right: 20px;
}
    
}
@media (min-width: 431px) and (max-width: 1420px){
    header nav ul{
        position: fixed;
        top: 2.7rem;
        height: calc(100vh-100px);
        width: 80%;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    header nav ul.right{
        position: fixed;
        top: 12rem;
    }
    header nav label{
        display: block;
        width: 100px;
    } 
    header nav ul {
        display: none; 
    }
    header nav ul.active {
        display: flex; 
    }
    header nav{
        display: flex;
        justify-content: end;
    }
    .menu{
        display: flex;
        justify-content: center;
    }

    header nav ul {
        position: fixed;
        top: 60px; /* Header-ийн доор байрлах */
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        flex-direction: column;
        align-items: center;
        padding: 35px 0;
        border-radius: 10px;
        margin: 0 !important;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    header nav ul.active {
        display: flex;
        opacity: 1;
        
    }

    /* Меню доторх линкүүд */
    header li a {
        color: white; 
        padding: 10px 20px;
        display: block;
        text-align: center;
        width: 100%;
    }
    .search {
        width: 90%;
        max-width: 300px;
        padding: 8px;
        border-radius: 5px;
        border: none;
    }
    .menu {
        color: var(--textSecondary); 
        cursor: pointer;
    }
        .active{
    margin-left: 5%;
    margin-right: 5%;
    padding-left: 20px;
    padding-right: 20px;
}
}
      </style>

      <header class="active">
        <a href="index.html">
          <img src="../../public/assets/images/logo.png" alt="Logo">
        </a>
        <nav>
            <ul class="main-menu">  
                <li><a href="movies.html">Кино</a></li>
            </ul>
            <ul class="watchlist">  
          <li>
            <a href="profile.html">
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" style="margin-left: 0.5rem;">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M8 4l0 16"></path>
                <path d="M16 4l0 16"></path>
                <path d="M4 8l4 0"></path>
                <path d="M4 16l4 0"></path>
                <path d="M4 12l16 0"></path>
                <path d="M16 8l4 0"></path>
                <path d="M16 16l4 0"></path>
              </svg>
               
            </a>
          </li>
        </ul>
            <ul class="right">
                <li class="search" "><input type="text" class="search"  id="searchInput" placeholder="Хайх"></li> 
                <li><a href="contact.html">Холбогдох</a></li> 
                <li id="authLink"><a href="log-in.html">Нэвтрэх</a></li>
            </ul>
            <label for="menu" class="menu"><i class="fa fa-bars"></i></label>
        </nav>   
      </header>
    `;
    this.#updateAuthStatus();
  }
  async #updateAuthStatus() {
    const authLink = this.querySelector("#authLink a");
    const token = localStorage.getItem("token");

    if (token) {
      // If a token exists, fetch the user data by ID
      const userId = localStorage.getItem("userId"); // Make sure user ID is stored in localStorage when the user logs in
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:5001/api/user/${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the request
              },
            }
          );

          const data = await response.json();
          if (data && data.id) {
            // If the user data is fetched successfully
            authLink.textContent = data.username || "Профайл"; // Display username in the header
            authLink.href = "profile.html";
          } else {
            console.error("Failed to fetch user data");
            authLink.textContent = "Нэвтрэх";
            authLink.href = "log-in.html";
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          authLink.textContent = "Нэвтрэх";
          authLink.href = "log-in.html";
        }
      }
    } else {
      // If no token, keep "Login" link
      authLink.textContent = "Нэвтрэх";
      authLink.href = "log-in.html";
    }
  }
}

customElements.define("header-component", HeaderComponent);
