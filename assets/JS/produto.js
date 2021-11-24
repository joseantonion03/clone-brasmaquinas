const magnifying_area = document.getElementById("magnifying_area");
const magnifying_img = document.getElementById("magnifying_img");

magnifying_area.style.height = `${magnifying_img.clientHeight}px`;
magnifying_area.addEventListener("mousemove", function (event) {
    var clientX = event.clientX - magnifying_area.offsetLeft;
    var clientY = event.clientY - magnifying_area.offsetTop;

    var mWidth = magnifying_area.offsetWidth
    var mHeight = magnifying_area.offsetHeight
    clientX = clientX / mWidth * 100
    clientY = clientY / mHeight * 100

    magnifying_img.style.transform = 'translate(-' + clientX + '%, -' + clientY + '%) scale(2)'
})

magnifying_area.addEventListener("mouseleave", function () {
    magnifying_img.style.transform = 'translate(-50%,-50%) scale(1)'
})
function imagensReservas() {
    const imagensPreview = document.querySelectorAll('.venda-img-opcoes img');
    imagensPreview.forEach((e) => {
        e.addEventListener('click', (e)=> {
            imagensPreview.forEach((e) => {
                e.classList.remove('img-click');
            })
            magnifying_img.src = e.target.src;
            e.target.classList.add('img-click')
            magnifying_area.style.height = `${magnifying_img.clientHeight}px`;
        });
    });
}
function mudarImg(e) {
    imagensPreview.forEach((e) => {
        e.classList.remove('img-click');
    })
    magnifying_img.src = e.target.src;
    e.target.classList.add('img-click')
    magnifying_area.style.height = `${magnifying_img.clientHeight}px`;
}
document.querySelector('#valorFrete').addEventListener('keypress', (event) => {
    let valorInput = event.which || event.keyCode;
    if (valorInput >= 48 && valorInput <= 57) {
        if (event.target.value.length == 5) {
            event.target.value += '-'
        }
    } else {
        setTimeout(() => {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        }, 100)
    }
});
const botaoTitutoDescricao = document.querySelectorAll('.btn-descricao');
botaoTitutoDescricao.forEach((e) => {
    e.addEventListener('click', abrirDescricaoProduto);
})
function abrirDescricaoProduto(e) {
    document.querySelector(`.btn-descricao-check`).classList.remove('btn-descricao-check');
    document.querySelector(`.dBlock-descDetAva`).classList.remove('dBlock-descDetAva');
    e.target.classList.add('btn-descricao-check');
    document.querySelector(`.venda-descricao-conteudo .${e.target.dataset.id}`).classList.add('dBlock-descDetAva');
}
let numImagemTotal = 0;
let numImagemAtual = 0;
let imagensProduto = [];
var url = window.location.href;
url = url.split('produto.html');
url = url[0];


document.querySelector('.venda-lupa').addEventListener('click', () => {
    const imagensTotal = document.querySelectorAll('.venda-img-opcoes img');
    if (imagensTotal.length == 0) {
        document.querySelector('.fotosProdutos').classList.remove('fotosProdutos-show');
        alert('Desculpa, mas nenhuma imagem foi adicionada')
    } else {
        imagensTotal.forEach((e) => {
            numImagemTotal++;
            imagensProduto.push(e.src);
        });
        let nomeImg = document.querySelector('.img-click');
        let nomeImgP = nomeImg.src.toString().replace(`${url}assets/IMG/PRODUTOS/`, '')
        document.querySelector('.fotosProdutos-p').innerHTML = nomeImgP;
        document.querySelector('.fotosProdutos-imgSrc').src = nomeImg.src;
        document.querySelector('.fotoProdutos-atual').innerHTML = numImagemAtual + 1;
        document.querySelector('.fotoProdutos-total').innerHTML = numImagemTotal;
        document.querySelector('.fotosProdutos').classList.add('fotosProdutos-show')
    }
})
document.querySelector('.fotosProdutos-close').addEventListener('click', () => {
    numImagemAtual = 0;
    numImagemTotal = 0;
    document.querySelector('.fotosProdutos-imgSrc').src = "./assets/IMG/loading-buffering.gif";
    document.querySelector('.fotosProdutos').classList.remove('fotosProdutos-show');
})

document.querySelector('.fotosProdutos-left').addEventListener('click', () => {
    numImagemAtual -= 1;
    numImagemAtual = numImagemAtual < 0 ? (numImagemTotal - 1) : numImagemAtual;
    fotosProdutos(numImagemAtual, imagensProduto);
});
document.querySelector('.fotosProdutos-right').addEventListener('click', () => {
    numImagemAtual += 1;
    numImagemAtual = numImagemAtual == numImagemTotal ? 0 : numImagemAtual;
    fotosProdutos(numImagemAtual, imagensProduto);
});

function fotosProdutos(num, arrayFoto) {
    document.querySelector('.fotosProdutos-imgSrc').src = arrayFoto[num];
    document.querySelector('.fotoProdutos-atual').innerHTML = num + 1;
}
function fotosProdutosArrowLeft(num, arrayFoto) {
    numImagemAtual -= 1;
    numImagemAtual = numImagemAtual < 0 ? (numImagemTotal - 1) : numImagemAtual;
    fotosProdutos(num, arrayFoto);
}
function fotosProdutosArrowRight(num, arrayFoto) {
    numImagemAtual += 1;
    numImagemAtual = numImagemAtual == numImagemTotal ? 0 : numImagemAtual;
    fotosProdutos(num, arrayFoto);
}
document.body.addEventListener('keydown', (event) => {
    let valorTeclado = event.which || event.keyCode;
    if (valorTeclado == 37 && numImagemTotal > 0) {
        fotosProdutosArrowLeft(numImagemAtual, imagensProduto);
    } else if (valorTeclado == 39 && numImagemTotal > 0) {
        fotosProdutosArrowRight(numImagemAtual, imagensProduto);
    }
});

var getUrl = location.search.slice(1);
var getUrlParte = getUrl.split('&');
var data = {};
getUrlParte.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});

ajax({
    url: "assets/DADOS/bd.json",
    metodo: "get",
    sucesso(resposta) {
        const dados = JSON.parse(resposta);
        getConteudoBd(dados, data.id, data.arquivo)
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.texto}`);
        console.log(msg);
    }
});

function getConteudoBd(dados, id, tabela) {
    dados.map(item => {
        if (item.id == id && item.tabela == tabela) {
            (item.preco) = (item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.querySelectorAll('.nome-dir')[0].innerHTML = item.nome
            document.querySelectorAll('.tipo-dir')[0].innerHTML = item.tipo
            document.querySelectorAll('.nome-dir')[1].innerHTML = item.nome
            document.querySelectorAll('.tipo-dir')[1].innerHTML = item.tipo
            document.querySelector('.preco-dir').innerHTML = item.preco
            document.querySelector('#magnifying_img').src = `./assets/IMG/PRODUTOS/${item.img}`

            let imageDemonstracao = document.querySelector('.venda-img-opcoes')
            for (let value in item.imgSm) {
                if (value == 0) {
                    imageDemonstracao.innerHTML = `<img class="img-click" src="./assets/IMG/PRODUTOS/${item.imgSm[value]}" alt="imagem do produto">`;
                } else {
                    imageDemonstracao.innerHTML += `<img src="./assets/IMG/PRODUTOS/${item.imgSm[value]}" alt="imagem do produto">`;
                }
            }
        }
    });
    setTimeout(() => {
        imagensReservas();
        document.querySelector('.loading').classList.add('loading-none')
    }, 1000);
}