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
    botao4.appendChild(newContent4)
    botao4.id = 'botao4'
    botao4.onclick = function() {
        filtraJogs()
    }
};

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
    link.href = `detalhamento.html?id=${atleta.id}`;
    cartao.appendChild(link);

    container.appendChild(cartao);
};

montaBotao();

document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location = "index.html";
}

let endpoint = '';
const containerPrincipal = document.getElementById('container');
const elencoCompleto = document.getElementById('botao1');
const feminino = document.getElementById('botao2');
const masculino = document.getElementById('botao3');
const filtroMenu = document.getElementById('filtroMenu');
const barraPesquisa = document.getElementById('barraPesquisa');

function limpaFiltro() {
    containerPrincipal.innerHTML = '';
}

function mostraCarregando(texto) {
    mensagemCarregando.textContent = `Carregando ${texto}...`;
    carregando.style.display = 'block';
}

function esconderCarregando() {
    carregando.style.display = 'none';
}

function exibeelenco(endpoint) {
    limpaFiltro();
    mostraCarregando("Jogadores");
    container.innerHTML = '';

    pega_json('https://botafogo-atletas.mange.li/2024-1/', endpoint).then((retorno) => {
        esconderCarregando();
        retorno.forEach((atleta) => montaCard(atleta));
    }).catch(() => {
        esconderCarregando();
        alert('Erro no carregamento. Tente novamente.');
    });
}

function filtraJogs(jogadores, pesquisa) {
    return jogadores.filter(jogador => jogador.nome.toLowerCase().includes(pesquisa.toLowerCase()));
}

function exibirJogadores(jogadores) {
    limpaFiltro();
    jogadores.forEach((atleta) => montaCard(atleta));
    salvaCards(jogadores);
}

function salvaCards(jogadores) {
    sessionStorage.setItem('cardsRenderizados', JSON.stringify(jogadores));
}

if (sessionStorage.getItem('logado')) {

    filtroMenu.addEventListener('change', function() {
        const valorSelecionado = filtroMenu.value;
        sessionStorage.setItem('filtroSelecionado', valorSelecionado);

        if (valorSelecionado) {
            if (valorSelecionado === 'masculino') {
                endpoint = 'masculino';
                exibeelenco(endpoint);
            } else if (valorSelecionado === 'feminino') {
                endpoint = 'feminino';
                exibeelenco(endpoint);
            } else if (valorSelecionado === 'elencoCompleto') {
                endpoint = 'all';
                exibeelenco(endpoint);
            }
        }
    });

    masculino.addEventListener("click", function() {
        endpoint = 'masculino';
        exibeelenco(endpoint);
    });

    feminino.addEventListener("click", function() {
        endpoint = 'feminino';
        exibeelenco(endpoint);
    });

    elencoCompleto.addEventListener("click", function() {
        endpoint = 'all';
        exibeelenco(endpoint);
    });

    barraPesquisa.addEventListener('input', function() {
        const pesquisa = barraPesquisa.value;
        sessionStorage.setItem('barraPesquisa', pesquisa);

        if (pesquisa === "") {
            fetch('https://botafogo-atletas.mange.li/2024-1/all')
                .then(response => response.json())
                .then(jogadores => {
                    exibirJogadores(jogadores);
                })
                .catch(error => {
                    console.error('Erro ao buscar jogadores:', error);
                });
        } else {
            fetch('https://botafogo-atletas.mange.li/2024-1/all')
                .then(response => response.json())
                .then(jogadores => {
                    const jogadoresFiltrados = filtraJogs(jogadores, pesquisa);
                    exibirJogadores(jogadoresFiltrados);
                })
                .catch(error => {
                    console.error('Erro ao buscar jogadores:', error);
                });
        }
    });

} else {
    document.body.innerHTML = `<h1>Você precisa estar logado</h1>`;
    window.location = "index.html";
}

window.onload = function() {
    const filtroSalvo = sessionStorage.getItem('filtroSelecionado');
    const pesquisaSalva = sessionStorage.getItem('barraPesquisa');
    const cardsSalvos = sessionStorage.getItem('cardsRenderizados');

    if (cardsSalvos) {
        const jogadores = JSON.parse(cardsSalvos);
        exibirJogadores(jogadores);
    } else {
        if (filtroSalvo) {
            filtroMenu.value = filtroSalvo;
            if (filtroSalvo === 'masculino') {
                endpoint = 'masculino';
                exibeelenco(endpoint);
            } else if (filtroSalvo === 'feminino') {
                endpoint = 'feminino';
                exibeelenco(endpoint);
            } else if (filtroSalvo === 'elencoCompleto') {
                endpoint = 'all';
                exibeelenco(endpoint);
            }
        }
        if (pesquisaSalva) {
            barraPesquisa.value = pesquisaSalva;
            fetch('https://botafogo-atletas.mange.li/2024-1/all')
                .then(response => response.json())
                .then(jogadores => {
                    const jogadoresFiltrados = filtraJogs(jogadores, pesquisaSalva);
                    exibirJogadores(jogadoresFiltrados);
                });
        }
    }
};