const loadingElement = document.getElementById("loading");
const ProdutoElement = document.getElementById("produto");
const errorElement = document.getElementById("error");

fetch("https://fakestoreapi.com/products/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados : " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    loadingElement.style.display = "none";
    ProdutoElement.innerHTML = `<h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>Preço: $${data.price}</p>
        <img src="${data.image}" alt="${data.title}" width="200">`;
  })
  .catch((error) => {
    loadingElement.style.display = "none";
    errorElement.textContent = "Ocorreu um erro: " + error.message;
  });
