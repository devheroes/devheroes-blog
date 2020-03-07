---
title: 'Como declarar variáveis usando var, let e const a partir da ES6 - JavaScript (S01E06)'
date: '2017-05-25'
author: mdapper
spoiler: Neste artigo vamos entender a diferença entre `var`, `let` e `const`, e quando devemos usar cada um deles para declarar variáveis em JavaScript.
image: javascript-s01e06-variaveis-new-768x403.jpg
---

Neste artigo vamos entender a diferença entre `var`, `let` e `const`, e quando devemos usar cada um deles para declarar variáveis em JavaScript.

Nos artigos anteriores dessa série vimos:

- [S01E01 - História do JavaScript](https://devheroes.io/javascript-s01e01-historia-javascript/)
- [S01E02 - Ambiente de Desenvolvimento](https://devheroes.io/ambiente-de-desenvolvimento-javascript-s01e02/)
- [S01E03 - Como usar a tag script](https://devheroes.io/como-usar-tag-script-javascript-s01e03/)
- [S01E04 - Conceitos básicos da ECMAScript](https://devheroes.io/conceitos-basicos-da-ecmascript-s01e04/)
- [S01E05 - Tipos de Valores](https://devheroes.io/tipos-de-valores-javascript-s01e05/)

Por muito tempo JavaScript só teve uma maneira de declarar variáveis, usando a *keyword* `var`. A partir da sexta edição da ECMAScript (ES6 ou ES2015) passamos a ter mais duas opções através das *keywords* `let` e `const`.

## Como declarar variáveis

Para declararmos uma variável podemos usar a *keyword* `var` e dar um nome para ela:

```jsx
var myVar;
myVar = 42;
```

No exemplo acima estamos criando uma variável na primeira linha e em seguida atribuindo um valor para ela na segunda linha.

Abaixo vemos que podemos fazer a declaração e atribuição na mesma linha:

```jsx
var myVar = 42;
```

Quando usamos `var` é possível declarar ou atribuir novamente nossa variável:

```jsx{numberLines: true}{1,4,7}
var height = 300;
console.log(height);  // 300

height = 100;
console.log(height);  // 100

var height = 500;
console.log(height);  // 500
```

Na primeira linha estamos declarando nossa variável `height` e atribuindo um valor para ela, na linha 4 atualizamos seu valor, já na linha 7 estamos novamente declarando e atribuindo um valor para a mesma variável. Tudo isso é possível quando usamos a *keyword* `var` para a criação de variáveis.

O que estamos fazendo na linha 7 pode ser um problema, caso nosso objetivo fosse criar uma nova variável sem perder a anterior, usando `var` nenhum erro vai ocorrer.

Esta é a forma padrão de declarar variáveis em JavaScript até a ES5. Mas como mencionado acima, temos a nossa disposição agora também `let` e `const`.

Para entendermos quando usar cada uma temos que entender um pouco sobre escopo primeiro.

## Escopo ao usar 'var'

Antes da ES2015 a única forma de separar nossas variáveis em escopos diferentes era através das funções, ou seja, uma variável só está disponível dentro da função em que foi criada.

Se a variável não for criada dentro de uma função seu escopo vai ser global.

Em muitas linguagens, blocos de código como `if` e `for` criam um novo escopo, mas isso não acontecia em JavaScript.

Vamos ver um exemplo onde precisamos inverter o valor de duas variáveis, caso o primeiro valor seja maior que o segundo:

```jsx{numberLines: true}{3,7,10}
function invertValues(x, y) {
  if (x > y) {
    var temp = x;
    x = y;
    y = temp;
  }
  console.log(temp);  // Vamos ter acesso mesmo fora do if
}
invertValues(11, 3);
console.log(temp); // erro, variável temp não foi definida
```

O que acontece aqui é que a variável `temp`, declarada na linha 3, vai pertencer a todo o escopo da função `invertValues`, mesmo tendo sido declarada dentro do `if`, por isso podemos acessar ela na linha 7. Mas ocorre um erro na linha 10 quando tentamos acessar ela, pois estamos tentando usar uma variável fora do escopo que ela foi definida.

Outro exemplo é ao usar o `for` para um contador:

```jsx{numberLines: true}{2,5}
function count(x) {
  for (var i = 0; i < x; i++) {
    console.log(i);
  }
  console.log(i);  // Vamos ter acesso mesmo fora do for
}
count(10);
console.log(i); // erro, variável i não foi definida
```

Mesmo sendo declarada dentro do `for`, a variável `i` vai estar disponível para todo o escopo da função `count`. Embora tenhamos colocado a declaração ali para sinalizar ao leitor do código que esta variável foi criada para ser usada apenas no loop, e não antes ou depois dele, mas como vemos isso pode ser feito.

Como não era possível mudar a forma com que `var` funciona, para seu escopo pertencer apenas ao `if` ou ao `for`, foi necessário criar um tipo novo de declaração de variáveis, assim surgiu `let`.

## Usando 'let'

Através da *keyword* `let` podemos fazer a declaração de variáveis respeitar o escopo do bloco em que ela foi criada. Toda vez que você ver código dentro de chaves `{ // code }`, temos um bloco.

Agora os dois exemplos anteriores usando `let`:

```jsx{numberLines: true}{3,7,12,15}
function invertValues(x, y) {
  if (x > y) {
    let temp = x;
    x = y;
    y = temp;
  }
  console.log(temp);  // erro, variável temp não foi definida
}
invertValues(11, 3);

function count(x) {
  for (let i = 0; i < x; i++) {
    console.log(i);
  }
  console.log(i);  // erro, variável i não foi definida
}
count(10);
```

Em ambos os casos `let` vai impor o uso das variáveis apenas dentro de seus respectivos blocos, assim como nosso estilo de escrita já sugere. Não vai ser possível acessar elas, fora de seus blocos, se tentarmos vai ocorrer um erro. Este é um dos usos em que `let` é mais útil para nós.

Mas será que então agora devemos abandonar o uso de `var` e substituir sempre por `let` ou `const`? Usar `var` agora é uma má prática?

Sempre que apropriado o melhor é usarmos sim `const` e `let`, mas é importante também considerarmos as vantagens de as vezes usar `var`.

No exemplo que segue, faria alguma diferença usarmos `let` para a variável `z`?

```jsx{numberLines: true}{2}
function foo(x, y) {
  let z = x * 2;

  if (x > y) {
    let temp = x;
    x = y;
    y = temp;
  }

  for (let i = 0; i < 10; i++) {
    // ..
  }
}
```

A variável `z` acima pode ser declarada usando `let`, embora isso não seja necessário, afinal ao usar `var` vamos ter exatamente o mesmo escopo.

Nos casos apresentados até agora, não há problema se usarmos `let` no lugar de `var`, mas existem situações em que `var` pode ser útil. Vamos ver a situação abaixo usando `let`:

```jsx
function foo(x, y) {
  let z = bar(x * 2);

  // ...
}
```

Uma das formas de tentarmos resolver erros é usar `try` e `catch`. Vamos supor que o exemplo acima gere um erro e eu faça uma alteração conforme segue para tratar ele:

```jsx{numberLines: true}{3}
function foo(x, y) {
  try {
    let z = bar(x * 2);
  } catch(err) {
    // ...
  }

  // ...
}
```

Talvez vocês já tenham percebido o problema, a variável `z` passa a pertencer ao escopo do `try` e não vai mais poder ser utilizada em toda a função, como talvez fosse a intenção inicial. E assim ao tentar resolver um problema criamos um novo.

Neste caso poderíamos mudar para usar `var`:

```jsx{numberLines: true}{3}
function foo(x, y) {
  try {
    var z = bar(x * 2);
  } catch(err) {
    // ...
  }

  // ...
}
```

Claro que alguns podem argumentar que o problema é que a declaração deveria estar separada da associação do valor na variável conforme segue:

```jsx{numberLines: true}{2,5}
function foo(x, y) {
  let z;

  try {
    z = bar(x * 2);
  } catch(err) {
    // ...
  }

  // ...
}
```

Dessa maneira nossa variável pode ser usada novamente em toda o escopo da função, inclusive dentro do `try`. Mas algo que ajuda na leitura do código é quando a declaração e o primeiro uso da variável estão o mais próximo possível, e por mais próximo o possível o ideal seria na mesma linha.

No exemplo acima a separação é pequena, mas conforme o código evoluir isso pode aumentar muito, e ficar mais difícil de identificar prontamente de onde a variável `z` vem.

Portanto, existem locais, quer pela operação, quer pelo estilo, em que pode ser útil usar tanto `var` como `let` em conjunto. Ambas têm objetivos diferentes, e uma não necessariamente substitui a outra.

O importante é entendermos como ambas funcionam e usar a correta quando precisarmos.

## Usando `const`

Quando falamos sobre `const` normalmente nos vem à mente a ideia de um valor imutável, que não podemos atribuir um novo valor futuramente, que estamos criando uma constante.

Mas em JavaScript uma constante é uma variável que não podemos atribuir novamente um valor, não estamos protegendo o valor em si, mas sim impedindo que a variável possa ser atribuída novamente, `const` é sobre atribuição e não valor.

É obrigatório que um valor seja atribuído à constante em sua declaração, não podemos criar uma `const x;` para só depois atribuir um valor para ela. Uma constante não deve compartilhar o nome com uma função ou variável em um mesmo escopo.

No exemplo que segue não queremos dizer que o valor 3 é imutável, o que queremos dizer é que a variável `x` não vai mais poder receber uma atribuição de valor no nosso código para o escopo em que estamos criando ela.

```jsx
const x = 3;
```

Podemos notar melhor isso ao usarmos arrays:

```jsx
const y = [0, 1, 2];
y = 42; // erro
y = []; // erro
y[0] = 42; // permitido
```

Não podemos atribuir novamente o valor da variável conforme vemos nas linhas 2 e 3, mas é possível mudar o conteúdo dela conforme vemos na linha 4. Podemos fazer isso pois o valor não tem nada a ver com a *keyword* `const`, ela simplesmente impede que seja feita uma nova atribuição para a variável.

O mesmo ocorre com objetos:

```jsx{numberLines: true}{5,9}
const person = {
  firstName: 'Marcelo',
  lastName: 'Dapper'
}
person.lastName = 'Skywalker'; // permitido
console.log(`My name is ${person.firstName} ${person.lastName}`);
// Meu nome é Marcelo Skywalker

person = {
  firstName: 'Luke',
  lastName: 'Skywalker'
}
// Erro, não podemos atribuir person novamente
```

Na linha 5 conseguimos alterar a propriedade do objeto. Mas quando tentamos atribuir novamente a variável `person` na linha 9 não conseguimos, é gerado um erro.

Como vimos mais acima, alguns tem difundido a ideia de sempre declarar variáveis como `const`, e quando for necessário atribuir novamente seu valor usar `let`, e nunca usar `var`.

Para seguir esse princípio é importante que os desenvolvedores em seu projeto estejam familiarizados com o conceito correto sobre `const`, para que não sejam levados a pensar que o valor da variável nunca muda.

O código abaixo pode levar a crer que `x` nunca vai mudar, que estamos protegidos.

```jsx
const x = [1,2,3];
double(x);
```

Mas isso não é verdade, estamos passando uma referência de `x` para a função `double`, a qual pode mudar o conteúdo dentro do array.

A vantagem de usarmos `const` é que estamos comunicando que a variável não vai ser atribuída novamente, mas não podemos garantir que os valores do array não vão ser alterados sem vermos o que a função realmente faz.

Se você precisa que algo não seja alterado deve usar `Object.freeze` que já existe desde a ES5:

```jsx
var x = Object.freeze([1,2,3]);
double(x);
```

Isso torna a variável `x` acessível apenas para leitura. Se precisamos garantir que os valores de nossa variável não vão mudar, devemos usar `Object.freeze` em vez de `const`.

A vantagem de usarmos `const` para objetos é que pelo menos sabemos que estamos nos referindo ao mesmo objeto, embora seus valores possam ter mudado.

Mas pode até ser um problema quando lidamos com *arrays* muito grandes e gostaríamos de em algum ponto em nosso código limparmos ele da memória usando `null`, se usarmos `const` isso não vai ser possível.

## Considerações finais

Então as dicas que ficam para declarar variáveis são:

- use `const` sempre que não precisar atribuir novamente uma variável
- use `let` caso precisar atribuir novamente, ou ao usar lopps `for` (embora o ideal seria usar `map`, `filter` e `reduce` sempre que puder no lugar de `for`)

Lembre que `const` não significa que o valor é imutável, se for um array ou objeto suas propriedades podem ser alteradas.

Sempre que for usar `let` se pergunte, vou realmente mudar essa variável? Eu realmente preciso mudar ela? Caso contrário use `const`.

Por que fazer isso? Queremos minimizar ao máximo possível mudanças de estado em nossa aplicação.

**Exemplo**: uma máquina de lavar para de funcionar como deveria. Você está fazendo exatamente o que sempre faz, claramente não é um erro do usuário. Como resolver o problema? Você desliga e liga novamente e ela volta a funcionar normalmente. Isso aconteceu pois algum estado da máquina, por algum motivo, estava modificado e impedindo seu funcionamento.

Esse exemplo nos faz lembrar de sempre minimizar as mudanças de estado em nossas aplicações. Usar `const` sempre que você não planeja mudar o estado da variável ajuda a evitar erros como esse.

## Referências

- [var, let and const - What, why and how](https://www.youtube.com/watch?v=sjyJBL5fkp8)
- [JavaScript ES6+: var, let, or const?](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75)
- [Object.freeze](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [How let and const are scoped in JavaScript](http://wesbos.com/javascript-scoping/)
- [ES6 let VS const variables](http://wesbos.com/let-vs-const/)
- [var na MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/var)
- [let na MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/let)
- [const na MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/const)
