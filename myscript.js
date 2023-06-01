// Seleccionar todos los elementos arrastrables con la clase '.draggable'
const draggables = document.querySelectorAll('.draggable');

// Seleccionar todos los contenedores con la clase '.container'
const containers = document.querySelectorAll('.arrow-container-size');

// Agregar eventos de arrastre a los elementos arrastrables
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    // Agregar la clase 'dragging' al elemento arrastrable cuando comienza el arrastre
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    // Remover la clase 'dragging' del elemento arrastrable cuando termina el arrastre
    draggable.classList.remove('dragging');
  });
});

// Agregar evento de arrastre a los contenedores
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    // Prevenir el comportamiento predeterminado del arrastre sobre el contenedor
    e.preventDefault();

    // Obtener el elemento después del cual se debe insertar el elemento arrastrable
    const afterElement = getDragAfterElement(container, e.clientY);

    // Obtener el elemento arrastrable actual
    const draggable = document.querySelector('.dragging');

    // Insertar el elemento arrastrable en el contenedor
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

// Obtener el elemento después del cual se debe insertar el elemento arrastrable
function getDragAfterElement(container, y) {
  // Obtener todos los elementos arrastrables dentro del contenedor, excluyendo el arrastrable actual
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  // Encontrar el elemento más cercano al punto de soltar el arrastrable
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    // Comprobar si la posición de soltar está más arriba y más cerca que la posición actual
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

window.addEventListener("scroll", function() {
  var header = document.querySelector(".header-container");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});