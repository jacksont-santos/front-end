alert('Brabo');
const lista = document.getElementById("lista");
const chamadaAPI = fetch('http://localhost:3000');
console.log(chamadaAPI);
chamadaAPI.then((response)=> {
    console.log(response);
    return response.json()
}) .then((jogosdados)=> {
    jogosdados.map((jogo)=>{
        lista.insertAdjacentHTML('beforeend',`
        <li>
            <h2>Título: ${jogo.titulo}</h2>
            <h3>Gênero: ${jogo.genero}</h3>
            <figure>
                <img src="${jogo.imagem}" alt="">
                <figcaption>Avaliação: ${jogo.avaliacao}</figcaption>
            </figure>
        </li>
        `)
    })
});