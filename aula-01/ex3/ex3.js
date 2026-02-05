// let exemploLet = "Variável global com let";

function exemploLet() {
    // console.log(exemploLet);
    exemploLet = "Exemplo de variável com let";
    console.log(exemploLet);

    if (true) {
        let exemploLet = "Exemplo de variável com let dentro de um bloco";
        console.log(exemploLet);
    }
    console.log(exemploLet);
}

exemploLet();
