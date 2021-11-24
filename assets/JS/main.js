//banner
let bannerAtual = 0;
let bannerTotal = 3;
let bannerPreviaImg = ['Brasmaquinas01-1-100x50.jpg', 'bg-slide-100x50.png', 'bg-slide-100x50.png', 'bg-slide-100x50.png'];
let bannerModelo =
    [`  
<div class="banner-apresentacao-1">
    <img src="./assets/IMG/BANNER/brasmaquinas-hires.png" alt="banner da loja">
</div>`,

        `<div class="banner-apresentacao-2">
<div class="banner-apresentacao-2-anuncio flex-between-display">
    <div class="banner-apresentacao-2-anuncio-left banner2-left flex-center-display">
        <p><span>Estamos</span>
        <span> de cara nova.</span></p>
    </div>
    <div class="banner-apresentacao-2-anuncio-right banner2-right flex-center-display">
        <img src="./assets/IMG/bras-maquinas.png" alt="marca da loja">
    </div>
</div>
<img src="./assets/IMG/BANNER/Brasmaquinas01-1.jpg" alt="banner da loja">
</div>`,

        `
<div class="banner-apresentacao-2">
                    <img src="./assets/IMG/BANNER/bg-slide.png" alt="banner da loja">
                    <div class="banner-apresentacao-2-anuncio flex-start-display">
                        <div class="banner-apresentacao-2-anuncio-left banner3-left flex-column-wrap flex-startTwo-display">
                                 <h4>EQUIPAMENTOS SOLAR / BOMBA SUBMERSA SOLAR</h4>
                            <h1>Linha Bomba Solar DC TÉTIS solar pump</h1>
                            <a href="#"><button>SAIBA MAIS</button></a>
                        </div>
                        <div class="banner-apresentacao-2-anuncio-right banner3-right flex-center-display">
                            <img src="./assets/IMG/BANNER/download-banner4.png" alt="marca da loja">
                        </div>
                    </div>
                </div>
`,
        `<div class="banner-apresentacao-2">
<img src="./assets/IMG/BANNER/bg-slide.png" alt="banner da loja">
<div class="banner-apresentacao-2-anuncio flex-start-display">
    <div class="banner-apresentacao-2-anuncio-left banner4-left flex-column-wrap flex-startTwo-display">
        <h4>Bateria Solar</h4>
        <h1>Bateria Estacionária Solar</h1>
        <h2>Conheça a linha de bateria solar</h2>
        <a href="#"><button>SAIBA MAIS</button></a>
    </div>
    <div class="banner-apresentacao-2-anuncio-right banner4-right flex-center-display">
        <img src="./assets/IMG/BANNER/bateria-moura.png" alt="marca da loja">
    </div>
</div>
</div>`
    ];

function banner(bannerAtual, bannerTotal) {
    document.querySelector('.banner-apresentacao').innerHTML = `${bannerModelo[bannerAtual]}`;
    bannerPreview(bannerAtual, bannerTotal);
}

function bannerPreview(bannerAtual, bannerTotal) {
    document.querySelector('.banner-preview').innerHTML = "";
    for (var i = 0; i <= bannerTotal; i++) {
        if (i == bannerAtual) {
            document.querySelector('.banner-preview').innerHTML += `<span onclick="banner(${i}, ${bannerTotal})" class="banner-progress progress-checked ">
            <div style="background-image: url(assets/IMG/BANNER/${bannerPreviaImg[i]})" class="preview-img"></div>
            </span>`;
        } else {
            document.querySelector('.banner-preview').innerHTML += `<span onclick="banner(${i}, ${bannerTotal})" class="banner-progress">
            <div style="background-image: url(assets/IMG/BANNER/${bannerPreviaImg[i]})" class="preview-img"></div>
            </span>`;
        }

    }
}
setInterval(() => {
    bannerAtual++;
    bannerAtual = bannerAtual > bannerTotal ? 0 : bannerAtual;
    banner(bannerAtual, bannerTotal);
}, 30000);
banner(bannerAtual, bannerTotal);

//Destaque VS Recente

