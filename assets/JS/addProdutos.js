function criarConteudoProdutos(dados, tag, arquivo) {
    let preco = "";
    dados.map((item) => {
        if(item.tabela == arquivo){
        (item.preco) = (item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if(item.desconto == null){
            preco = `<p class="preco">${item.preco}</p>`;
        }else{
            (item.desconto) = (item.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            preco = `<p>${item.desconto}<span>${item.preco}</span></p>`;
        }
        document.querySelector(`.${tag}`).innerHTML +=
            `
<a href="produto.html?id=${item.id}&arquivo=${arquivo}">
    <div class="recomendados-item flex-center-display">
        <div class="recomendados-item-img">
            <img src="./assets/IMG/PRODUTOS/${item.img}" alt="produtos da loja">
        </div>
        <div class="recomendados-item-texto flex-between-display">
            <h2>${item.nome}</h2> ${preco}
        </div>
    </div>
</a>`;
    }
    });
}
ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarConteudoProdutos(dados, 'recomendados-conteudo-prodDestaque', 'produtoDestaque')
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});
ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarConteudoProdutos(dados, 'recomendados-conteudo-prodOnsale', 'produtoOnsale')
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});
ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarConteudoProdutos(dados, 'recomendados-conteudo-prodClassificacao', 'produtoClassificacao')
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});