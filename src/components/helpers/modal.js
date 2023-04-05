import * as bootstrap from "bootstrap";
//todo make it generic for any modal

function openModal (modalId) {
    const currentOpenModals = document.querySelectorAll('.modal.show') ?? [];
    for (const openModal of currentOpenModals) {
        const openModalId = openModal.getAttribute('id');
        closeModal(openModalId);
    }

    let modal = document.getElementById(modalId);
    let bsModal = new bootstrap.Modal(modal);
    
    console.log('Opening', modalId);
    bsModal.show();
    modal.addEventListener('hidde.bs.modal', function (event) {
        closeBackdrops();
    })
}

function closeModal (modalId) {
    let bsModal = new bootstrap.Modal(`#${modalId}`);
    
    bsModal._isShown = true;
    bsModal.hide();

    let backdrops = document.getElementsByClassName("modal-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
            backdropItem.remove();
        }
    }
}

function closeBackdrops () {
    let backdrops = document.querySelectorAll(".modal-backdrop, .offcanvas-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
            backdropItem.remove();
        }
    }
}

export { closeModal, closeBackdrops, openModal };
