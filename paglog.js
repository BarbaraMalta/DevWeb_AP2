function mostrarCarregando() {
    const mensagemCarregando = document.getElementById('espera');
    mensagemCarregando.style.display = 'block';
}

function ocultarCarregando() {
    const mensagemCarregando = document.getElementById('espera');
    mensagemCarregando.style.display = 'none';
}

const pega_json = async (caminho, endpoint) => {
    const resposta = await fetch(caminho + endpoint);
    const dados = await resposta.json();
    return dados;
}

const container = document.getElementById('container');
const botoes = document.getElementById('botoes');


const montaBotao = () => {
    const botao1 = document.createElement("button")
    const newContent1 = document.createTextNode("Elenco Completo");
    botao1.appendChild(newContent1);
    botao1.id = 'botao1'
    
    const botao2 = document.createElement("button")
    const newContent2 = document.createTextNode("Feminino");
    botao2.appendChild(newContent2);
    botao2.id = 'botao2'

    const botao3 = document.createElement("button")
    const newContent3 = document.createTextNode("Masculino");
    botao3.appendChild(newContent3);
    botao3.id = 'botao3'

    const botao4 = document.createElement("button")
    const newContent4 = document.createTextNode("Limpar Pesquisa")
    botao4.appendChild(newContent4);
    botao4.id = 'botao4'
    botao4.onclick = function() {
        limparPesquisa()
    }

    botoes.appendChild(botao1)
    botoes.appendChild(botao2)
    botoes.appendChild(botao3)
    botoes.appendChild(botao4)
};
/*for (let i = 0; i < dados.length; i++){
    let atleta = dados[i]; */

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const link = document.createElement("a");

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome

    link.innerHTML = "Saiba mais!";
    link.href =`detalhamento.html?id=${atleta.id}`;
    cartao.appendChild(link);

    container.appendChild(cartao)

}

montaBotao()

document.getElementById('logout').onclick = () => {sessionStorage.removeItem('logado'); window.location = "index.html"}

let endpoint = '';

const elencoCompleto = document.getElementById('botao1');
const feminino = document.getElementById('botao2');
const masculino = document.getElementById('botao3');
const filtroMenu = document.getElementById('filtroMenu');
const barraPesquisa = document.getElementById('barraPesquisa');
const limparPesquisa = document.getElementById('botao4');

function limpaFiltro() {
    container.innerHTML = '';
    mostrarCarregando();
}

function filtrarJogadoresPesquisa (jogadores, escrita) {
    return jogadores.filter(jogador => jogador.nome.toLowerCase().includes(escrita.toLowerCase()))
}


function exibeelenco(endpoint) {
    limpaFiltro();
    mostrarCarregando();
    container.innerHTML = '';

    pega_json('https://botafogo-atletas.mange.li/2024-1/', endpoint).then((retorno) => {
        ocultarCarregando();
        retorno.forEach((atleta) => montaCard(atleta));
    }).catch(() => {
        ocultarCarregando();
        alert('Erro no carregamento. Tente novamente.');
    });
}

function exibirJogadores2(jogadores) {
    limpaFiltro()
    ocultarCarregando()
    jogadores.forEach(atleta => montaCard(atleta))
}

if (sessionStorage.getItem('logado')) {
    filtroMenu.addEventListener('change', function() {
        const valorSelecionado = filtroMenu.value;

        if (valorSelecionado) {
            if (valorSelecionado === 'masculino') {
                endpoint = 'masculino';
                exibeelenco(endpoint)
            } else if (valorSelecionado === 'feminino') {
                endpoint = 'feminino';
                exibeelenco(endpoint)
            } else if (valorSelecionado === 'elencoCompleto') {
                endpoint = 'all';
                exibeelenco(endpoint)
            }
        }
    });

    const barraPesquisa = document.getElementById('pesquisa')

    barraPesquisa.addEventListener('input', function () {
        const escrita = barraPesquisa.value

        fetch('https://botafogo-atletas.mange.li/2024-1/all').then(response => response.json()).then(jogadoress => {
            const jogadoresFiltrados = filtrarJogadoresPesquisa(jogadoress, escrita)
            exibirJogadores2(jogadoresFiltrados)
        })
    })

    masculino.addEventListener("click", function() {
        endpoint = 'masculino'
        exibeelenco(endpoint)
    })

    feminino.addEventListener('click', function() {
        endpoint = 'feminino'
        exibeelenco(endpoint)
    })

    elencoCompleto.addEventListener('click', function() {
        endpoint = 'all'
        exibeelenco(endpoint)
    })

    limparPesquisa.addEventListener('click', function() {
        limpaFiltro()
        ocultarCarregando()
    })

} else {
    document.body.innerHTML = `<h3>Você precisa estar logado!</h3>`
}