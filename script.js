// script.js
document.addEventListener('DOMContentLoaded', function () {
    const itemInput = document.getElementById('itemInput');
    const quantityInput = document.getElementById('quantityInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    // Lista inicial de itens (agora com quantidade e status)
    const initialItems = [];

    // Função para renderizar a lista
    function renderList() {
        itemList.innerHTML = ''; // Limpa a lista antes de renderizar
        for (let i = 0; i < initialItems.length; i++) {
            const item = initialItems[i];
            const li = document.createElement('li');
            if (item.completed) {
                li.classList.add('completed'); // Adiciona classe para itens completos
            }

            // Checkbox para marcar como comprado
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.completed;
            checkbox.addEventListener('change', function () {
                item.completed = checkbox.checked;
                renderList(); // Re-renderiza a lista
            });

            // Texto do item com quantidade
            const itemText = document.createElement('span');
            itemText.textContent = `${item.name} (${item.quantity}x)`;

            // Botão para remover o item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                initialItems.splice(i, 1); // Remove o item do array
                renderList(); // Re-renderiza a lista
            });

            // Adiciona elementos ao <li>
            li.appendChild(checkbox); // Checkbox à esquerda
            li.appendChild(itemText); // Texto no meio
            li.appendChild(removeButton); // Botão de remover à direita
            itemList.appendChild(li);
        }
    }

    // Renderiza a lista inicial
    renderList();

    // Adiciona um novo item à lista
    addButton.addEventListener('click', function () {
        const newItemName = itemInput.value.trim();
        const newItemQuantity = parseInt(quantityInput.value);

        if (newItemName !== '' && newItemQuantity > 0) {
            initialItems.push({
                name: newItemName,
                quantity: newItemQuantity,
                completed: false,
            });
            itemInput.value = ''; // Limpa o campo de input
            quantityInput.value = ''; // Limpa o campo de quantidade
            renderList(); // Re-renderiza a lista
        } else {
            alert('Por favor, preencha o nome e a quantidade corretamente.');
        }
    });
});