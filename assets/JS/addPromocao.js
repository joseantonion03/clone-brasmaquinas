function criarPromocao(dados, tag, arquivo) {
    dados.map((item) => {
        if (item.tabela == arquivo) {
            (item.preco) = (item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            (item.desconto) = (item.desconto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.querySelector(`.${tag}`).innerHTML +=
                `
            <div class="inicio-conteudo-detalhe">
            <div class="inicio-conteudo-promo-topo flex-between-display">
                <h2>Promoção</h2>
                <div class="promo-topo-card flex-center-display">
                    <div class="promo-topo-card-text flex-center-display">
                        <p>desconto de</p>
                        <h3>14%</h3>
                    </div>
                </div>
            </div>
            <div class="inicio-conteudo-promo-img">
                <img src="./assets/IMG/${item.img}" alt="foto da promoção">
            </div>
            <div class="inicio-conteudo-promo-info flex-center-display">
                <h3>${item.nome}</h3>
                <div class="promo-info-price flex-center-display">
                    <h1>${item.desconto}</h1>
                    <h4>${item.preco}</h4>
                </div>
                <div class="promo-info-tot flex-between-display">
                    <p>Já vendido: <b id="promo-vendidos-produto">${item.vendido}</b></p>
                    <p>Acessível: <b id="promo-tot-produto">${item.estoque}</b></p>
                </div>
                <div class="promo-info-progress">
                    <div style="width: ${item.vendido}0%" id="promo-progresso-produto" class="promo-info-progress-pocg">
                    </div>
                </div>
            </div>
        </div>`;
        }
    });
}
ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarPromocao(dados, 'inicio-conteudo-promo', 'promocao')
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});