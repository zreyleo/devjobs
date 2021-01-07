import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    // Limpiar las alertas
    const alertas = document.querySelector('.alertas');

    if (alertas) {
        limpiarAlertas();
    }

    if (skills) {
        skills.addEventListener('click', agregarSkills);

        // una vez que estamos en editar, llamar funcion
        skillsSeleccionados();
    }

    const vacantesListado = document.querySelector('.panel-administracion');

    if (vacantesListado) {
        vacantesListado.addEventListener('click', accionesListado);
    }
});

const skills = new Set();

function agregarSkills(event) {
    if (event.target.tagName == 'LI') {
        if (event.target.classList.contains('activo')) {
            skills.delete(event.target.textContent);
            event.target.classList.remove('activo')
        } else {
            skills.add(event.target.textContent);
            event.target.classList.add('activo')
        }
    }
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}

function skillsSeleccionados() {
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

    seleccionadas.forEach(seleccion => {
        skills.add(seleccion.textContent);
    })

    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}

function limpiarAlertas() {
    const alertas = document.querySelector('.alertas');

    const interval = setInterval(() => {
        if (alertas.children.length > 0) {
            alertas.removeChild(alertas.children[0]);
        } else if (alertas.children.length === 0) {
            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
        }
    }, 2000);
}

// eliminar vacantes
function accionesListado(event) {
    event.preventDefault();

    if (event.target.dataset.eliminar) {
        // eliminar vacante

        Swal.fire({
            title: '¿Estás segur@?',
            text: "¡Esta acción no es reversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/vacantes/eliminar/${event.target.dataset.eliminar}`

                axios.delete(url, { params: { url } }).then(respuesta => {
                    if (respuesta.status == 200) {
                        Swal.fire(
                            '¡Eliminada!',
                            respuesta.data,
                            'success'
                        )

                        // eliminar del DOM
                        event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement)
                    }
                })
            }
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'No se pudo eliminar'
            })
        })
    } else if (event.target.tagName == 'A') {
        window.location.href = event.target.href;
    }
}