const params = new URLSearchParams(window.location.search);


const ids = params.get("id")
console.log(ids)

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho + ids);
    const dados = await resposta.json();
    return dados;
}
const container = document.getElementById("container");


/*for (let i = 0; i < dados.length; i++){
    let atleta = dados[i]; */

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const elenco = document.createElement("p1");
    const n_jogos = document.createElement("p2");
    const posicao = document.createElement("p3");
    const naturalidade = document.createElement("p4");
    const nascimento = document.createElement("p5");
    const altura = document.createElement("p6");
    const no_botafogo_desde = document.createElement("p7")
    const detalhes = document.createElement("p8");

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    
    elenco.innerHTML = atleta.elenco;
    cartao.appendChild(elenco);
    
    n_jogos.innerHTML = atleta.n_jogos;
    cartao.appendChild(n_jogos);
    
    posicao.innerHTML = atleta.posicao;
    cartao.appendChild(posicao);
    
    naturalidade.innerHTML = atleta.naturalidade;
    cartao.appendChild(naturalidade);
    
    nascimento.innerHTML = atleta.nascimento;
    cartao.appendChild(nascimento);
    
    
    altura.innerHTML = atleta.altura;
    cartao.appendChild(altura);
    
    no_botafogo_desde.innerHTML = atleta.no_botafogo_desde;
    cartao.appendChild(no_botafogo_desde);
    
    detalhes.innerHTML = atleta.detalhes;
    cartao.appendChild(detalhes);

    container.appendChild(cartao)

}



if (sessionStorage.getItem('logado')) {
    pega_json('https://botafogo-atletas.mange.li/2024-1/').then(

        (atleta) => montaCard(atleta)
    )
    
} else {
    document.body.innerHTML = `<h2>Você precisa estar logado ter acesso a essas informações!</h2>`
}