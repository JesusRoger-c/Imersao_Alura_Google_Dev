let dados = [];

let cardContainer = document.querySelector(".card-container");

let campoBusca = document.querySelector("header input");

 

const contextoInicial = document.getElementById('contexto-inicial');

const rankingMusicais = document.getElementById('ranking-musicais');

 

async function iniciarBusca() {

    if (dados.length === 0) {

        try {

            let resposta = await fetch("data.json"); // Corrigido para buscar o arquivo na mesma pasta

            dados = await resposta.json();

            renderizarCards(dados); // Exibe todos os cards inicialmente

        } catch (error) {

            console.error("Erro ao buscar ou processar os dados:", error);

            return;

        }

 

    }

    const termoBusca = campoBusca.value.toLowerCase();

 

    if (termoBusca) {

        contextoInicial.classList.add('hidden');

        rankingMusicais.classList.add('hidden');

    } else {

        contextoInicial.classList.remove('hidden');

        rankingMusicais.classList.remove('hidden');

    }

 

    const dadosFiltrados = dados.filter(dado =>

        dado.nome.toLowerCase().includes(termoBusca) ||

        dado.descricao.toLowerCase().includes(termoBusca) ||

        dado.ano.toString().includes(termoBusca)

    );

    renderizarCards(dadosFiltrados);    

}

 

function renderizarCards(dados) {

    cardContainer.innerHTML = "";

    for (let dado of dados) {

        let article = document.createElement("article");

        article.classList.add("card");

        // A estrutura foi corrigida para usar a imagem como cabeçalho e agrupar o texto.

        article.innerHTML = `

            <a href="${dado.link}" target="_blank" class="card-image-link">

                <img src="${dado.imagem}" alt="Cena do musical ${dado.nome}" class="card-image">

            </a>

            <div class="card-content">

                <h2>${dado.nome}</h2>

                <p><strong>Ano de estreia no Brasil:</strong> ${dado.ano}</p>

                <p>${dado.descricao}</p>

                <a href="${dado.link}" target="_blank" class="card-button">Saber mais</a>

            </div>

        `;

        cardContainer.appendChild(article);

    }

}

 

function voltarParaInicio() {

    campoBusca.value = ""; // Limpa o campo de busca

    iniciarBusca(); // Renderiza todos os cards novamente

}