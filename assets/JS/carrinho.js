document.querySelector('.btn-calcular').addEventListener('click', () => {
    document.querySelector('.table-calcular').classList.toggle('table-calcular-show');
    document.querySelector('.icon-calcular').classList.toggle('fa-angle-up');
});

function mostrarCarrinho() {
    let tagCarrinho = document.querySelector('.carrinho-produto');
    let getCarrinhoItens = localStorage.getItem('carrinho');
    tagCarrinho.innerHTML = "";
    let conteudo = "";
    let conteudoMobile = "";
    if ((getCarrinhoItens != null) && (getCarrinhoItens != '[]')) {
        JSON.parse(getCarrinhoItens).map(item => {
            (item.preco) = (item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            conteudo += `
            <tr>
            <td class="table-foto">
                <div class="carrinho-produto-conteudo flex-start-display">
                    <svg class="carrinho-produto-close deletarProduto" data-id="${item.id}" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path 
                            data-id="${item.id}"
                            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                        </path>
                    </svg>
                    <div class="carrinho-produto-img">
                        <img src="./assets/IMG/PRODUTOS/${item.img}" alt="produto do carrinho">
                    </div>
                    <p>${item.nome}</p>
                </div>
            </td>
            <td class="table-preco">
                <p>${item.preco}</p>
            </td>
            <td class="table-total"><input type="number" min="0" value="${item.total}" name="total"
                    id="total-produto"></td>
            <td class="table-subtotal">
                <p>${item.preco * item.total}</p>
            </td>
            </tr>`;

            //MOBILE

            conteudoMobile += `
            <table class="table-mobile">
            <tr>
                <td>
                    <svg class="table-m-carrinho-produto-close deletarProduto" data-id="${item.id}" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path data-id="${item.id}"
                            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                        </path>
                    </svg>
                </td>
            </tr>
            <tr>
                <th>Produto:</th>
                <td>
                    <p>${item.nome}</p>
                </td>
            </tr>
            <tr>
                <th>Preço:</th>
                <td>
                    <p>${item.preco}</p>
                </td>
            </tr>
            <tr>
                <th>Quantidade:</th>
                <td><input type="number" min="0" value="${item.total}" name="total" id="total-produto-mb"></td>
            </tr>
            <tr>
                <th>Subtotal:</th>
                <td>
                    <p>${item.preco * item.total}</p>
                </td>
            </tr>
            </table>`;
        });
    } else {
        conteudo = `<tr><td style="padding: 20px 0px">Nenhum produto foi adicionado no carrinho</td></tr></table>`;
        conteudoMobile = `<table class="table-mobile"><tr><td>Nenhum produto foi adicionado no carrinho</td></tr></table>`;
    }
    tagCarrinho.innerHTML +=
        `<table class="table-desktop">
        <tr class="table-titulo">
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
        </tr>
            ${conteudo}
        </table>
        ${conteudoMobile}`;
    document.querySelector('.loading').classList.add('loading-none')
    addEventDeleteCarrinho();
}
mostrarCarrinho()

function removerObjetoCarrinho(posicao) {
    let getCarrinhoItens = localStorage.getItem('carrinho');
    let newJson = [];
    JSON.parse(getCarrinhoItens).map((item, index) => {
        if (posicao != item.id) {
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
    mostrarCarrinho();
}

function addEventDeleteCarrinho(){
    document.querySelectorAll('.deletarProduto').forEach((e)=>{
        e.addEventListener('click', (e)=>{
            let getCarrinhoItens = localStorage.getItem('carrinho');
            JSON.parse(getCarrinhoItens).map(item => {
                if(e.target.dataset.id == item.id){
                    removerObjetoCarrinho(item.id)
                }
            })
        });
    });
}
