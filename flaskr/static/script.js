// Campos de entrada del formulario
const idInput = document.getElementById('id');
const clienteInput = document.getElementById('cliente');
const montoInput = document.getElementById('monto');
const tasaInteresInput = document.getElementById('tasa_interes');
const plazoInput = document.getElementById('plazo');
const fechaInput = document.getElementById('fecha_otorgamiento');

// Tabla de credito
const tablaCredito = document.querySelector('#tabla-credito tbody');

// Botones del formulario
const submitButton = document.getElementById('submit');
const cancelButton = document.getElementById('cancel');

// Titulo del formulario
const formTitle = document.getElementById('titulo-formulario');

// Renderizar tabla de creditos
async function renderCredito(credito) {
    limpiarFormulario();

    // Obtener lista de creditos
    try {
        const response = await fetch('/api/credito');
        const creditos = await response.json();
        creditos.forEach(credito => insertarCredito(credito));
    } catch (error) {
        console.error('Error:', error);
    }
}

function insertarCredito(credito) {
    // Inserta una fila en la tabla
    const fila = tablaCredito.insertRow();

    // Celdas para cada atributo del credito
    fila.insertCell().textContent = credito.id;
    fila.insertCell().textContent = credito.cliente;
    fila.insertCell().textContent = credito.monto;
    fila.insertCell().textContent = credito.tasa_interes;
    fila.insertCell().textContent = credito.plazo;
    fila.insertCell().textContent = credito.fecha_otorgamiento;

    // Botones en la última celda
    const celdaAcciones = fila.insertCell();
    // Editar
    const botonEditar = document.createElement("button");
    botonEditar.innerHTML = '<i class="fas fa-pen"></i>';
    botonEditar.addEventListener("click", () => editarCredito(credito.id));
    botonEditar.classList.add("editar");
    celdaAcciones.appendChild(botonEditar);
    // Borrar
    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    botonEliminar.addEventListener("click", () => eliminarCredito(credito.id));
    botonEliminar.classList.add("eliminar");
    celdaAcciones.appendChild(botonEliminar);
}

// Función para eliminar un credito
async function eliminarCredito(id) {
    try {
        const response = await fetch(`/api/credito/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Success:', data);

        // Recarga la página
        location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Funcion para editar un credito
async function editarCredito(id) {
    try {
        // Obtenert los datos del credito
        const response = await fetch(`/api/credito/${id}`);
        const credito = await response.json();

        // Llenar el formulario con los datos del credito
        idInput.value = credito.id;
        clienteInput.value = credito.cliente;
        montoInput.value = credito.monto;
        tasaInteresInput.value = credito.tasa_interes;
        plazoInput.value = credito.plazo;
        fechaInput.value = new Date(credito.fecha_otorgamiento).toISOString().split('T')[0];

        formTitle.textContent = "Editar credito";
    } catch (error) {
        limpiarFormulario();
        console.error('Error:', error);
    }
}

function limpiarFormulario() {
    clienteInput.value = "";
    montoInput.value = "";
    tasaInteresInput.value = "";
    plazoInput.value = "";
    fechaInput.value = new Date().toISOString().split('T')[0];
    idInput.value = "";

    formTitle.textContent = "Registrar credito";
}

function validarDatos() {
    if (!clienteInput.value) {
        alert('El campo Cliente es requerido.');
        return false;
    }
    if (!montoInput.value || isNaN(montoInput.value) || parseFloat(montoInput.value) <= 0) {
        alert('El campo Monto es requerido y debe ser un número positivo.');
        return false;
    }
    if (!tasaInteresInput.value || isNaN(tasaInteresInput.value) || parseFloat(tasaInteresInput.value) <= 0) {
        alert('El campo Interes es requerido y debe ser un número positivo.');
        return false;
    }
    if (!plazoInput.value || isNaN(plazoInput.value) || parseInt(plazoInput.value) <= 0) {
        alert('El campo Plazo es requerido y debe ser un número positivo.');
        return false;
    }
    if (!fechaInput.value) {
        alert('El campo Fecha de otorgamiento es requerido.');
        return false;
    }
    return true;
}

document.getElementById('submit').addEventListener('click', async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    if(!validarDatos()){
        return;
    }

    // Objeto Credito
    const credito = {
        cliente: clienteInput.value,
        monto: montoInput.value,
        tasa_interes: tasaInteresInput.value,
        plazo: plazoInput.value,
        fecha_otorgamiento: fechaInput.value
    };

    const id = parseInt(idInput.value);

    try{
        if(id){
            await fetch(`/api/credito/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credito),
            });
        }
        else{
            await fetch('/api/credito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credito),
            });
        }

        limpiarFormulario();
        location.reload();
    }
    catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('cancel').addEventListener('click', function (event) {
    limpiarFormulario();
});

renderCredito();