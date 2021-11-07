const lista = document.getElementById("lista");
const apiUrl = 'http://localhost:3000/jogo';
console.log(apiUrl);
var edicao = false;

const getJogos = async ()=> {
    const resposta = await fetch(apiUrl);
    const jogos = await resposta.json();
    console.log(jogos);
    lista.innerHTML = "";
    jogos.map((jogo)=> {
        lista.insertAdjacentHTML('beforeend',`
        <div class="col">
            <div class="card">
             <figure>
                <img src="${jogo.imagem}" class="card-img-top" alt="...">
                <span class="badge bg-dark">
                    <figcaption>Avaliação: <h4>${jogo.avaliacao}</h4></figcaption>
                </span>
            </figure>
            <div class="card-body">
                <h5 class="card-title"><strong>${jogo.titulo}</strong></h5>
                <span class="badge bg-dark">${jogo.genero}</span>
                <div>
                    <button class="btn btn-primary" onclick="editJogo('${jogo.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteJogo('${jogo.id}')">Excluir</button>
                </div>
            </div>
        </div>
        `)
    })
};
getJogos();

let titulo = document.getElementById("titulo");
let genero = document.getElementById("genero");
let imagem = document.getElementById("imagem");
let nota = document.getElementById("nota");
let idR;

const clearFields= () => {
    titulo.value = "";
    genero.value = "";
    imagem.value = "";
    nota.value = "";
    idR = "";
};

const submitForm = async (event) => {
    event.preventDefault();
    const jogo = {
        titulo: titulo.value,
        genero: genero.value,
        imagem: imagem.value,
        avaliacao: nota.value
    };
    
    if(edicao) {
        putJogo(jogo, idR);
    } else {
        createJogo(jogo);
    };

    clearFields();
    lista.innerHTML = '';
};

const createJogo = async (jogo)=> {
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(jogo),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    });
    const response = await fetch(request);
    const result = await response.json();
    clearFields();
    alert(result.message);
    getJogos();
};

const getJogoById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
};
const editJogo = async (id) => {
    edicao = true;
    const jogoUpdate = await getJogoById(id);
    idR = id;
    titulo.value = jogoUpdate.titulo;
    genero.value = jogoUpdate.genero;
    imagem.value = jogoUpdate.imagem;
    nota.value = jogoUpdate.avaliacao
};

const putJogo = async (jogo, id)=> {
    const Update = new Request(`${apiUrl}/${id}`, {
        method: 'Put',
        body: JSON.stringify(jogo),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    });
    const response = await fetch(Update);
    const result = await response.json();
    clearFields();
    edicao = false;
    alert(result.message);
    getJogos();
};

const deleteJogo = async (id) => {
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    });
    const response = await fetch(request);
    const result = await response.json();
    alert(result.message);
    getJogos();
};