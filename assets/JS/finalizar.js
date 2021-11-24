document.querySelector('#edDiferente').addEventListener('click', ()=>{
    document.querySelector('.outroEndereco').classList.toggle('outroEndereco-show');
});
document.querySelectorAll('.pagamento').forEach(element => {
    element.addEventListener('click', pagamento)
});


function pagamento(e){
    document.querySelectorAll('.alert-pagamento-card').forEach((element)=>{
        element.classList.remove('alert-pagamento-card-show');
    });
    document.querySelector(`.alert-pagamento .${e.target.dataset.id}`).classList.add('alert-pagamento-card-show');
}