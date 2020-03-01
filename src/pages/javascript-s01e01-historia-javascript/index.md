---
title: 'História do JavaScript - JavaScript (S01E01)'
date: '2016-11-25'
spoiler: O post anterior foi apenas para dar inicio a série. Agora vamos conhecer um pouco sobre a história do JavaScript.
cta: history
---

O post anterior foi apenas para dar inicio a série. Agora vamos conhecer um pouco sobre a história do JavaScript.

Apenas uma observação antes de começarmos. No título temos S01E01, isso se refere a Série 01 e Episódio 01 aqui do DevHeroes. É uma abreviação que muitos já devem estar acostumados das séries de TV. Dessa forma é possível identificar claramente os posts que fazem parte de uma série e em qual ponto esta se encontra. Mas vamos ao que interessa.

<img src="https://devheroes.io/wp-content/uploads/2016/11/JavaScript-S01E01-Historia-do-JavaScript.png" alt="História do JavaScript" />

Quando ouvi falar pela primeira vez sobre JavaScript, lá pelo ano 2003, eu imaginei que era uma versão para rodar *scripts* Java no navegador.

Mais tarde descobri que JavaScript não tem ligação com Java. O nome foi adotado como estratégia de marketing, já que naquela época Java era uma linguagem muito popular.

Neste primeiro post vamos falar um pouco sobre a história do JavaScript.

## Quem criou JavaScript e quando

A linguagem JavaScript foi criada em 1995 por Brendan Eich para o navegador Netscape Navigator 2.

Na época do seu surgimento, coisas simples como validar um campo em um formulário tinham de ser feitas pelo servidor. Imagine a situação: você preenche um formulário, clica em enviar e aguarda uns 30 segundos (as conexões de internet da época eram muito lentas). Mas após esse tempo recebe uma mensagem de retorno dizendo que você não preencheu um dos campos obrigatórios. As validações de formulários foram uma das principais razões da criação do JavaScript, agora era possível fazer elas no próprio cliente.

Desde então a capacidade do JavaScript cresceu muito. Além de validação dos campos de um formulário, permite a criação das aplicações web modernas, onde podemos interagir diretamente com o conteúdo. Muitas vezes não é preciso nem mesmo recarregar a página para atualizar as informações nela.

Inicialmente JavaScript era uma linguagem *client-side*, rodava no navegador do usuário os *scripts*. Hoje também é bastante usada no *server-side* através do Node.js. Dessa forma podemos usar JavaScript tanto no *server-side* quanto no *client-side*.

Embora tenha iniciado no Netscape, desde então foi implementado em todos os grandes navegadores.

## Quem mantém a linguagem

Quando foi lançado o Netscape Navigator 3, junto com ele veio a versão 1.1 do JavaScript. Nesta mesma época a Microsoft lançou o Internet Explorer 3 com sua própria implementação, que ela resolveu chamar de JScript para evitar problemas de licenciamento.

