// Esta función se ejecuta apenas carga la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/insumo'); 
        const insumos = await response.json();
        console.log("Datos recibidos del servidor:", insumos);
        const contenedor = document.getElementById('listaInsumos');
        
        if (insumos.length === 0) {
            contenedor.innerHTML = "<p>No hay insumos cargados todavía.</p>";
            return;
        }

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Objeto</th>
                        <th>Unidades</th>
                    </tr>
                </thead>
                <tbody>`;

        insumos.forEach(item => {
            tablaHTML += `
                <tr>
                    <td>${item.categoria}</td>
                    <td>${item.insumo}</td>
                    <td>${item.unidades}</td>
                    <td>${item.fecha}</td>
                </tr>`;
        });

        tablaHTML += `</tbody></table>`;
        contenedor.innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

let allInsumos = [];

function renderInventory(items) {
    const contenedor = document.getElementById('inventory-grid');
    contenedor.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron insumos.</p>";
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
            <h3>${item.objeto_specifico || item.insumo}</h3>
            <p>Stock: ${item.unidades}</p>
            <small>Categoría: ${item.categoria}</small>
        `;
        contenedor.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/insumo'); 
        allInsumos = await response.json();

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const filter = searchInput.value.trim().toLowerCase();
                const filtered = allInsumos.filter(item => (item.insumo || item.objeto_specifico || '').toLowerCase().includes(filter));
                renderInventory(filtered);
            });
        }

        renderInventory(allInsumos);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        document.getElementById('inventory-grid').innerHTML = "<p>Error al conectar con el servidor.</p>";
    }
});