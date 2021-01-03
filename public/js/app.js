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