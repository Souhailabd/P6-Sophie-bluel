const gallery = document.querySelector(".gallery"); // Sélectionne la galerie d'images
const filtres = document.querySelector(".filtres"); // Sélectionne les filtres de catégorie
const admintoken = sessionStorage.getItem("token"); // Récupère le token de l'administrateur depuis le sessionStorage

async function main() {
  await displayWorks(); // Affiche les projets
  displayFiltres(); // Affiche les filtres de catégorie
  admin(); // Vérifie si l'utilisateur est un administrateur
}

main(); // Appelle la fonction principale

// Fonction pour récupérer les projets depuis l'API
async function getWorks() {
  try {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    if (!worksResponse.ok) {
      throw new Error(`Erreur HTTP: ${worksResponse.status}`);
    }
    return worksResponse.json();
  } catch (error) {
    console.log("Erreur lors de la récupération des projets depuis l'API :" + error);
  }
}

// Fonction pour afficher les projets
async function displayWorks(categorieId) {
  try {
    const dataworks = await getWorks();
    gallery.innerHTML = ""; // Vide la galerie d'images avant d'ajouter de nouveaux projets
    
    dataworks.forEach((works) => {
      if ( categorieId == works.category.id || categorieId == null) {
        createWorks(works); // Crée un élément pour chaque projet et l'ajoute à la galerie
      }
    });
  } catch (error) {
    console.log("Erreur lors de l'affichage des projets :", error);
  }
}

// Fonction pour créer un élément pour chaque projet
function createWorks(works) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = works.imageUrl;
  figcaption.innerText = works.title;
  figure.setAttribute("categorieId", works.category.id);

  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Fonction pour récupérer les catégories depuis l'API
async function getCategories() {
  try {
    const categoriesResponse = await fetch("http://localhost:5678/api/categories")
    return await categoriesResponse.json();
  } catch (error) {
    console.log("Erreur lors de la récupération des catégories depuis l'API" );
  }
}

// Fonction pour afficher les filtres de catégorie
async function displayFiltres() {
  const dataCategories = await getCategories();
  
  dataCategories.forEach((category) => {
    const btnCategorie = document.createElement("button");
    btnCategorie.innerText = category.name;
    btnCategorie.classList.add("filterButton"); 
    btnCategorie.setAttribute("buttonId", category.id);
    filtres.appendChild(btnCategorie);
  });

  const buttons = document.querySelectorAll(".filtres button");
  buttons.forEach((button) => {
    button.addEventListener("click", function(){
      let categorieId = button.getAttribute("buttonId");
      buttons.forEach((button) => button.classList.remove("filterButtonActive"));
      this.classList.add("filterButtonActive");
      displayWorks(categorieId);
    });
  });
}

// Fonction pour vérifier si l'utilisateur est un administrateur
function admin() {
  if (admintoken) {
    logout(); // Déconnexion si l'utilisateur est administrateur
    adminDisplay(); // Affichage du mode édition
  }
}

// Fonction pour se déconnecter
function logout() {
  const connect = document.querySelector(".loginAdmin");
  connect.innerHTML = "<a href='#'>logout</a>";
  connect.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  });
}

// Fonction pour afficher le mode édition
function adminDisplay() {
  const banner = document.createElement("div");
  banner.classList.add("banner", "visibleBanner");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-pen-to-square");
  icon.style.color = "white";

  const title = document.createElement("h2");
  title.textContent = "Mode édition";

  banner.appendChild(icon);
  banner.appendChild(title);

  const currentParent = document.querySelector("body");
  const firstChild = currentParent.firstElementChild;

  if (firstChild) {
    currentParent.insertBefore(banner, firstChild);
  } else {
    currentParent.appendChild(banner);
  }
  
  const filtres = document.querySelector(".filtres");
  if (filtres) {
    filtres.parentNode.removeChild(filtres);
  } else {
    console.error("La bannière n'a pas été trouvée.");
  }
 }
 
 let modal = null

 const openModal = function (e) {
   e.preventDefault ()
 const target =document.querySelector (e.target.getAttribute('href'))
 target.style.display = null
 target.removeAttribute ('aria-hidden')
 target.setAttribute('aria-modal' , 'true')
 modal = target
 modal.addEventListener ('click' , closeModal)
 modal.querySelector('.js-modal-close').addEventListener('click' , closeModal)
 
 }
 
 const closeModal = function (e) {
   if (modal === null) return
   e.preventDefault()
   modal.style.display = "none";
   modal.setAttribute ('aria-hidden' , 'true')
   modal.removeAttribute('aria-modal')
   modal.removeEventListener ('click' , closeModal)
   modal.querySelector('.js-modal-close').removeEventListener('click' , closeModal)
   modal= null
 
 }
 
 document.querySelectorAll('.js-modal').forEach(a => {
   a.addEventListener('click' ,openModal)
   
 })
 ;
 






