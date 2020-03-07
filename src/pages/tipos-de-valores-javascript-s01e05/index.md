---
title: 'Tipos de Valores - JavaScript (S01E05)'
date: '2017-02-16'
author: mdapper
spoiler: Neste artigo vamos considerar sobre os tipos de valores na linguagem JavaScript, como por exemplo number, string, boolean, object, null, undefined, array, etc.
image: tipos-de-valores-javascript-s01e05-768x403.jpg
---

Neste artigo vamos considerar sobre os tipos de valores na linguagem JavaScript, como por exemplo number, string, boolean, object, null, undefined, array, etc.

Antes disso vamos ver um pouco sobre quais são algumas maneiras de declararmos variáveis e tipos de valores em diferentes linguagens.

## Tipagem das variáveis

Nas linguagens de programação é comum as variáveis terem tipagem fraca ou forte. Vamos entender a diferença entre elas.

### Tipagem forte

A tipagem forte é quando definimos um tipo de valor para nossas variáveis. Caso mais tarde tentarmos associar um tipo diferente do que foi definido no momento da criação da variável, ocorrerá um erro. Se for uma linguagem compilada não será possível nem mesmo compilar o código.

Abaixo um exemplo de declaração de variáveis em C#, linguagem que usa tipagem forte:

```csharp
public string message = "Olá mundo!";
public int meaningOfLife = 42;

meaningOfLife = "This is not the variable you are looking for!";
// Vai gerar um erro
```

Vejam que para cada variável determinamos o tipo dela, para a primeira dizemos que ela é uma *string* e para a segunda dizemos que é *int*. Na linha 4 tentamos passar para uma variável do tipo *int* uma *string*, isso vai gerar um erro e nosso programa não vai compilar.

Algumas das linguagens mais conhecidas que usam esse formato são:

- C++
- Java
- C#

### Tipagem fraca

Na tipagem fraca não é preciso determinar o tipo de dados das variáveis, a própria linguagem vai automaticamente determinar baseado na sintaxe que ela encontrar. Também é possível alterar o tipo de dados armazenados em uma variável durante a execução do programa.

Em JavaScript é usado este formato. Abaixo um exemplo onde definimos duas variáveis com dados diferentes, mas sem ter que informar o tipo delas.

```jsx
let message = "Olá mundo!";
let myNumber = 42;

myNumber = "It's a trap!"; // JS Aceita isso
```

> Nota: Vamos passar a usar `let` e `const` onde for possível no lugar de `var`
> no próximo artigo desta série vamos cobrir em mais detalhes quando usar cada um deles.

Aqui não precisamos determinar o tipo de cada variável, a linguagem vai determinar para cada caso qual o tipo do valor. Já na linha 4 não vamos ter nenhum erro, apenas estamos armazenando em nossa variável um valor de outro tipo, o que pode ser uma armadilha se não tivermos cuidado.

Algumas das linguagens mais conhecidas que usam esse formato são:

- Perl
- PHP
- JavaScript

## Tipos de valores

Em JavaScript na verdade, temos a tipagem de valores, não de variáveis. Essa separação de tipos de valores serve para que a linguagem saiba quais operações podemos fazer com eles, por exemplo, podemos fazer operações matemáticas com números, mas não com *strings*.

Cada valor tem um tipo que determina seu papel. Existem os seguintes tipos primitivos de valores:

- number
- string
- boolean
- symbol (novo na ES6)
- null
- undefined

Qualquer coisa que não for um destes primitivos será um *object*, que possui os subtipos conforme segue:

- object
  - function
  - Array
  - Date
  - RegExp

Podemos usar o operador `typeof` para descobrir o tipo de um valor conforme segue:

```jsx
let a;
typeof a;           // "undefined"

let a = "Olá";
typeof a;           // "string"

a = 42;
typeof a;           // "number"

a = true;
typeof a;           // "boolean"

a = { b: "c" };
typeof a;           // "object"
```

