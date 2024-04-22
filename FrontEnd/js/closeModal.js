const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
  // Réinitialisation des champs du formulaire
  document.getElementById("photoInput").value = "";
  document.getElementById("title").value = "";
  document.getElementById("category").selectedIndex = 0;

  // Afficher le texte par défaut pour le champ de sélection de fichier
  document.querySelector(".photoInputTxt").classList.remove("hidden");
  // Afficher le bouton pour le champ de sélection de fichier
  document.querySelector(".btnPhotoInput").classList.remove("hidden");
  // Cacher le message d'erreur pour le champ de sélection de fichier
  document.querySelector(".errorImg").classList.add("hidden");
  // Réinitialiser l'image de prévisualisation
  document.getElementById("previewImage").src = "";

  resetValidationButton();

};
