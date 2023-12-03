const btnConnexion = () => {
  const btn = document.querySelector("#btn-connexion");

  const dialog = document.querySelector("#connexion-dialog");

  btn.addEventListener("click", () => {
    const btnCoordinates = btn.getBoundingClientRect();
    dialog.style.position = "absolute";
    dialog.style.top = `${btnCoordinates.bottom}px`; // Position below the button
    dialog.style.right = `${btnCoordinates.right}px`;
    dialog.showModal();
  });

  const cancelBtn = dialog.querySelector("#cancel-connexion-dialog");
  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });
};

export default btnConnexion;
