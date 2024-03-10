const gallery = document.querySelector(".gallery");

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
  const workElement = document.createElement('div');
  workElement.innerHTML = `
    <p> ${works.title}</p>
    <img src="${works.imageUrl}" alt="${works.title}">`;
  gallery.appendChild(workElement);
}