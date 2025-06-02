async function loadMenuData() {
    try {
      const res = await fetch('./assets/data/menu.json');
      const menuData = await res.json();
      window.menuData = menuData;
      renderCategoryButtons(Object.keys(menuData));
    } catch (err) {
      console.error('فشل تحميل المنيو:', err);
    }
  }

  function renderCategoryButtons(categories) {
    const select = document.getElementById("category-select");
    select.innerHTML = '';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
    showCategory(select.value);
    select.onchange = () => showCategory(select.value);
  }

  function showCategory(category) {
    const container = document.getElementById("menu-container");
    container.classList.remove('fade-in');
    void container.offsetWidth; // force reflow
    container.classList.add('fade-in');
    container.innerHTML = "";
    const items = window.menuData[category] || [];
    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.innerHTML = `
        <img src="${item.image || './assets/images/dish.png'}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <div class="description">${item.description || 'لا يوجد وصف متاح'}</div>
        <div class="price">${item.price}</div>

      `;
      container.appendChild(card);
    });
  }

  function scrollMenu(direction) {
    const container = document.getElementById("menu-container");
    const scrollAmount = 360;
    container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  }

  window.addEventListener("DOMContentLoaded", loadMenuData);

  let current = 1;
  const total = 3;
  setInterval(() => {
    current = current % total + 1;
    document.getElementById(`slide${current}`).checked = true;
  }, 4000);