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
            <ul class="right">
                <li class="search"><input type="text" class="search" id="searchInput" placeholder="Хайх"></li> 
                <li><a href="contact.html">Холбогдох</a></li> 
                <li id="authLink"><a href="log-in.html">Нэвтрэх</a></li>
            </ul>
            <label for="menu" class="menu"><i class="fa fa-bars"></i></label>
        </nav>   
      </header>
    `;
    this.#updateAuthStatus();
  }
  #updateAuthStatus() {
    const authLink = this.querySelector("#authLink a");
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, show "Profile" instead of "Login"
      authLink.textContent = "Профайл";
      authLink.href = "profile.html";
    } else {
      // If no token, keep "Login"
      authLink.textContent = "Нэвтрэх";
      authLink.href = "log-in.html";
    }
  }
}

customElements.define("header-component", HeaderComponent);
