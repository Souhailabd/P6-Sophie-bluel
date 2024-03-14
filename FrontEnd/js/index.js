const gallery = document.querySelector(".gallery");
const filtres = document.querySelector("filtres")

async function main() {
  await displayWorks();
  await diplayFiltres();
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