document.querySelector('.open-header-acoes-produto-conta').addEventListener('click', () => {
    document.querySelector('.header-acoes-produto-conta-lista').classList.toggle('header-acoes-produto-conta-lista-show')
});
document.querySelector('.header-departamentos').addEventListener('click', () => {
    document.querySelector('.header-acoes-produto-conta-lista').classList.remove('header-acoes-produto-conta-lista-show')
});
document.querySelector('.header-contato').addEventListener('click', () => {
    document.querySelector('.header-acoes-produto-conta-lista').classList.remove('header-acoes-produto-conta-lista-show')
});

document.querySelector('#container').addEventListener('click', () => {
    document.querySelector('.header-acoes-produto-conta-lista').classList.remove('header-acoes-produto-conta-lista-show')
});
//Abrir carrinho
document.querySelector('.header-acoes-produto-carrinho').addEventListener('click', () => {
    document.querySelector('.container-carrinho').classList.add('container-carrinho-show');
    document.querySelector('.container-carrinho-card').classList.add('container-carrinho-card-show');
    getCarrinho();
});
document.querySelector('.header-navegacao-produto-carrinho').addEventListener('click', () => {
    document.querySelector('.container-carrinho').classList.add('container-carrinho-show');
    document.querySelector('.container-carrinho-card').classList.add('container-carrinho-card-show');
    getCarrinho();
});
document.querySelector('.container-carrinho-card-title-btnClose').addEventListener('click', () => {
    document.querySelector('.container-carrinho').classList.remove('container-carrinho-show');
    document.querySelector('.container-carrinho-card').classList.remove('container-carrinho-card-show');
});
document.querySelector('.close-container-carrinho').addEventListener('click', () => {
    document.querySelector('.container-carrinho').classList.remove('container-carrinho-show');
    document.querySelector('.container-carrinho-card').classList.remove('container-carrinho-card-show');
});


//Abrir categoria
//item 1
document.querySelector('.item1').addEventListener('mouseenter', () => {
    document.querySelector('.item-energiaSolar').classList.add('item-energiaSolar-show');
});
document.querySelector('.item1').addEventListener('mouseleave', () => {
    document.querySelector('.item-energiaSolar').classList.remove('item-energiaSolar-show');
});
//item 2
document.querySelector('.item2').addEventListener('mouseenter', () => {
    document.querySelector('.item-irrigacaoJardim').classList.add('item-irrigacaoJardim-show');
});
document.querySelector('.item2').addEventListener('mouseleave', () => {
    document.querySelector('.item-irrigacaoJardim').classList.remove('item-irrigacaoJardim-show');
});
//item 3
document.querySelector('.item3').addEventListener('mouseenter', () => {
    document.querySelector('.item-irrigacaoAgricola').classList.add('item-irrigacaoAgricola-show');
});
document.querySelector('.item3').addEventListener('mouseleave', () => {
    document.querySelector('.item-irrigacaoAgricola').classList.remove('item-irrigacaoAgricola-show');
});
//item 4
document.querySelector('.item4').addEventListener('mouseenter', () => {
    document.querySelector('.item-bombaHidraulica').classList.add('item-bombaHidraulica-show');
});
document.querySelector('.item4').addEventListener('mouseleave', () => {
    document.querySelector('.item-bombaHidraulica').classList.remove('item-bombaHidraulica-show');
});
//item 5
document.querySelector('.item5').addEventListener('mouseenter', () => {
    document.querySelector('.item-pecaEletricas').classList.add('item-pecaEletricas-show');
});
document.querySelector('.item5').addEventListener('mouseleave', () => {
    document.querySelector('.item-pecaEletricas').classList.remove('item-pecaEletricas-show');
});
//item 6
document.querySelector('.item6').addEventListener('mouseenter', () => {
    document.querySelector('.item-tudoConexoes').classList.add('item-tudoConexoes-show');
});
document.querySelector('.item6').addEventListener('mouseleave', () => {
    document.querySelector('.item-tudoConexoes').classList.remove('item-tudoConexoes-show');
});

//Abrir menu mobile

document.querySelector('.open-menu-header').addEventListener('click', () => {
    document.querySelector('#navegacao').classList.add('navegacao-mobile');
    document.querySelector('#navegacao .header-departamentos').classList.add('header-departamentos-mobile');
});
document.querySelector('.close-navegacao').addEventListener('click', () => {
    document.querySelector('#navegacao .header-departamentos').classList.remove('header-departamentos-mobile');
    document.querySelector('#navegacao').classList.remove('navegacao-mobile');
});
document.querySelectorAll('.item-menu').forEach((e) => {
    e.addEventListener('click', menuItem);
});
var valueMenuAnterior;
function menuItem(e) {
    if (valueMenuAnterior !== e.target.dataset.id) {
        document.querySelectorAll('.item-menu-show').forEach((e) => {
            e.classList.remove('item-menu-show')
        });
    }
    document.querySelector(`#navegacao .${e.target.dataset.id}`).classList.toggle(`item-menu-show`);
    valueMenuAnterior = e.target.dataset.id;
}
const moverTela = document.querySelector('.mover');

window.addEventListener('scroll', (e) => {
    let windowY = window.pageYOffset;
    if (windowY >= 240) {
        document.querySelector('.header-contato').classList.add('header-dnone');
        document.querySelector('.header-departamentos').classList.add('header-dnone');
        document.querySelector('#header').classList.add('header-acoes-fixed');
    } else {
        document.querySelector('.header-contato').classList.remove('header-dnone');
        document.querySelector('.header-departamentos').classList.remove('header-dnone');
        document.querySelector('#header').classList.remove('header-acoes-fixed');
    }
    if(windowY > 800){
        moverTela.classList.add('mover-show');
    }else{
        moverTela.classList.remove('mover-show');
    }
});
moverTela.onclick = ()=>{
    document.documentElement.scrollTo(0,0);
}