Termos um entendimento correto dos tipos de valores e seu comportamento é fundamental para de modo apropriado e preciso convertermos valores de diferentes tipos. Em um próximo artigo vamos ver mais sobre isso ao falarmos sobre *coercion*.

Vamos então ver quais são os principais tipos.

## Numbers

Valores do tipo *number* são numéricos e são representados como segue:

```jsx
42
```

Em JavaScript é utilizado 64 bits para armazenar números, o que permite usarmos 2^64 números diferentes. Você só precisa se preocupar com esse limite caso lide com números muito grandes.

Um dos bits serve para indicar o sinal do número, negativo ou positivo. Como só existe um tipo numérico em JavaScript ele serve para inteiros e também decimais (também conhecido como *float*), então alguns dos bits podem ser usados para indicar a posição do ponto decimal.

Números decimais são separados por ponto `.`, diferente do que é usado no Brasil.

```jsx
3.14
```

Para números muito grandes ou muito pequenos podemos usar notação científica por acrescentar `e` que indica exponente seguido pelo valor deste:

```jsx
4.756e7
```

Ou seja 4,756 x 10^7 = 47.560.000.

Cálculos que usem números inteiros, dentro do limite mencionado anteriormente, são garantidos de serem precisos. Já cálculos com números fracionados não. Muitos números perdem a precisão quando apenas 64bits estão disponíveis para seu armazenamento. É importante estar ciente disso caso lide com alguma situação que requer extrema precisão.

Por causa disso temos alguns resultados estranhos como o que segue:

```jsx
0.1 + 0.2 == 0.30000000000000004
```

Também existem três valores especiais em JavaScript que são considerados números, mas que não se comportam como números comuns:

- Infinity (infinito)
- -Infinity (infinito negativo)
- NaN (não é um número - not a number)

As seguintes operações geram valores infinitos:

```jsx
1 / 0; // Infinity
-1 / 0; // -Infinity
```

Computação que usa infinito pode levar facilmente ao *NaN*. Você obtém ele quando fizer operações como `0 / 0` ou `Infinity - Infinity`, ou qualquer outra operação numérica que não apresenta um resultado significativo.

Mesmo ele servindo para indicar que o valor não é um número, o tipo dele é *number*.

```jsx
let a = 0 / 0;      // Resulta em NaN
typeof a;           // "number"

```

Na ES2015 (ou ES6) foi introduzido uma maneira de verificarmos se um número é um *NaN* através de `Number.isNaN()`, podemos fazer isso conforme segue:

```jsx
let a = 0 / 0;      // Resulta em NaN
Number.isNaN(a)     // true
```

## Strings

O tipo *string* é usado para representar texto. Mais precisamente, são sequências de caracteres do formato UTF-16. São obtidos por envolver algum valor em aspas simples ou duplas:

```jsx
"Minha string!"
'Olá mundo!'
```

> Nota: Importante dizer que o começo e o final da *string* devem usar o mesmo símbolo, quer seja aspas duplas `"` quer simples `'`.

Praticamente qualquer coisa pode ser colocada dentro de aspas para representar uma *string*. Mas alguns caracteres são mais difíceis. Por exemplo, como colocar aspas dentro de uma *string*?