Percebeu-se então a necessidade de uma padronização da linguagem, assim como já era feito em linguagens como C. Em 1997 foi enviado para a *European Computer Manufacturers Association (Ecma)* a versão 1.1 do JavaScript. Foi designado um comitê técnico, o *Technical Committee 39* ([TC39](https://github.com/tc39)). Eles ficaram responsáveis em padronizar a sintaxe e semântica de uma linguagem que fosse multiplataforma e neutra em relação aos navegadores. Se reuniram por meses e ao final surgiu o padrão [ECMA-262](https://github.com/tc39/ecma262) definindo uma nova linguagem chamada ECMAScript (é pronunciado "ek-ma-script").

Desde então os navegadores usam a ECMAScript como base para suas implementações JavaScript.

A ECMAScript não está ligada aos navegadores diretamente. Na verdade apenas descreve as seguintes partes da linguagem:

- Sintaxe
- Tipos
- Operadores
- Objetos
- Declarações
- Palavras chave
- Palavras reservadas

## Edições da ECMAScript

A **primeira edição** da ECMAScript era na verdade a versão 1.1 do JavaScript lançada para o Netscape.

A **segunda edição** foi mais editorial para ficar de acordo com a ISO/IEC-16262. Não houve adições, remoções, mudanças ou omissões nela.

A **terceira edição** foi a primeira atualização da linguagem realmente. Ela proveu atualização na manipulação de *strings*, definição de erros, suporte para expressões regulares, novas declarações de controle, `try-catch` para tratamento de exceções, e outras mudanças menores.

Na **quarta edição** foi planejada uma completa reestruturação da linguagem. Foram tão grandes as mudanças que a especificação resultante era quase uma nova linguagem. Ela incluía tipagem forte de variáveis, novas declarações e estruturas de dados, classes e herança clássica, e novas maneiras de interagir com dados.

Na mesma época um subcomitê do TC39 trabalhou em uma proposta alternativa, a edição 3.1. Ela era uma evolução menor da linguagem, pois eles acreditavam que a quarta edição era um salto muito grande. O resultado foi uma proposta menor, com mudanças incrementais na ECMAScript e que podiam ser implementadas nos motores JavaScript existentes naquela época. Por fim, o subcomitê da ES3.1 ganhou o suporte do TC39 e a quarta edição da ECMA-262 foi abandonada antes de ser publicada oficialmente.

A ECMAScript 3.1 acabou se tornando a **quinta edição** da ECMA-262 e foi publicada oficialmente em 3 de dezembro de 2009. Ela buscou resolver algumas ambiguidades da terceira edição e adicionar novos recursos. Introduziu suporte nativo a objetos JSON para *parse* e serialização de dados, métodos para herança e definição avançada de propriedades, e a inclusão do modo `strict mode` que muda algumas coisas na maneira como os motores JavaScript interpretam e executam o código (nessa série vamos aprender mais sobre o `strict mode`).

Se você tem estudado esse ano sobre desenvolvimento deve ter se deparado com o termo ES6 algumas vezes. Trata-se da [sexta edição da ECMAScript](http://www.ecma-international.org/ecma-262/6.0/), este é um dos assuntos mais abordados quando se fala de JavaScript ultimamente. Acredito que a partir desta versão, passou a ser usado também o ano para definir a edição, então talvez você tenha visto em alguns lugares como ECMAScript 2015 (ES2015), trata-se da mesma edição que ES6.

A **sexta edição** é a atualização mais extensiva desde a publicação da primeira edição da ECMAScript em 1997. Algumas das suas principais melhorias incluem módulos, declaração de classes, escopo léxico de blocos (usando `let` em vez de `var` para declarar uma variável dentro de um bloco `if` por exemplo), *iterators* e *generators* e uso de *promises* para programação assíncrona. Foi expandida a biblioteca ECMAScript de *built-ins* para suportar abstração de dados adicional incluindo *maps*, *sets*, *arrays* de valores numéricos binários, bem como suporte adicional para caracteres Unicode suplementares em *strings* e expressões regulares. Os *built-ins* são agora extensíveis através de subclasses.

Ao longo dessa séria vamos abordar com calma as principais novidades da versão ES6, bem como da próxima versão a ECMAScript 2016 (ES7).

## Conformidade com a ECMAScript

Toda vez que uma nova edição da ECMAScript é publicada os navegadores levam algum tempo até implementar as novidades. Por isso é importante saber quais navegadores, e em quais versões, suportam os recursos da ECMAScript antes de sairmos usando.

Existem formas para contar isso, uma delas é usar um *transpiler* como o [Babel](https://babeljs.io/). Escrevemos código usando os recursos mais recentes do ES6 e ES7, e o Babel compila para uma versão JavaScript compatível com a maioria dos navegadores.

Uma excelente fonte para sabermos se o navegador que usamos já implementou determinado item da ECMAScript é o site [https://kangax.github.io/compat-table](https://kangax.github.io/compat-table/). Nele temos uma tabela bem completa que nos mostra para os principais navegadores, quais recursos estão disponíveis da ES5, ES6 e ES7.

Fiquei surpreso em ver, ao analisar essa tabela, que até o momento apenas o Safari 10 para macOS e a versão dele para iOS 10 tem 100% de compatibilidade com ES6. Os outros navegadores estão bem perto disso, Chrome 54 e Opera 41 já tem 97%, Edge 14 tem 93% e o Firefox 50 tem 92%. No lado do servidor o Node 7 já suporta 97%. É possível que quando você ler este post estes valores já tenham mudado.

## Conclusão

Esse é um breve relato da história do JavaScript. Se esta linguagem ainda é algo novo para você, não se preocupe muito com a quantidade de termos que foram descritos aqui. Na verdade essa introdução vai ficando mais clara. Recomendo você depois retornar para este primeiro post e ver o quanto você já conhece do que foi descrito aqui. Talvez fique surpreso.

No [próximo post](https://devheroes.io/ambiente-de-desenvolvimento-javascript-s01e02/) vamos ver quais ferramentas precisamos para termos um ambiente para desenvolver e estudar JavaScript. E vamos escrever nosso primeiro código em JavaScript.
