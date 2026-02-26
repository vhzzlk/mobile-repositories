const fatogato = document.getElementById('fatogato');
const buscarfato = document.getElementById('buscarfato');
async function buscarGato() {
    try {
        const responde = await fetch('https://catfact.ninja/fact');
        const dados = await responde.json();
        fatogato.textContent = dados.fact;

        }catch (error) {
            fatogato.textContent = 'Ocorreu um erro: ' + error.message;
        }  
}
buscarfato.addEventListener('click', buscarGato);
buscarGato();