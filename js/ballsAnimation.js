/* libera música após o click ou ao abrir a página pode variar como navegador
    Aqui você adiciona um evento global na janela (window).
    { once: true }) aciona a função uma única vez 
 */

window.addEventListener('click', function () {

    // seleciona a música pelo id do elemento html
    const audio = document.getElementById('meuAudio');

    if (audio) {
        audio.muted = false;
        audio.play();
    }

}, { once: true });


// pega pokebolas vermelhas + azuis selecionando o elemento pela classe
const pokeballs = document.querySelectorAll(".pokeball, .pokeball-2");

// seleciona a música pelo id do elemento html
const sound = document.getElementById("pokeSound");

/* exemplos de loops que realizam a mesma tarefa e analisaram todo os elementos que estão na constante pokeballs

    modelo 1°

    for (let i = 0; i < pokeballs.length; i++) {

        const ball = pokeballs[i];
        const index = i;

    }

    modelo 2° (o que foi utilizado no script)

    pokeballs.forEach((ball, index) => {

    });
*/

pokeballs.forEach((ball, index) => {

    // quando o elemento html é clicado aciona a função abaixo

    ball.addEventListener("click", function () {

        /*
            ball → elemento HTML atual
            index → posição desse elemento na lista
            
            as funções a seguir adicionam ou removem classes aos elementos selecionados
            pela classe o índice indica qual elemento foi selecionado.

            adiciona | this.classList.add()
            remove   | this.classList.remove()

        */


        // impede clique duplo se do item html se o mesmo contenha a classe "opened"
        if (this.classList.contains("opened")) {
            return;
        }

        // selecionando o elemento pela classe
        const opened = document.querySelectorAll(".opened");

        // evita erro se ainda não carregou
        if (!grupo_1.length || !grupo_2.length) {
            console.log("Pokémons ainda carregando...");
            return;
        }

        // remove a animação através da esclusão da classe rotate
        this.classList.remove("rotate");

        // o navegador é obrigado a recalcular layout e estilos. (Reflow)
        void this.offsetWidth;

        // adiciona novamente a classe e animação funciona normalmente
        this.classList.add("rotate");


        // esconde a pokebola depois da animação porem com um delay para o estilo harmonizar com a animação
        setTimeout(() => {
            this.classList.add("opened");
        }, 1700);

        // remove permanente a animação do elemento selecionado com o delay para que uma animação do "opened" não conflite com a do "rotate"
        setTimeout(() => {
            this.classList.remove("rotate");
        }, 3000);

        // toca o son da abertura da pokebola
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }

        // Ecolha de pokemon se o ídice é maior que 3 é um Pokémon do player 1 se não  é um Pokémon do player 2
        let pokemon;


        if (index < 3) {
            pokemon = grupo_1[index];
        } else {
            pokemon = grupo_2[index - 3];
        }

        // se o Pokémon não existir interrompe a função evitando o erro.
        if (!pokemon) return;

        /* 
            const sprite imagem a ser exibida após a abertura da pokebolas 
            Optional Chaining (?.) evita erro se a imagem animada não exitir retornando undefined
            o || leva para próxima linha tendo assim 4 opções de imagem se a anterir não existir retorna apenas o valor que é válido
            lembrando que todos caminhos são opções apresentadas na API.
        */
        const sprite =
            pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default
            ||
            pokemon.sprites?.other?.dream_world?.front_default
            ||
            pokemon.sprites?.other?.home?.front_default
            ||
            pokemon.sprites?.front_default;

        // seleciona o elemento html que possui a classe pokemon-slot

        const slot = this.parentElement.querySelector(".pokemon-slot");

        if (slot) {

            const tipos = pokemon.types
                .map(t => t.type.name)
                .join(" | ");

            const habilidades = pokemon.abilities
                .slice(0, 2)
                .map(a => a.ability.name)
                .join(" | ");

            const fraquezas = pokemon.types
                .map(t => t.type.name)
                .join(" | ");

            slot.innerHTML = `
                <div class="pokemon-card">
                    <img src="${sprite}" alt="${pokemon.name}">
                    <div class="pokemon-info">
                        <p>
                            <b>${pokemon.name.split('-').filter(Boolean)[0]}</b>
                        </p>
                        <p>
                            <strong>Tipo:</strong> ${tipos}
                        </p>

                        <p>
                            <strong>Poder:</strong> ${habilidades}
                        </p>
                    </div>
                </div>
            `;
        }

    });

});