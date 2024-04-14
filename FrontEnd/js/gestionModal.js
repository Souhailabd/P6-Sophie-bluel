function gestionModal() {
  const conntainerBtnModify = document.querySelector("modify");

  const iconeBtnModify = document.createElement("i");
  iconeBtnModify.classList.add("fa-solid", "fa-pen-to-square");


  const btnModifier = document.createElement("a");
  btnModifier.href = "#modal1";
  btnModifier.classList.add("js-modal");
  conntainerBtnModify.appendChild(iconeBtnModify);
  conntainerBtnModify.appendChild(btnModifier);
  btnModifier.addEventListener('click', openModal);
}
