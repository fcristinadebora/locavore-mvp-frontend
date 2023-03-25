import * as bootstrap from "bootstrap";
//todo make it generic for any modal

function openMustLoginModal() {
    let modal = document.getElementById("must-login-modal");
    let bsModal = new bootstrap.Modal(modal);
    
    bsModal.show();
    modal.addEventListener('hidde.bs.modal', function (event) {
        closeBackdrops();
    })
  }

function closeModal() {
    let modal = document.getElementById("must-login-modal");
    let bsOffcanvas = new bootstrap.Modal(document.getElementById('myModal'), modal);

    let backdrops = document.getElementsByClassName("modal-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
        backdropItem.remove();
        }
    }
}

function closeBackdrops() {
    let backdrops = document.querySelectorAll(".modal-backdrop, .offcanvas-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
        backdropItem.remove();
        }
    }
}

export { openMustLoginModal, closeModal, closeBackdrops };
