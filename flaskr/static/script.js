fetch('/api/credito')
    .then(response => response.json())
    .then(creditos => {
        const tablaCredito = document
            .getElementById('tabla-credito')
            .getElementsByTagName('tbody')[0];
        creditos.forEach(credito => {
            console.log(credito.cliente);
            const fila = document.createElement('tr');

            // Crear celdas para cada atributo del credito
            const celdaId = document.createElement('td');
            celdaId.textContent = credito.id;
            fila.appendChild(celdaId);
            const celdaCliente = document.createElement('td');
            celdaCliente.textContent = credito.cliente;
            fila.appendChild(celdaCliente);
            const celdaMonto = document.createElement('td');
            celdaMonto.textContent = credito.monto;
            fila.appendChild(celdaMonto);
            const celdaTasa = document.createElement('td');
            celdaTasa.textContent = credito.tasa_interes;
            fila.appendChild(celdaTasa);
            const celdaPlazo = document.createElement('td');
            celdaPlazo.textContent = credito.plazo;
            fila.appendChild(celdaPlazo);
            const celdaFecha = document.createElement('td');
            celdaFecha.textContent = credito.fecha_otorgamiento;
            fila.appendChild(celdaFecha);
            const celdaEstado = document.createElement('td');

            tablaCredito.appendChild(fila);
        
        });
    });


document.getElementById('submit').addEventListener('click', function () {
    // get values from input fields
    const cliente = document.getElementById('cliente').value;
    const monto = document.getElementById('monto').value;
    const tasa = document.getElementById('tasa').value;
    const plazo = document.getElementById('plazo').value;

    // create a new credito object
    const credito = {
        cliente: cliente,
        monto: monto,
        tasa_interes: tasa,
        plazo: plazo,
        fecha_otorgamiento: fecha
    };

    // send POST request to the server
    fetch('/api/credito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credito),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // reload the page
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});