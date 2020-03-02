---
title: 'Conceitos básicos da ECMAScript - JavaScript (S01E04)'
date: '2016-12-09'
author: mdapper
spoiler: Neste post vamos ver alguns conceitos básicos da ECMAScript, como identificadores, comentários, declarações, expressões, execução, palavras chave e reservadas.
cta: ecmascript
---

Neste post vamos ver alguns conceitos básicos da ECMAScript, como identificadores, comentários, declarações, expressões, execução, palavras chave e reservadas.

<img src="https://devheroes.io/wp-content/uploads/2016/12/conceitos-basicos-da-ecmascript-s01e04-v1.1.jpg" alt="Conceitos Básicos da ECMAScript" />

A sintaxe da ECMAScript lembra bastante algumas linguagens como *C* e *Java*. Desenvolvedores que vem destas linguagens não vão ter muita dificuldade em se adaptar.

## Identificadores

Um identificador é o nome de uma variável, função, propriedade ou argumento de uma função. Para a criação deles temos de respeitar algumas regras.

O primeiro caractere deve ser uma letra, *underscore* `_`, ou o símbolo de dólar `$`. Os outros caracteres podem ser letras, *underscores*, símbolo de dólar ou números. Embora é possível usar caracteres com acentuação como em `var variável;`, isso não é recomendado.

Abaixo alguns exemplos de identificadores válidos:

```jsx
var myVar;
var _firstName;
var $lastName;

```

### Case-sensitive

Todos os identificadores são *case-sensitive*, ou seja, são sensíveis a letras maiúsculas e minúsculas. Se declararmos as variáveis `myVar`, `MyVar`, `Myvar`, `myvar` e `MYVAR`, elas vão ser tratadas como sendo diferentes em ECMAScript.

### Uso de *camel case*

Por convenção os identificadores da ECMAScript usam *camel case*, ou seja, a primeira letra é minúscula e cada nova palavra começa com uma letra maiúscula. Isso melhora a leitura dos identificadores. Seguem alguns exemplos:

```jsx
var myVar;
var firstName;
var lastName;

function minhaFuncaoIncrivel() {
  console.log("Olá mundo!");
}

```

Não é obrigatório seguir essa recomendação, mas é bom que em seu projeto tenha um padrão de como dar nome aos identificadores e que você siga ele durante todo o desenvolvimento.

## Comentários

A ECMAScript utiliza o mesmo padrão para comentários da linguagem *C* e similares, tanto para comentários de uma única linha como blocos de comentários.

### Comentário de uma única linha

Os comentários em uma única linha começam com `//`. Tudo que estiver após `//`, até o final da linha, será ignorado pelo motor JavaScript, não vai ser executado.

Podemos usar antes de uma declaração para descrevermos ela:

```jsx
// Soma os valores e armazena na variável 'a'
var a = 1 + 2;

// Imprime no console o valor de 'a'
console.log(a);

```

Também é possível adicionarmos um comentário no final da mesma linha que ocorre a declaração:

```jsx
var a = 1 + 2;
console.log(a); // Imprime no console o valor de 'a'

```

Podemos utilizar também para desabilitar a execução de uma declaração, isso pode ser útil ao procurarmos resolver erros em nosso código:

```jsx
var a = 1 + 2;
//a = a * 5;
console.log(a);

```

### Bloco de comentário

Se um trecho de código precisar de uma explicação mais detalhada, podemos usar o bloco de comentário.

Iniciamos ele com `/*`, e podemos então nas próximas linhas escrever nosso comentário e ao final usar `*/` para indicarmos o final do bloco de comentário.

É comum usar este tipo de comentário para separar os principais blocos de nosso código, por exemplo as funções. Ao rolarmos pelo arquivo conseguimos ver mais claramente a separação de cada parte.

```jsx
/**
 * Isso é um bloco
 * de comentário
 */

```

Notar que os asteriscos `*` nas linhas 2 e 3 não são necessários, foram apenas adicionados para melhorar a leitura. Este é um formato muito usado em aplicações JavaScript.

## Declarações

Nas linguagens de programação um grupo de instruções que executam uma determinada tarefa é chamado de declaração.

A maioria dos programas em JavaScript são compostos de várias declarações. Vejamos um exemplo:

```jsx
var x = 20;
var y = 22;
var z = x + y;
console.log(z);

```

No código acima, em cada linha temos uma declaração que será executada na ordem em que aparece.

### Separar as declarações

Para separarmos as declarações, usamos em JavaScript, o ponto e vírgula `;` no final delas. Conforme vemos no exemplo anterior.

É possível escrevermos várias declarações em uma mesma linha e separarmos elas com `;` conforme segue:

```jsx
var x = 20; var y = 22; var z = x + y;
console.log(z);

```

