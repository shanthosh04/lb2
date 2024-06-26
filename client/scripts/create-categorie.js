const createCategorie = document.getElementById('create-categorie');
const token = localStorage.getItem("jwt");
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id')

createCategorie.addEventListener('submit', async event => {
    event.preventDefault();

    const name = document.getElementById('name').value;

    if (!name) {
        alert("Bitte geben Sie einen Kategoriennamen ein");
        return
    } 

    try {
        await categorie(name);
        if (id) alert("Kategorie bearbeitet")
        else alert("Kategorie erstellt")
    } catch (error) {
        console.error("Fehler beim Hinzufügen der Kategorie:", error);
        alert("Fehler beim Hinzufügen der Kategorie: " + error.message);
    }
});

async function categorie(name) {
    const url = id ? `http://localhost:3000/categories/${id}` : `http://localhost:3000/categories`
    const method = id ? 'PUT' : 'POST'

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name })
        });

        if (!res.ok) {
            const message = await res.text();
            throw new Error(message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCategory() {
    const res = await fetch(`http://localhost:3000/categories/${id}`)
    const data = await res.json()

    console.log(data)

    if (data.message) {
        alert(data.message)
        return
    }

    return data
}

async function populateInputFields() {
    const catergory = await getCategory()
    const nameInput = document.getElementById('name');

    nameInput.value = catergory.name
}

if (id) {
    populateInputFields()
}