
// arrays globais
let pokemon_1 = [];
let pokemon_2 = [];

let grupo_1 = [];
let grupo_2 = [];


// busca o JSON e retorna 3 pokemons aleatórios
async function selecionaPokemons() {
    try {
        // lê arquivo json
        const resposta = await fetch('../DB/pokemon.json');
        const dados = await resposta.json();

        // retorna 3 pokemons aleatórios
        console.log(escolhePokemonAleatorio(dados, 3))
        return escolhePokemonAleatorio(dados, 3);

    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        return [];
    }
}


// faz a seleção aleatória
function escolhePokemonAleatorio(lista, quantidade) {
    
    // copia o array e embaralha
    const embaralhado = [...lista.results]
        .sort(() => Math.random() - 0.5);

    // retorna a quantidade desejada
    return embaralhado.slice(0, quantidade);
}


function extrairIds(lista) {
    return lista.map(pokemon =>
        pokemon.url.split('/').filter(Boolean)[5]
    );
}

async function iniciar() {

    const [resultado1, resultado2] = await Promise.all([
        selecionaPokemons(),
        selecionaPokemons()
    ]);

    pokemon_1 = extrairIds(resultado1);
    pokemon_2 = extrairIds(resultado2);

    [grupo_1, grupo_2] = await Promise.all([
        buscarGrupo(pokemon_1),
        buscarGrupo(pokemon_2)
    ]);

    console.log("Grupo 1:", grupo_1);
    console.log("Grupo 2:", grupo_2);

    // exemplo de uso no frontend
    //renderizarGrupo(grupo_1, "time-1");
    //renderizarGrupo(grupo_2, "time-2");
}

function renderizarGrupo(grupo, containerId) {

    const container = document.getElementById(containerId);

    grupo.forEach(pokemon => {
        container.innerHTML += `
            <div>
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.sprites.front_default}">
            </div>
        `;
    });
}

async function buscarPokemon(id) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    return await response.json();
}


// busca todos de um grupo
async function buscarGrupo(listaIds) {
    return await Promise.all(
        listaIds.map(id => buscarPokemon(id))
    );
}
// executa
iniciar();

