document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');



    if (skills) {
        skills.addEventListener('click', agregarSkills);
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