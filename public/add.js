document.getElementById('form-add').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoInsumo = {
        categoria: document.getElementById('categoria').value,
        insumo: document.getElementById('insumo').value,
        unidades: parseInt(document.getElementById('unidades').value),
        fecha: new Date().toISOString().split('T')[0] 
    };

    try {
        const response = await fetch('/insumo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoInsumo)
        });

        const data = await response.json();

        if (data.success) {
            alert("¡Insumo añadido correctamente!");
            document.getElementById('form-add').reset();
        } else {
            alert("Error al guardar: " + data.message);
        }
    } catch (error) {
        console.error(error);
        alert("No se pudo conectar con el servidor.");
    }
});