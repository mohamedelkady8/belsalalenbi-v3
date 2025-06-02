    async function loadMenuData() {
      try {
        const res = await fetch('./assets/data/menu.json');
        const menuData = await res.json();
        window.menuData = menuData;
        renderCategoryButtons(Object.keys(menuData));
        showCategory(Object.keys(menuData)[0]);
      } catch (err) {
        console.error('فشل تحميل المنيو:', err);
      }
    }
    function renderCategoryButtons(categories) {
      const categoriesContainer = document.querySelector('.categories');
      categoriesContainer.innerHTML = '';
      categories.forEach(cat => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = cat;
        button.onclick = () => showCategory(cat);
        categoriesContainer.appendChild(button);
      });
    }
    function showCategory(category) {
      const container = document.getElementById("menu-container");
      container.innerHTML = "";
      const items = window.menuData[category] || [];
      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
          <img src="./assets/images/dish.png" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <div class="price">${item.price}</div>
          </div>
        `;
        container.appendChild(card);
      });
    }
    window.addEventListener("DOMContentLoaded", loadMenuData);
    let current = 1;
    const total = 3;
    setInterval(() => {
      current = current % total + 1;
      document.getElementById(`slide${current}`).checked = true;
    }, 4000);