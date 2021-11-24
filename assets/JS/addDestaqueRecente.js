function criarConteudoDestaqueRecente(dados, tag, arquivo) {
    let preco;
    dados.map((item) => {
        if(item.tabela == arquivo){
        preco = (item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.querySelector(`.${tag}`).innerHTML +=
            `
        <a href="produto.html?id=${item.id}&arquivo=${arquivo}">            
        <div class="inicio-conteudo-anuncio-item">
            <h3>${item.tipo}</h3>
            <h2>${item.nome}</h2>
            <div class="anuncio-item-img">
                <img src="./assets/IMG/PRODUTOS/${item.img}" alt="produto da loja">
            </div>
            <div class="anuncio-item-priceCar flex-between-display">
                <p>${preco}</p>
                <div class="anuncio-item-addcar flex-center-display">
                    <i data-id="${item.id}" data-arquivo="${arquivo}" data-preco="${item.preco}" data-nome="${item.nome}" data-img="${item.img}" class="addCarrinho fas fa-cart-plus"></i>
                </div>
            </div>
            <div class="anuncio-item-favorito flex-center-display">
                <button><i class="far fa-heart"></i>&nbsp;Adicionar aos favoritos</button>
            </div>
        </div></a>`;
        }
    });
}
ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarConteudoDestaqueRecente(dados, 'inicio-conteudo-anuncio-destaque', 'destaque')
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
        criarConteudoDestaqueRecente(dados, 'inicio-conteudo-anuncio-recente', 'recente')
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});
