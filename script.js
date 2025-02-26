document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("study-form");
    const peopleList = document.getElementById("people-list");

    // Cargar y mostrar la lista de personas del localStorage
    const savedPeople = localStorage.getItem("peopleList");
    if (savedPeople) {
        JSON.parse(savedPeople).forEach(person => addToList(person));
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario para hacer la validación

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const edad = document.getElementById("edad").value;
        const nivelEstudio = document.getElementById("nivel-estudio").value;

        if (nombre === "" || apellido === "" || edad === "" || nivelEstudio === "") {
            alert("Por favor, complete todos los campos antes de enviar el formulario.");
            return;
        }

        // Guardar datos en localStorage
        const formData = {
            nombre,
            apellido,
            edad,
            nivelEstudio
        };
        saveToLocalStorage(formData);
        addToList(formData);

        alert("¡Formulario enviado y datos guardados en el caché!");
        form.reset();
    });

    function saveToLocalStorage(formData) {
        let peopleList = localStorage.getItem("peopleList");
        if (peopleList) {
            peopleList = JSON.parse(peopleList);
        } else {
            peopleList = [];
        }
        peopleList.push(formData);
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
    }

    function addToList(person) {
        const listItem = document.createElement("li");
        listItem.textContent = `${person.nombre} ${person.apellido}, ${person.edad} años, Nivel de Estudio: ${person.nivelEstudio}`;
        peopleList.appendChild(listItem);
    }
});
