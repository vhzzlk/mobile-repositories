document.addEventListener("DOMContentLoaded", function () {
  const produtoFormElement = document.getElementById("produtoForm");
  const produtoTableElement = document.getElementById("produtoTable");
  const produtoTableBodyElement = produtoTableElement.getElementsByTagName("tbody")[0];
  const produtoIdElement = document.getElementById("produtoId");
  const cancelarBtnElement = document.getElementById("cancelarBtn");
  
  //variavel para rastrea se estamos editando
  let editing = false;

  //fucao para obter os produtos da LocalStorage
  function getProdutos() {
    const produtos = localStorage.getItem("produtos");
    return produtos ? JSON.parse(produtos) : [];
  }

  //funcao para salvar um novo produto 
  function saveProduto(produto) {
    const produtos = getProdutos();
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  function updateProduto(produtoAtualizado) {
    const produtos = getProdutos().map((produto) =>
      produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  function deleteProduto(id) {
    const produtos = getProdutos().filter((produto) => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  function renderProdutos() {
    const produtos = getProdutos();
    produtoTableBodyElement.innerHTML = "";

    if (produtos.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "Nenhum produto cadastrado.";
      row.appendChild(cell);
      produtoTableBodyElement.appendChild(row);
      return;
    }

    produtos.forEach((produto) => {
      const row = document.createElement("tr");

      const nomeCell = document.createElement("td");
      nomeCell.textContent = produto.nome;

      const precoCell = document.createElement("td");
      precoCell.textContent = Number(produto.preco).toFixed(2);

      const disponibilidadeCell = document.createElement("td");
      disponibilidadeCell.textContent =
        produto.disponibilidade === "disponivel" ? "Disponível" : "Indisponível";
      disponibilidadeCell.className = produto.disponibilidade;

      const acoesCell = document.createElement("td");
      const editarBtn = document.createElement("button");
      editarBtn.type = "button";
      editarBtn.textContent = "Editar";
      editarBtn.addEventListener("click", function () {
        preencherFormulario(produto);
      });

      const excluirBtn = document.createElement("button");
      excluirBtn.type = "button";
      excluirBtn.textContent = "Excluir";
      excluirBtn.addEventListener("click", function () {
        deleteProduto(produto.id);
        renderProdutos();
      });

      acoesCell.appendChild(editarBtn);
      acoesCell.appendChild(excluirBtn);

      row.appendChild(nomeCell);
      row.appendChild(precoCell);
      row.appendChild(disponibilidadeCell);
      row.appendChild(acoesCell);

      produtoTableBodyElement.appendChild(row);
    });
  }

  function limparFormulario() {
    produtoFormElement.reset();
    produtoIdElement.value = "";
    editing = false;
  }

  function preencherFormulario(produto) {
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("disponibilidade").value = produto.disponibilidade;
    produtoIdElement.value = produto.id;
    editing = true;
  }

  produtoFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value;
    const disponibilidade = document.getElementById("disponibilidade").value;

    if (!nome || !preco) {
      return;
    }

    if (editing && produtoIdElement.value) {
      updateProduto({
        id: produtoIdElement.value,
        nome,
        preco,
        disponibilidade,
      });
    } else {
      saveProduto({
        id: crypto.randomUUID(),
        nome,
        preco,
        disponibilidade,
      });
    }

    limparFormulario();
    renderProdutos();
  });

  cancelarBtnElement.addEventListener("click", function () {
    limparFormulario();
  });

  renderProdutos();
});