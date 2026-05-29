# ⚡ Entendendo Promise e Async/Await no JavaScript

Este projeto utiliza requisições assíncronas para buscar dados da API Pokémon e renderizar os personagens dinamicamente na interface.

---

# 📌 O que é uma Promise?

Uma `Promise` representa um valor que ainda será resolvido no futuro.

Ela possui 3 estados:

| Estado      | Descrição                             |
| ----------- | ------------------------------------- |
| `Pending`   | A operação ainda está sendo executada |
| `Fulfilled` | A operação foi concluída com sucesso  |
| `Rejected`  | A operação falhou                     |

---

# 📌 Exemplo de Promise

```javascript
const promessa = new Promise((resolve, reject) => {

    let sucesso = true;

    if (sucesso) {
        resolve("Operação concluída");
    } else {
        reject("Erro na operação");
    }

});
```

Consumindo a Promise:

```javascript
promessa
    .then(resultado => {
        console.log(resultado);
    })
    .catch(erro => {
        console.log(erro);
    });
```

---

# 📌 O que é Async/Await?

`async/await` é uma forma moderna e mais legível de trabalhar com Promises.

Ele permite escrever código assíncrono com aparência de código síncrono.

---

# 📌 Função Async

Quando utilizamos:

```javascript
async function exemplo() {

}
```

A função automaticamente retorna uma Promise.

---

# 📌 Await

O `await` faz o JavaScript esperar a Promise terminar antes de continuar.

Exemplo:

```javascript
async function buscarDados() {

    const resposta = await fetch(
        "https://pokeapi.co/api/v2/pokemon/pikachu"
    );

    const dados = await resposta.json();

    console.log(dados);

}
```

---

# 📌 Fluxo da Execução

```text
1. Faz a requisição
2. Espera a resposta chegar
3. Converte JSON
4. Continua a execução
```

---

# 📌 Utilização no Projeto

Neste projeto utilizamos:

* `fetch()` para consumir a PokéAPI
* `async/await` para controlar o fluxo assíncrono
* `Promise.all()` para carregar múltiplos Pokémons simultaneamente

---

# 📌 Buscando Pokémons Aleatórios

```javascript
async function selecionaPokemons() {

    const resposta = await fetch('../DB/pokemon.json');

    const dados = await resposta.json();

    return escolhePokemonAleatorio(dados, 3);

}
```

---

# 📌 O que acontece nessa função?

```text
1. O arquivo JSON é carregado
2. Os dados são convertidos para objeto JavaScript
3. 3 Pokémons aleatórios são selecionados
4. A função retorna os resultados
```

---

# 📌 Promise.all()

O `Promise.all()` executa várias Promises ao mesmo tempo.

Exemplo do projeto:

```javascript
const [resultado1, resultado2] = await Promise.all([
    selecionaPokemons(),
    selecionaPokemons()
]);
```

---

# 📌 Vantagens do Promise.all()

✅ Carrega múltiplas requisições simultaneamente
✅ Melhor performance
✅ Reduz tempo de carregamento
✅ Evita execução sequencial desnecessária

---

# 📌 Fluxo Assíncrono do Projeto

```text
Usuário entra na página
        ↓
Busca arquivo JSON
        ↓
Seleciona Pokémons aleatórios
        ↓
Busca dados completos na API
        ↓
Renderiza na interface
        ↓
Usuário interage com as Pokébolas
```

---

# 📌 Conceitos Utilizados

| Conceito           | Utilização                        |
| ------------------ | --------------------------------- |
| `Promise`          | Controle de operações assíncronas |
| `async/await`      | Escrita assíncrona moderna        |
| `fetch API`        | Requisições HTTP                  |
| `Promise.all()`    | Execução simultânea               |
| `DOM Manipulation` | Renderização dinâmica             |
| `EventListener`    | Interações do usuário             |

---

# 📌 Try/Catch

O `try/catch` evita que erros interrompam a aplicação.

```javascript
async function exemplo() {

    try {

        const resposta = await fetch(url);

        const dados = await resposta.json();

        console.log(dados);

    } catch (erro) {

        console.log("Erro:", erro);

    }

}
```

---

# 📌 Benefícios do Async/Await

✅ Código mais legível
✅ Melhor organização
✅ Fluxo mais simples
✅ Fácil manutenção
✅ Melhor tratamento de erros

---

# 📌 Conclusão

A utilização de `Promise`, `async/await` e `Promise.all()` permitiu criar uma aplicação mais dinâmica, performática e organizada, tornando possível carregar Pokémons em tempo real através da PokéAPI e renderizar toda a experiência de batalha de forma interativa.
