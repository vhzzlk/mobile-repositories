
const produtos = {
    produto1: {
        nome: "Camiseta de algodão premium",
        preco: 29.99,
        disponivel: true,
    },

    produto2: { 
        nome: "Calça Jeans Slim Fit", 
        preco: 79.99, 
        disponivel: false },

    produto3: { 
        nome: "Tênis Esportivo Confortável", 
        preco: 149.99, 
        disponivel: true 
    },
};

const listaProdutosDiv = document.getElementById("lista-produtos");

for(const key in produtos) {
    if(produtos.hasOwnProperty(key)) {
    const produto = produtos[key];

    const produtoDiv = document.createElement("div");
    produtoDiv.classList.add("produto");

    const nomeH3 = document.createElement("h3");
    nomeH3.textContent = produto.nome;

    const precoP = document.createElement("p");
    precoP.textContent = `Preço: R$${produto.preco.toFixed(2)}`;

    const disponivelP = document.createElement("p");
    disponivelP.textContent = `Disponibilidade: `

    const spanDisponivel = document.createElement("span");
    spanDisponivel.textContent = produto.disponivel ? " Disponível" : " Indisponível";
    spanDisponivel.classList.add(produto.disponivel ? "disponivel" : "indisponivel");

    disponivelP.appendChild(spanDisponivel);
    produtoDiv.appendChild(nomeH3);
    produtoDiv.appendChild(precoP);
    produtoDiv.appendChild(disponivelP);
    listaProdutosDiv.appendChild(produtoDiv);


}

}