O uso de `;` não é obrigatório em JavaScript, a linguagem vai procurar descobrir onde começam e terminam as declarações. Alguns desenvolvedores apoiam a ideia de usarmos ela apenas onde estritamente necessário.

Provavelmente o local onde você trabalha deve ter já uma forma de trabalhar. Você vai ter que se adaptar ao que é usado pela empresa para manter a consistência do código.

Se você, além de JavaScript, programa em outras linguagens que usam `;` talvez opte por usar também em JS. O contrário também é verdade, se programa em Python talvez prefira não usar `;`.

No final das contas, o importante é você escolher um padrão e se manter nele durante todo seu projeto.

### Espaços em branco

Vários espaços em branco seguidos são ignorados pelo motor JavaScript. É recomendável adicionar espaços para tornar o código mais legível. Também é uma boa prática colocar espaços em branco em volta dos operadores `= + - * /`.

```jsx
var firstName="Marcelo"; // Sem espaço

var firstName = "Marcelo"; // Com espaços fica mais legível
var job       = "Desenvolvedor Front-End";
var age       = 32; // Espaços adicionados para melhorar
                    // a leitura das declarações

var x=y+z;
var x = y + z; // Operadores separados com espaços para
               // tornar mais legível

```

### Comprimento e quebra de linhas

Para uma melhor leitura do código, programadores muitas vezes evitam que as linhas de código ultrapassem 80 caracteres. Se uma declaração não couber em uma linha, o melhor é quebrar ela em uma nova linha. O melhor ponto para fazermos isso é após algum operador, conforme vemos nas linhas 6 e 7 abaixo:

```jsx
var firstName = "Marcelo";
var lastName  = "Dapper";
var job       = "Front-End Developer";
var age       = 32;

console.log("Meu nome é " + firstName + " " + lastName +
            ". Tenho " + age + " anos e trabalho como " +
            job + ".");

```

Aqui no DevHeroes nos exemplos vamos procurar fazer o mesmo, para melhorar a leitura e não precisarmo usar o scroll lateral sempre que possível.

## Expressões

As declarações são compostas de uma ou mais expressões. Uma expressão é composta de valores, ou um grupo de variáveis e valores combinados com operadores.

```jsx
a = 1 + b;
```

No exemplo acima temos várias expressões:

- `1` é uma expressão literal
- `b` é uma expressão de uma variável, nela o valor de `b` é adquirido
- `1 + b` é uma expressão aritmética, onde 1 é somado ao valor adquirido de `b`
- `a = 1 + b` é uma expressão de atribuição, onde estamos atribuindo o resultado da expressão aritmética a variável `a`

## Execução

Para fazermos uso das declarações precisamos executar nosso programa JavaScript. Para isso as linguagens de computação costumam usar um interpretador ou compilador para traduzir nosso código em um que o computador possa executar.

### Linguagens interpretadas

Em algumas linguagens isso ocorre por cada linha ir sendo interpretada de cima para baixo, conforme foram escritas no código. Isso ocorre toda vez que executamos nosso programa.

### Linguagens compiladas

Em outras linguagens, como *C* e *Java*, a tradução de nosso código para um que o computador possa rodar ocorre previamente a execução, chamamos isso de compilar o código. Mais tarde sempre que executarmos nosso programa estamos na verdade executando as instruções que foram compiladas já na linguagem do computador.

### Como ocorre em JavaScript

Normalmente JavaScript é associado como sendo uma linguagem interpretada, já que nosso código é interpretado toda vez que executamos ele, mas isso não é totalmente verdade. Os motores JavaScript toda vez que executamos nosso programa, compilam nosso código e imediatamente executam ele.

Para compreender melhor esse conceito, recomendo que leiam o primeiro capítulo do livro [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md). Ele também está disponível traduzido pela comunidade em [português](https://github.com/cezaraugusto/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch1.md).

## Palavras chave e reservadas

Toda linguagem reserva algumas palavras chave e outras reservadas para seu uso interno, não é diferente com JavaScript.

Um exemplo disso é `var`, não podemos usar ela para o nome de um a variável pois é reservada para uso da linguagem, ou seja, não podemos ter a seguinte declaração `var var = "Minha variável";`.

Abaixo uma lista com as palavras reservadas que não podemos usar:

```jsx
break case catch class const
continue debugger default delete
do else enum export extends false
finally for function if implements
import in instanceof interface let
new null package private protected
public return static super switch
this throw true try typeof var
void while with yield
```

Não é preciso memorizar essa lista, apenas tenha em mente que este pode ser o problema quando, por exemplo, uma definição de variável não funciona como o esperado.

## Conclusão

Neste post vimos alguns dos conceitos básicos da ECMAScript, como identificadores, comentários, declarações, expressões, execução, palavras chave e reservadas.

No [próximo post](https://devheroes.io/tipos-de-valores-javascript-s01e05/) vamos aprender sobre tipos de valores.
