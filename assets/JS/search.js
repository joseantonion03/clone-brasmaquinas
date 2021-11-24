document.querySelectorAll('.page-ladoA-item').forEach((item)=>{
    item.addEventListener('click', menuPageLadoA);
});

function menuPageLadoA(e){
    document.querySelectorAll(`.page-ladoA-item page-ladoA-item-corpo`).forEach((e)=>{
        document.querySelector(`.page-ladoA-item .${e.dataset.id}`).classList.remove('page-ladoA-item-corpo-show');
        console.log(e.dataset.id);
    })
    document.querySelector(`.page-ladoA-item .${e.target.dataset.id}`).classList.toggle('page-ladoA-item-corpo-show');
}
