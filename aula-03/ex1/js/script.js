let produtos = [];

async function carregarProdutos() {
    try {
        const response = await fetch("js/produtos.json");
        if (!response.ok) {
           // Se der erro (ex: arquivo não existe ainda), inicializa vazio sem erro grave
           console.log("Arquivo JSON não encontrado ou erro, iniciando vazio.");
           exibirProdutos();
           return;
        }
        produtos = await response.json();
        exibirProdutos();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function adicionarProduto() {
    const nomeInput = document.getElementById("nome");
    const precoInput = document.getElementById("preco");
    const disponivelInput = document.getElementById("disponivel");

    const nome = nomeInput.value;
    const preco = parseFloat(precoInput.value);
    const disponivel = disponivelInput.value === "true";

    if (nome && !isNaN(preco)) {
        const novoProduto = {
            nome: nome,
            preco: preco,
            disponivel: disponivel,
        };
        produtos.push(novoProduto);

        nomeInput.value = "";
        precoInput.value = "";
        disponivelInput.value = "true";
        nomeInput.focus();

        exibirProdutos();
    } else {
        alert("Por favor, preencha o nome e o preço corretamente.");
    }
}

function exibirProdutos() {
    const listaProdutosDiv = document.getElementById("lista-produtos");
    const contador = document.getElementById("contador-produtos");
    
    listaProdutosDiv.innerHTML = "";
    if(contador) contador.textContent = produtos.length;

    produtos.forEach((produto) => {
        const produtoCard = document.createElement("div");
        produtoCard.className = "produto-card";
        
        // Label colorida no topo do card
        const labelClass = produto.disponivel ? "green" : "red";
        
        produtoCard.innerHTML = `
            <div class="produto-labels">
                <span class="card-label ${labelClass}" title="${produto.disponivel ? 'Disponível' : 'Esgotado'}"></span>
            </div>
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <div class="produto-details">
                    <span class="tag ${produto.disponivel ? "disp" : "esg"}">
                        ${produto.disponivel ? "DISP" : "ESG"}
                    </span>
                    <span class="price-tag">R$ ${produto.preco.toFixed(2)}</span>
                </div>
            </div>
        `;

        listaProdutosDiv.appendChild(produtoCard);
    });
}

carregarProdutos();
