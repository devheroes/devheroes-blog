---
title: 'Como usar a tag script - JavaScript (S01E03)'
date: '2016-11-30'
author: mdapper
spoiler: Neste post vamos ver como usar a tag script, inline ou arquivo externo, onde posicionar ela e quais são seus principais atributos.
image: JavaScript-S01E03-como-usar-a-tag-script.jpg
cta: scripts
---

Neste post vamos ver como usar a tag script, inline ou arquivo externo, onde posicionar ela e quais são seus principais atributos.

<img src="https://devheroes.io/wp-content/uploads/2016/11/JavaScript-S01E03-como-usar-a-tag-script.jpg" alt="Como usar a tag script" />

Quando o JavaScript foi criado procuraram fazer de uma forma que fosse possível integrar ele com o HTML. Com o tempo a tag script e seus atributos passaram a fazer parte da especificação do HTML.

## Formas de usar a tag script

Existem duas formas para inserirmos código JavaScript em nossa página, *inline* ou através de arquivos externos.

### Inline

Para inserirmos o código *inline* basta colocarmos nosso código JavaScript dentro da tag `<script></script>` diretamente na página HTML, assim como fizemos no exemplo do [post anterior](https://devheroes.io/ambiente-de-desenvolvimento-javascript-s01e02/) que segue:

```html{numberLines: true}{6}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ambiente de Desenvolvimento – JavaScript (S01E02)</title>
    <script>alert("Olá mundo!");</script>
  </head>
  <body>

  </body>
</html>

```

Na linha 6 temos nosso código JavaScript *inline*.

Importante notar que o código é interpretado de cima para baixo. Todo o código que está abaixo do fechamento da tag script na linha 8 só irá ser processado pelo navegador após nosso código JavaScript ter sido baixado e processado.

### Arquivo Externo

Outra forma que temos para adicionarmos JavaScript em nossa página é por meio de arquivos externos.

Para isso precisamos criar um novo arquivo apenas com nosso código. É uma convenção usar a extensão *.js* para facilmente identificarmos que se trata de código JavaScript. Isso não é obrigatório, os navegadores não verificam a extensão dos arquivos JavaScript, mas é uma boa prática.

Abaixo temos o primeiro exemplo do post de hoje. Na linha 6 vemos como carregar um script externo:

```html{numberLines: true}{7}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Como usar a tag script - JavaScript (S01E03)</title>
    <!-- O script é processado antes do conteúdo da página -->
    <script src="javascript.js"></script>
  </head>
  <body>
    <!-- Conteúdo é analisado depois do script -->
    <h1>Como usar a tag script - JavaScript (S01E03)</h1>
    <p>Conteúdo de nossa página.</p>
  </body>
</html>

```

Como mostrado acima, precisamos definir no atributo `src` qual o caminho para o arquivo. No exemplo acima o arquivo `javascript.js` está salvo na mesma pasta que está nosso `index.html`.

Outra boa prática, para mantermos nosso projeto organizado, é criarmos uma pasta para os scripts JavaScript. Normalmente essa pasta leva o nome *js*. A seguir um exemplo de como carregar um script, mas que agora está dentro de uma pasta chamada *js*.

```html
...
  <script src="js/javascript.js"></script>
...
```

Uma vez que criamos e apontamos o arquivo `javascript.js` vamos abrir ele em nosso editor e adicionar o código conforme segue:

```jsx
alert("Olá mundo! De nosso arquivo externo inserido dentro da tag <head>.");

```

Assim como no *inline*, aqui também o carregamento de nossa página aguarda o código JavaScript do arquivo externo ser interpretado antes de carregar o que vem abaixo da tag script em nosso HTML.

Muitas vezes vão ver o script externo ser carregado com o atributo `type` preenchido com `type="text/javascript"`, esse atributo é usado no HTML4 para definirmos o tipo do script que estamos carregando. No HTML5 não é necessário preencher ele, quando não colocamos ele o navegador assume que o código é JavaScript. Abaixo vemos como carregar nossos scripts para os dois casos:

```html
...
  <!-- HTML4 -->
  <script type="text/javascript" src="js/javascript.js"></script>

  <!-- HTML5 -->
  <script src="js/javascript.js"></script>
...
```

Um detalhe importante, quando você carregar um arquivo externo você não pode colocar junto dele código *inline* como no exemplo abaixo na linha 8:

```html{numberLines: true}{7-8}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Como usar a tag script - JavaScript (S01E03)</title>
    <script src="javascript.js">
      // Esse trecho não vai ser processado, não fazer isso
      alert("Olá mundo! Inline");
    </script>
  </head>
  <body>

  </body>
</html>

```

Se fizermos o que está acima, o arquivo externo será baixado e carregado, mas o código *inline* vai ser ignorado.

Outro recurso que temos ao usar `src` é carregarmos arquivos que estão em outro domínio que não o nosso, assim como podemos fazer com o elemento `<img>`. O código vai ser baixado e interpretado como se estivesse em nosso servidor.

Um exemplo disso é ao adicionar o Bootstrap em nossa página usando o seu CDN conforme segue, a *hash* do `integrity` está resumida:

```html
...
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    integrity="sha384-Tc5IQi ... PD7Txa"
    crossorigin="anonymous"></script>
...
```

Precisamos ter cuidado ao fazer isso e apenas usar fontes externas em que confiamos. Devemos fazer isso pois um código malicioso pode trocar o arquivo ou interceptar a transmissão dele causando danos aos nossos usuários. Para evitar isso existem algumas proteções como os atributos `integrity` e `crossorigin` que são explicados mais para frente neste post.

Mas então, se temos que escolher uma delas, qual a melhor maneira? *Inline* ou por arquivo externo?

## Inline vs Arquivo externo

Normalmente é uma boa prática usarmos arquivos externos sempre que possível. Ao fazermos isso temos algumas vantagens.

Uma delas é a facilidade de darmos **manutenção** ao nosso código. Se distribuirmos em várias páginas HTML diferentes o mesmo código JavaScript usando *inline*, quando surgir a necessidade de fazer algum ajuste ou correção teríamos que fazer isso em todas as páginas. Quando carregamos um arquivo externo precisamos fazer isso em apenas um lugar.

Outra vantagem é que os navegadores fazem **cache** de arquivos externos. Se ele perceber que duas páginas usam o mesmo arquivo JavaScript ele vai fazer o download dele apenas uma vez.


## Posicionamento

Tradicionalmente todas as tags `<script>` deviam ser carregadas no `<head>`, assim como fizemos nos exemplos até agora. Isso ajuda a organizar o código, por colocar junto todos os apontamentos para arquivos, tanto os scripts como os styles em um lugar só.

Mas isso pode criar um problema, como vimos nossa página ao chegar em uma tag script para o carregamento até que o código seja baixado e interpretado. Se nosso código for muito grande, ou muito complexo para rodar, a página pode demorar muito tempo para começar a renderizar o conteúdo.

Todo mundo já passou por isso, abrir uma página, especialmente no celular, e o conteúdo demorar demais para aparecer e você desistir de abrir ela. Podem existir outras causas, mas uma delas pode ser o código JavaScript sendo baixado e processado.

Por isso muitas vezes vamos encontrar a recomendação de carregar o JavaScript no final do arquivo HTML, antes do fechamento da tag `<body>`. Abaixo, no segundo exemplo deste post, vemos como fazer isso:

```html{numberLines: true}{16}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Como usar a tag script - JavaScript (S01E03)</title>
  </head>
  <body>
    <!-- Conteúdo analisado primeiro -->
    <h1>Como usar a tag script - JavaScript (S01E03)</h1>
    <p>Conteúdo de nossa página.</p>

    <!--
      Apenas após todo o conteúdo da página ter sido analisado
      o JavaScript é processado
    -->
    <script src="js/javascript.js"></script>
  </body>
</html>

```

Dessa maneira o conteúdo da página é analisado antes de o código JavaScript ser baixado e processado. A página pode ainda não ter todas as funcionalidades, mas nos primeiros segundos já temos visível o conteúdo.

## Atributos

Segue uma relação dos principais atributos que podemos usar com a tag script:

### async

Foi introduzido no HTML5. Quando usado indicamos para o navegador que, se possível, execute o script de modo assíncrono. Não tem nenhum efeito sobre scripts *inline*.

Segue um exemplo de como carregamos um script usando `async`:

```html
...
  <script src="js/javascript.js" async></script>
...
```

De modo prático o que significa é que o navegador não deve parar a renderização da página para baixar e processar o código JavaScript, essas etapas vão ocorrer ao mesmo tempo. Isso nem sempre é uma vantagem, existe muitos casos em que queremos que nosso script rode apenas após termos certeza que toda a página foi renderizada.

### crossorigin

Permite que scripts de outros domínios gerem logs de erro em seu site. Ele tem os seguintes valores possíveis:

- `anonymous`: *requests* para este elemento não terão definidos a flag de credenciais, ou seja, não vai ocorrer a troca de credenciais do usuário via cookies, certificados SSL *client-side* ou autenticação HTTP. Vimos um exemplo disso acima usado pelo Bootstrap.
- `use-credentials`: *requests* para este elemento terão definidos a flag de credenciais, ou seja, os *requests* vão fornecer credenciais.

Abaixo novamente o exemplo do Bootstrap, removi a hash do `integrity` para ficar mais claro o uso do `crossorigin`:

```html
...
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    integrity=""
    crossorigin="anonymous"></script>
...
```

### defer

Já o atributo `defer` serve para indicar ao navegador que ele deve adiar a execução do script para o final do *parse* da página, antes de ocorrer o evento *DOMContentLoaded*. Assim como o `async` ele não deve ser usado em scripts *inline*.

Segue um exemplo de como carregamos um script usando `defer`:

```html
...
  <script src="js/javascript.js" defer></script>
...
```

### integrity

Contém um metadado *inline* que pode ser usado por um navegador verificar se o script recebido foi entregue livre de manipulações não esperadas, como código malicioso. Ele funciona por provermos uma *hash* criptográfica que o arquivo adquirido deve corresponder, caso contrário o código não é processado. É bastante usado em conjunto com CDNs. Vimos um exemplo disso acima usado pelo Bootstrap.

Notar que esse atributo não é suportado pelo Internet Explorer, Edge e Safari, conforme pode ser visto no [Can I use](http://caniuse.com/#search=sri). Caso use um desses navegadores, o script vai ser carregado normalmente. Apenas perdemos essa camada de segurança extra para garantir que o script sendo processado é o esperado.

### src

Definimos neste atributo uma URI para um arquivo externo de script, que pode estar em nosso servidor ou em um outro domínio. Se definirmos esse atributo, não devemos incluir código *inline* na tag script pois este seria ignorado.

### type

Este atributo define a linguagem do código carregado na tag script, tanto para *inline* como para arquivo externo. Isso é conhecido como o [MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). Alguns exemplos de *MIME Types* suportados são `text/javascript`, `text/ecmascript`, `application/javascript` e `application/ecmascript`. Caso o `type` não esteja presente o script é tratado como sendo JavaScript.

Se o tipo especificado for `module` o código será tratado como um módulo JavaScript, essa é uma funcionalidade da ES6.

## Conclusão

Para ver, ou baixar o código dos dois exemplos principais deste post, vá no [repositório do GitHub](https://github.com/mdapper/javascript-s01/tree/master/episodio-03) desta série.

Interessante como uma única tag tem tantos usos e particularidades. Vimos como usar ela para escrevermos código *inline* ou em um arquivo externo. Também onde posicionar a tag script em nosso documento para termos um desempenho melhor. E por último consideramos os principais atributos dessa tag e como usá-los.

No [próximo post](https://devheroes.io/conceitos-basicos-da-ecmascript-s01e04/) vamos dar início a consideração da sintaxe da linguagem, como identificadores, comentários, declarações, expressões, execução, palavras chave e reservadas.
