import * as bootstrap from "bootstrap";

function openSidebar (sidebarId) {
    const currentOpenSidebars = document.querySelectorAll('.sidebar.show') ?? [];
    for (const openSidebar of currentOpenSidebars) {
        const openSidebarId = openSidebar.getAttribute('id');
        hideSidebar(openSidebarId);
    }

    let sidebar = document.getElementById(sidebarId);
    let bsSidebar = new bootstrap.Offcanvas(sidebar);
    
    bsSidebar.show();
    sidebar.addEventListener('hidde.bs.offcanvas', function (event) {
        closeBackdrops();
    })
}

function hideSidebar (elementId) {
    let bsSidebar = new bootstrap.Offcanvas(`#${elementId}`);
    
    bsSidebar._isShown = true;
    bsSidebar.hide();

    let backdrops = document.getElementsByClassName("sidebar-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
            backdropItem.remove();
        }
    }

    closeBackdrops();    
}

function closeBackdrops () {
    let backdrops = document.querySelectorAll(".sidebar-backdrop, .offcanvas-backdrop");
    let body = document.querySelector("body");

    body.removeAttribute("style");
    if (backdrops.length > 0) {
        for (const backdropItem of backdrops) {
            backdropItem.remove();
        }
    }
}

export { hideSidebar, closeBackdrops, openSidebar };
