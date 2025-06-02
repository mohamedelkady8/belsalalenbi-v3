 window.addEventListener("load", function () {
      const preload = document.querySelector(".preload");
      setTimeout(() => {
        preload.classList.add("loaded");
        document.body.classList.add("loaded");
      }, 1000);
    });