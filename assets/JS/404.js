document.querySelectorAll('.categoria-item').forEach((item)=>{
    item.addEventListener('click', menuPageLadoA);
});

function menuPageLadoA(e){
    document.querySelectorAll(`.categoria-item categoria-item-corpo`).forEach((e)=>{
        document.querySelector(`.categoria-item .${e.dataset.id}`).classList.remove('categoria-item-corpo-show');
        console.log(e.dataset.id);
    })
    document.querySelector(`.categoria-item .${e.target.dataset.id}`).classList.toggle('categoria-item-corpo-show');
}