document.querySelectorAll('.btn-anuncio')[0].addEventListener('click', (e) => {
    e.target.classList.add('btn-checked');
    document.querySelectorAll('.btn-anuncio')[1].classList.remove('btn-checked');
    document.querySelector('.inicio-conteudo-anuncio-destaque').classList.remove('dnone-item-anuncio');
    document.querySelector('.inicio-conteudo-anuncio-recente').classList.add('dnone-item-anuncio');
});
document.querySelectorAll('.btn-anuncio')[1].addEventListener('click', (e) => {
    e.target.classList.add('btn-checked');
    document.querySelectorAll('.btn-anuncio')[0].classList.remove('btn-checked');
    document.querySelector('.inicio-conteudo-anuncio-destaque').classList.add('dnone-item-anuncio');
    document.querySelector('.inicio-conteudo-anuncio-recente').classList.remove('dnone-item-anuncio');
});

function criarConteudo(dados, divSelecao, arquivo) {
    let div = document.querySelector(`.${divSelecao}`);

    dados.map(dados => {
        if (dados.tabela == arquivo) {
            let precoProd = dados.preco;
            //precoProd = precoProd.toFixed(2)
            precoProd = precoProd.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            div.innerHTML +=
                `<a href="produto.html?id=${dados.id}&arquivo=${arquivo}"><div class="card-slider-anuncio-item">
        <h3>${dados.tipo}</h3>
        <h2>${dados.nome}</h2>
        <div class="card-slider-item-img">
            <img src="./assets/IMG/PRODUTOS/${dados.img}" alt="produto da loja">
        </div>
        <div class="card-slider-item-priceCar flex-between-display">
            <p>${precoProd}</p>
            <div class="card-slider-item-addcar flex-center-display"><i data-id="${dados.id}" data-arquivo="${arquivo}" data-preco="${dados.preco}" data-nome="${dados.nome}" data-img="${dados.img}" class="addCarrinho fas fa-cart-plus"></i></div>
        </div>
        <div class="card-slider-item-favorito flex-center-display">
            <button><i class="far fa-heart"></i>&nbsp;Adicionar aos favoritos</button>
        </div>
    </div></a>`;
        }
    })
    document.querySelector('.loading').classList.add('loading-none')
}


ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        criarConteudo(dados, 'card-1', 'irrigacao');
        setTimeout(() => { scrollCardSlider(); }, 500);
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
        const dados2 = JSON.parse(resposta);
        criarConteudo(dados2, 'card-2', 'bombadagua');
        setTimeout(() => { scrollCardSlider(); }, 500);
    },
    erro(e) {
        const msg2 = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg2);
    }
});

let slidertamanho = document.querySelectorAll('.card-slider-conteudo');
let sliderProxNext = document.querySelectorAll(`.slider-vnext`);
var sliderTotalCard_1, sliderTotalCard_2, cardSlider_cardTamanho, cardSlider_totalMovido, cardSlider_tamanhoContainer;
function scrollCardSlider() {
    sliderTotalCard_1 = document.querySelectorAll(`.${slidertamanho[0].classList[1]} .card-slider-anuncio-item`);
    sliderTotalCard_2 = document.querySelectorAll(`.${slidertamanho[1].classList[1]} .card-slider-anuncio-item`);
    cardSlider_cardTamanho = [sliderTotalCard_1[0].clientWidth, sliderTotalCard_2[0].clientWidth];
    cardSlider_totalMovido = [sliderTotalCard_1[0].clientWidth, sliderTotalCard_2[0].clientWidth];
    cardSlider_tamanhoContainer = [(sliderTotalCard_1[0].clientWidth * sliderTotalCard_1.length), (sliderTotalCard_2[0].clientWidth * sliderTotalCard_2.length)];
}

let right_mover = (index) => {
    if (cardSlider_totalMovido[index] < cardSlider_tamanhoContainer[index]) {
        cardSlider_totalMovido[index] += cardSlider_cardTamanho[index];
        slidertamanho[index].scrollTo(cardSlider_totalMovido[index], 0);
    }
}
let left_mover = (index) => {
    if (cardSlider_totalMovido[index] > 0) {
        cardSlider_totalMovido[index] -= cardSlider_cardTamanho[index];
        slidertamanho[index].scrollTo(cardSlider_totalMovido[index], 0);
    }
}

sliderProxNext[1].onclick = () => { right_mover(0); }
sliderProxNext[0].onclick = () => { left_mover(0); }
sliderProxNext[3].onclick = () => { right_mover(1); }
sliderProxNext[2].onclick = () => { left_mover(1); }