Nestes casos precisamos usar um recurso chamado de *escape*. Usamos antes do caractere que desejamos escapar o símbolo `\`. Se queremos colocar aspas em volta da palavra "string" podemos fazer como segue:

```jsx
"Minha \"string\"!"
```

A linguagem vai perceber que não desejamos terminar a *string*, mas sim exibir as aspas.

O único operador que podemos usar em conjunto com *strings* é o `+`, ele serve para concatenarmos mais de uma *string*.

```jsx
"Olá " + "Marcelo!" // retorna "Olá Marcelo!"
```

Você pode usar *strings* como objetos também e aplicar nelas alguns métodos que permitem você manipular ou acessar algumas informações dela:

```jsx
"Olá".charAt(0); // "O"
"Olá, mundo".replace("Olá", "Tchau"); // "Tchau, mundo"
"Olá".toUpperCase(); // "OLÁ"
```

Ao contrário de linguagens como *C*, em JavaScript *strings* são imutáveis. Isso significa que uma vez que uma *string* é criada ela não pode ser modificada. No entanto, é possível criar uma nova *string* baseada em uma operação sobre a *string* original.

Por exemplo, ao concatenarmos *strings* estamos criando uma totalmente nova e não modificando qualquer uma delas:

```jsx
let message = "Olá";
message = message + " mundo";
```

Neste exemplo não estamos modificando a *string* `"Olá"`, mas criando uma totalmente nova com o conteúdo `"Olá mundo"`.

## Booleans

Muitas vezes precisamos de um valor que só pode ter um de dois resultados, verdadeiro ou falso. Para isso usamos um valor do tipo *boolean* que possui apenas dois valores possíveis `true` ou `false`, ambos são palavras chave da linguagem.

Qualquer valor pode ser convertido em um *boolean* usando a função `Boolean()`. Segue uma relação dos valores que quando convertidos se tornam `false`:

- `""` - Uma *string* vazia
- `0`, `-0` e `Nan` (número inválido)
- `null` e `undefined`
- `false`

Todos os outros serão verdadeiros, conforme alguns exemplos:

- `"Olá"` - Qualquer *string* não vazia, mesmo se tiver apenas um espaço como em `" "`.
- `42` - números
- `true` - a palavra chave para verdadeiro
- `[ ]`, `[1, "2", 3]` - arrays
- `{ }`, `{myNumber: 42}` - objetos
- `function myFunction() { ... }` - funções

## Undefined e null

No JavaScript existe distinção entre `null`, que indica deliberadamente a ausência de um valor, do `undefined`, que é um objeto do tipo `undefined` e que indica um valor não inicializado, ou seja, um valor ainda não foi atribuído.

Isso acontece normalmente quando criamos uma variável mas não atribuímos nenhum valor para ela. Até que ela receba algum valor vai permanecer como `undefined`, podemos ver isso no exemplo que segue:

```jsx
let myVar;
console.log(myVar); // undefined
```

É interessante notar que ao testarmos o tipo do valor `null` recebemos `"object"` como resposta:

```jsx
let a = null;
typeof a;           // "object"
```

O `null` representa algo que não existe e que não é de nenhum outro tipo de valor. Lembre-se que ao encontrar um valor `null` ele foi definido assim de modo intencional.

## Symbol (novo na ES2015)

Um *Symbol* é um tipo de valor único e imutável. É um tipo primitivo novo de dado que surgiu na ES2015. Seu recurso principal é que cada *Symbol* é um token único, ao contrário de outros tipos de dados que podem ser sobrescritos.

Para criarmos um *Symbol* usamos a seguinte sintaxe:

```jsx
let mySymbol = Symbol();
```

Se quiser mais informações pode ver na MDN [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Symbol) e neste [artigo](https://www.sitepoint.com/preparing-ecmascript-6-symbols-uses/) do SitePoint.

## Object

Um *object* é uma coleção de pares nome/valor. Qualquer valor que não for um dos primitivos que consideramos até agora será do tipo *object*.

Você pode criar um objeto literal usando um par de chaves `{}` conforme exemplo a seguir:

```jsx
let person = {};
```

Objetos podem ter propriedades e métodos. As propriedades contêm informações sobre o objeto, já os métodos são as operações que o objeto pode realizar.

```jsx
let person = {
  firstName: "Marcelo",
  lastName: "Dapper",
  age: 32,
  developer: true
};
```

Podemos usar qualquer tipo primitivo de valor que consideramos para as propriedades de nosso objeto.

Para acessar o valor de uma propriedade usamos o ponto `.` conforme segue:

```jsx
person.firstName; // retorna a string "Marcelo"
person.age; // retorna o number 32
```

Podemos usar também a notação com colchetes, onde informamos uma *string* com o nome da propriedade que queremos acessar:

```jsx
person["firstName"]; // retorna a string "Marcelo"
person["age"]; // retorna o number 32
```

Isso é especialmente útil quando temos o valor da propriedade armazenado em uma variável.

Podemos realizar operações com nossas propriedades usando métodos como o `fullName` que segue:

```jsx
let person = {
  firstName: "Marcelo",
  lastName: "Dapper",
  age: 32,
  developer: true,
  fullName() {
    console.log(`Meu nome completo é ${this.firstName} ${this.lastName}`);
  }
};
```

Usamos acima uma sintaxe mais breve da versão ES2015 para definir nosso método conforme vemos [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions).

Para compor o log usamos o recurso [template strings](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings) também da ES2015. Para isso precisamos usar a crase ( \` ) para envolver nossa *string* em vez de aspas simples ou duplas. Isso permite uma sintaxe mais clara do que concatenar assim `'Meu nome completo é ' + this.firstName + ' ' + this.lastName'`.

