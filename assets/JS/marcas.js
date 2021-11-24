let scrollMarcas = document.querySelector('.marcas-slider-conteudo');
let tamanhoInicial = document.querySelectorAll('.marcas-slider-card');
let totCardMarcas = tamanhoInicial.length;
tamanhoInicial = tamanhoInicial[0].clientWidth;
totCardMarcas *= tamanhoInicial;
let scrollPosicao = tamanhoInicial;

document.querySelectorAll('.marcas-slider-vnext')[0].addEventListener('click', () => {
    if (scrollPosicao >= 0) {
        scrollPosicao -= tamanhoInicial;
        scrollMarcas.scrollTo(scrollPosicao, 0);
    }
});
document.querySelectorAll('.marcas-slider-vnext')[1].addEventListener('click', () => {
    if (scrollPosicao < totCardMarcas) {
        scrollPosicao += tamanhoInicial;
        scrollMarcas.scrollTo(scrollPosicao, 0);
    }
});