const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");



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
    console.log("Erreur lors de la récupération des projets depuis l'API :" + error);
    
  }
}


async function displayWorks(categorieId) {
  try {
    const dataworks = await getWorks();
    gallery.innerHTML = "";
    
    dataworks.forEach((works) => {
      if ( categorieId == works.category.id || categorieId == null) {
        createWorks(works);
        
      }
      
    });
  }catch (error) {
    console.log("Erreur lors de l'affichage des projets :", error);
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
    console.log("Erreur lors de la récupération des catégories depuis l'API" );
  };
};

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
        button.addEventListener("click",function(){
          let categorieId = button.getAttribute("buttonId");
          buttons.forEach((button) => button.classList.remove("filterButtonActive"));
          this.classList.add("filterButtonActive");
          displayWorks(categorieId);
        })
      })
    }

displayFiltres();




