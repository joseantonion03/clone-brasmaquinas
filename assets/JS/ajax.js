function ajax(config) {
    const xhr = new XMLHttpRequest();
    xhr.open(config.metodo, config.url, true);

    xhr.onload = e => {
        if (xhr.status === 200) {
            config.sucesso(xhr.response);
        } else if (xhr.status >= 400) {
            config.erro({
                codigo: xhr.status,
                texto: xhr.statusText
            });
        }
    }
    xhr.send();
}