Para executarmos o método fazemos como segue:

```jsx
person.fullName();  // retorna "Meu nome completo é Marcelo Dapper"
```

### Function

As funções em JavaScript são um subtipo do tipo `object`. Mas ao verificarmos o tipo de uma função usando `typeof` temos como retorno `"function"`.

```jsx
function myFunction() {
  return 42;
}
typeof myFunction;      // "function"
typeof myFunction();    // "number"
```

Já se verificamos o `typeof` sobre a execução de uma função, conforme vemos acima na última linha, vai ser retornado o tipo de valor que a função retorna, neste caso um número.

### Array

Usamos *arrays* para guardarmos em uma única variável uma lista. Os *arrays* também são um subtipo de *object*.

Para criarmos um *array* usamos um par de colchetes `[]`. Podemos criar um conforme segue:

```jsx
let avengers = [
  "Captain America",
  "Iron Man",
  "Thor",
  "The Hulk",
  "Black Widow",
  "Hawkeye"
]
```

*Arrays* podem receber qualquer tipo de valor primitivo que consideramos neste artigo, neste caso usamos apenas *strings*.

Para acessarmos um valor específico de um *array* precisamos informar qual índice desejamos. Deve ser um número, começando em zero, que informa a posição no *array*.

```jsx
avengers[0];  // retorna "Captain America"
avengers[1];  // retorna "Iron Man"
avengers[2];  // retorna "Thor"
avengers[3];  // retorna "The Hulk"
avengers[4];  // retorna "Black Widow"
avengers[5];  // retorna "Hawkeye"
```

Se precisamos saber quantos itens tem no *array* podemos usar a propriedade `length`:

```jsx
avengers.length;  // retorna 6
```

## Considerações finais

Neste artigo vimos quais são os principais tipos de valores usados em JavaScript.

Se você vem de alguma outra linguagem já deve estar familiarizado com muito do que foi visto aqui. Caso esteja iniciando e ainda ficou com dúvida deixe um comentário aqui em baixo.

No [próximo artigo](https://devheroes.io/como-declarar-variaveis-usando-var-let-const-es6-javascript-s01e06/) dessa série vamos ver como declarar variáveis usando `var`, `let` e `const`, sendo as duas últimas introduzidas pela ES2015.

## Referências

- [You Don't Know JS: Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch2.md)
- [Eloquent JavaScript (Português)](http://braziljs.github.io/eloquente-javascript/chapters/valores-tipos-operadores/)
- [A Beginner’s Guide to JavaScript Variables and Datatypes - SitePoint](https://www.sitepoint.com/beginners-guide-javascript-variables-and-datatypes/)
