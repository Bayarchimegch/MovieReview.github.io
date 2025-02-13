class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }
  #render() {
    this.innerHTML = `
       <link rel="preconnect" href="https://fonts.googleapis.com">
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap" rel="stylesheet">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
       <style>
           footer {
               width: 100%;
               height: 7rem;
                background: #fff;
               background: #0F0F0F;
               box-shadow: 0px 4px 10px 0px rgba(240, 251, 255, 0.20) inset;
               display: grid;
               place-items: center;
               padding: 1rem;
           }
           footer nav {
               display: flex;
               justify-content: space-between;
               width: 6rem;
               align-items: center;
               font-size: 1rem;
               color: #fff;
           }
           footer nav a {
               color: #fff;
               text-decoration: none;
           }
           footer nav a:hover {
               color: var(--color-accent);
           }
           footer p.end {
               font-size: 1rem;
               color: #fff;
               cursor: pointer;
           }
       </style>
       <footer>
           <nav class="footer">       
               <a href="https://www.facebook.com" class="fb">
                   <i class="fa-brands fa-facebook-f"></i>
               </a>
               <a href="https://www.twitter.com" class="twitter">
                   <i class="fa-brands fa-twitter"></i>
               </a>
               <a href="https://www.instagram.com" class="insta">
                   <i class="fa-brands fa-instagram"></i>
               </a>
           </nav>
           <p class="end">
               &copy; 2025 <span style="color:#EE5151;">KINO</span>chid. All Rights Reserved.
           </p>
       </footer>`;
  }
}

window.customElements.define("footer-component", FooterComponent);
