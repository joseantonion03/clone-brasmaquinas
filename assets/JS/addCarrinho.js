
// ADD carrinho

setTimeout(() => {
    document.querySelectorAll('.addCarrinho').forEach((e) => {
        e.addEventListener('click', addCarrinho);
    })
}, 1000);

function setCarrinho(id, tabela, preco, nome, img) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    let addConteudo = true;
    carrinho.map((item, index) => {
        if (item.id == id && item.tabela == tabela) {
            item.total += 1;
            addConteudo = false;
        }
    })
    if (addConteudo) {
        carrinho.push({
            id: id,
            tabela: tabela,
            total: 1,
            preco: preco,
            nome: nome,
            img: img
        });
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function organizarCarrinho(index, tabela, id, img, nome, preco, total) {
    let acoes = `${tabela}:${id}`;
    preco = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.querySelector('.container-carrinho-card-produtos').innerHTML +=
        `<div class="carrinho-card-produtos-corpo flex-center-display">
    <div class="carrinho-card-produtos-corpo-img">
        <img src="./assets/IMG/PRODUTOS/${img}" alt="produto do carrinho">
    </div>
    <div class="carrinho-card-produtos-corpo-info">
        <div class="carrinho-card-produtos-corpo-info-texto">
            <h2>${nome}</h2>
        </div>
        <div class="carrinho-card-produtos-corpo-info-preco flex-start-display">
            <div class="carrinho-card-total">
                <ul class="ajustePreco flex-center-display">
                    <li><button data-id="${acoes}" data-index="${index}" class="btnMenos">-</button></li>
                    <li><span data-id="${acoes}-preco" data-index="${index}" class="totalPreco">${total}</span></li>
                    <li><button data-id="${acoes}" data-index="${index}" class="btnMais">+</button></li>
                </ul>
            </div>
        <div class="carrinho-card-preco">
            <p><span data-id="${acoes}-valor">${total}</span> × ${preco}</p>
        </div>
    </div>
    </div>
</div>`;
}

function diminuirPreco(e) {
    let getTag = document.querySelector(`[data-id="${e.target.dataset.id}-preco"]`);
    let valorProduto = parseInt(getTag.innerText) - 1;
    if (valorProduto < 1) {
        removerObjeto(e.target.dataset.index);
    } else {
        getTag.innerHTML = valorProduto;
        document.querySelector(`[data-id="${e.target.dataset.id}-valor"]`).innerHTML = valorProduto

        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        carrinho.map((item, index) => {
            if (index == getTag.dataset.index) {
                item.total -= 1;
            }
        })
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
    mostrarInformacoesCarrinho()
}
function aumentarPreco(e) {
    let getTag = document.querySelector(`[data-id="${e.target.dataset.id}-preco"]`);

    let valorProduto = parseInt(getTag.innerText) + 1;
    getTag.innerHTML = valorProduto;
    document.querySelector(`[data-id="${e.target.dataset.id}-valor"]`).innerHTML = valorProduto;


    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    carrinho.map((item, index) => {
        if (index == getTag.dataset.index) {
            item.total += 1;
        }
    })
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarInformacoesCarrinho();
}
function ajustePreco() {
    document.querySelectorAll('.btnMenos').forEach((e) => {
        e.addEventListener('click', diminuirPreco);
    })
    document.querySelectorAll('.btnMais').forEach((e) => {
        e.addEventListener('click', aumentarPreco);
    })
}
function removerObjeto(posicao) {
    let getCarrinhoItens = localStorage.getItem('carrinho');
    let newJson = [];
    JSON.parse(getCarrinhoItens).map((item, index) => {
        if (posicao != index) {
            newJson.push({
                id: item.id,
                tabela: item.tabela,
                total: item.total,
                preco: item.preco,
                nome: item.nome,
                img: item.img
            });
        }
    })
    newJson = JSON.stringify(newJson);
    localStorage.setItem("carrinho", newJson);
    getCarrinho();
}
function getCarrinho() {
    let tagCarrinho = document.querySelector('.container-carrinho-card-produtos');
    let getCarrinhoItens = localStorage.getItem('carrinho');
    if ((getCarrinhoItens != null) && (getCarrinhoItens != '[]')) {
        tagCarrinho.innerHTML = ""
        let i = 0;
        JSON.parse(getCarrinhoItens).map((item, index) => {
            ajax({
                url: `assets/DADOS/bd.json`,
                metodo: "get",
                sucesso(resposta) {
                    let dados = JSON.parse(resposta);
                    let getDados = dados[item.id];
                    organizarCarrinho(index, item.tabela, getDados.id, getDados.img, getDados.nome, getDados.preco, item.total)
                },
                erro(e) {
                    const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
                    console.log(msg);
                }
            });
            i++;
        });
    } else {
        tagCarrinho.innerHTML =
            `<div class="container-carrinho-alert flex-center-display">
                <p style="padding: 10px 15px">Não encontramos nenhum produto adicionado no seu carrinho.</p>
        </div>`;
    }
    setTimeout(() => {
        ajustePreco();
        mostrarInformacoesCarrinho()
    }, 500);
}
function addCarrinho(e) {
    e.preventDefault();
    let id = e.target.dataset.id;
    let tabela = e.target.dataset.arquivo;
    let preco = e.target.dataset.preco;
    let nome = e.target.dataset.nome;
    let img = e.target.dataset.img;
    setCarrinho(id, tabela, preco, nome, img);

    getCarrinho()
    document.querySelector('.container-carrinho').classList.add('container-carrinho-show');
    document.querySelector('.container-carrinho-card').classList.add('container-carrinho-card-show');
}

function mostrarInformacoesCarrinho() {
    const totalCarrinho = document.querySelectorAll('.carrinho-total');
    const precoCarrinho = document.querySelectorAll('.carrinho-preco');
    let getCarrinhoItens = localStorage.getItem('carrinho');
    let total = 0;
    let preco = 0.00;
    JSON.parse(getCarrinhoItens).map((item, index) => {
        preco += (parseFloat((item.preco)) * item.total);
        total++
    })
    preco = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalCarrinho[0].innerHTML = total
    totalCarrinho[1].innerHTML = total
    precoCarrinho[0].innerHTML = preco
    precoCarrinho[1].innerHTML = preco

}
mostrarInformacoesCarrinho();
