const gallery = document.querySelector(".gallery");
const filtres = document.querySelector("filtres")

async function main() {
  await displayWorks();
}

main();

async function getWorks() {
  try {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    if (!worksResponse.ok) {
      throw new Error(`Erreur HTTP: ${worksResponse.status}`);
    }
    return worksResponse.json();
  } catch (error) {
    console.log("Erreur lors de la récupération des projets depuis l'API :");
    
  }
}


async function displayWorks() {
  try {
    const dataworks = await getWorks();
    gallery.innerHTML = "";
    dataworks.forEach((works) => {
      createWorks(works);
    });
  } catch (error) {
    console.log("Erreur lors de l'affichage des projets :");
  }
}

function createWorks(works) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")

    img.src = works.imageUrl;
    figcaption.innerText = works.title;
    figure.setAttribute("categorieId", works.category.id);

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

 
}

async function getCategories(){
  try {
    const categoriesResponse = await fetch("http://localhost:5678/api/categories")
    return await categoriesResponse.json();
  } catch (error) {
    console.log("Erreur lors de la récupération des catégories depuis l'API");
  };
};

async function displayFiltres() {
  try {
      const dataCategories = await getCategories(); // Récupération des catégories depuis l'API
      const filtresContainer = document.querySelector(".filtres"); // Sélection du conteneur des filtres dans le HTML

      // Parcours des catégories récupérées et création des boutons de filtre
      dataCategories.forEach((category) => {
          const btnCategorie = document.createElement("button");
          btnCategorie.innerText = category.name;
          btnCategorie.classList.add("filterButton"); // Ajout de la classe de base
          btnCategorie.setAttribute("buttonId", category.id);

          // Gestion de la classe active pour le premier bouton
          if (category.isActive) {
              btnCategorie.classList.add("filterButtonActive");
          }

          // Ajout d'un gestionnaire d'événement au clic pour activer/désactiver les boutons
          btnCategorie.addEventListener("click", function() {
              // Supprimer la classe active de tous les boutons
              document.querySelectorAll(".filterButton").forEach((btn) => {
                  btn.classList.remove("filterButtonActive");
              });
              // Ajouter la classe active uniquement au bouton actuel
              this.classList.add("filterButtonActive");
          });

          filtresContainer.appendChild(btnCategorie);
      });
  } catch (error) {
      console.log("Erreur lors de l'affichage des filtres :", error);
  }
}

displayFiltres();

