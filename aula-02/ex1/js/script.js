const exemploArrayLiteralDiv = document.getElementById("exemplo-array-literal");
const frutas = ["Banana", "Maçã", "Laranja", "Manga"];

exemploArrayLiteralDiv.innerHTML = `<h2>Exemplo de array  com Literal</h2>
<p>Frutas: ${frutas.join(", ")}</p>`;

const exemploArrayAcessoDiv = document.getElementById("exemplo-array-acesso");

const numeros = [1, 2, 3, 4, 5];
const elementos = ["Primeiro", "Segundo", "Terceiro", "Quarto", "Quinto"];

exemploArrayAcessoDiv.innerHTML = `<h2>Exemplo de acesso a elementos do array</h2>`;

for (let i = 0; i < numeros.length; i++) {
  exemploArrayAcessoDiv.innerHTML += `<p> ${elementos[i]} elemento : 
    ${numeros[i]}</p>`;
}

const exemploArrayModificadoDiv = document.getElementById(
  "exemplo-array-modificado",
);

const cores = ["Vermelho", "Verde", "Azul"];

exemploArrayModificadoDiv.innerHTML = `<h2>Exemplo de modificação de array</h2>
<p>Cores: ${cores.join(", ")}</p>`;

cores[1] = "Amarelo";
exemploArrayModificadoDiv.innerHTML += `<p>Após modificação: ${cores.join(", ")}</p>`;
