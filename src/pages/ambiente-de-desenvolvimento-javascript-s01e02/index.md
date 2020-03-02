---
title: 'Ambiente de Desenvolvimento - JavaScript (S01E02)'
date: '2016-11-29'
spoiler: Neste post vamos ver como configurar um ambiente de desenvolvimento para podermos programar em JavaScript.
cta: environment
---

Neste post vamos ver como configurar um ambiente de desenvolvimento para podermos programar em JavaScript.

<img src="https://devheroes.io/wp-content/uploads/2016/11/JavaScript-S01E02-ambiente-de-desenvolvimento.png" alt="JavaScript Ambiente de Desenvolvimento" />

Se você vem de linguagens como C# ou Java deve já estar pensando que precisamos de uma avançada IDE (Ambiente de Desenvolvimento Integrado, em inglês). Mas este não é o caso para o JavaScript.

## Ferramentas

Vamos precisar inicialmente apenas de duas ferramentas, que você já deve ter disponível em seu computador. Precisamos de um navegador de internet e de um editor de texto.

### Navegador

Para visualizar o resultado precisamos de um navegador, irei utilizar o Google Chrome nesta série. Outra boa opção é o Mozilla Firefox, ele também fornece os recursos que vamos precisar, se você já usa ele não tem necessidade de mudar para o Chrome apenas para acompanhar essa série.

Segue um link para vocês baixarem e instalarem ele, caso queiram:

[Google Chrome](https://www.google.com.br/chrome/browser/desktop/)

### Editor de texto

Os documentos em HTML, CSS e JavaScript são arquivos de texto simples que podem ser criados e editados em qualquer editor de textos comum, como o Bloco de Notas do Windows, ou o TextEdit do macOS.

Para facilitar a produção de documentos, existem editores JavaScript específicos, com recursos sofisticados, que facilitam a realização de tarefas repetitivas e possuem outros recursos que lhe auxiliam no desenvolvimento.

Se você agora está estudando JavaScript, provavelmente estudou primeiro HTML e CSS. Quando fez isso, provavelmente lhe indicaram instalar um editor de texto. Possivelmente você já usa um que gosta, não é preciso você trocar.

Segue uma lista com alguns dos mais usados:

- [Atom](https://atom.io/)
- [Brackets](http://brackets.io/)
- [Sublime Text](https://www.sublimetext.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

Qualquer um deles vai atender perfeitamente suas necessidades para acompanhar esta série. Eu atualmente tenho usado o Atom como meu editor principal, mas recentemente resolvi testar o Visual Studio Code e estou gostando bastante dele, ele tem se mostrado mais leve que o Atom.

Notem que nenhum deles é uma IDE, mas possuem recursos avançados e podem ser estendidos pela instalação de pacotes.

A instalação deles é bastante simples, não vou passar orientações de como fazer isso, mas se tiverem qualquer problema deixam um comentário que vou tentar lhes ajudar.

Agora que temos o navegador e o editor instalados, vamos ao que interessa.

## Como rodar nosso primeiro código JavaScript

Primeiro crie um arquivo chamado `index.html` e salve ele numa pasta de sua preferência.

Abra esse arquivo com seu editor de texto e insira nele a estrutura básica em HTML5 conforme segue:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ambiente de Desenvolvimento – JavaScript (S01E02)</title>

  </head>
  <body>

  </body>
</html>
```

Conforme vemos abaixo, na linha 6 adicionamos a abertura e o fechamento da tag `<script></script>`. Dentro desse bloco, entre a abertura e o fechamento da tag, é onde iremos inserir nosso código JavaScript no próximo passo.

```html{6}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ambiente de Desenvolvimento – JavaScript (S01E02)</title>
    <script></script>
  </head>
  <body>

  </body>
</html>
```

Até agora criamos apenas a estrutura.

Vamos adicionar um método padrão da linguagem que exibe uma mensagem em uma janela de alerta. O nome dele é `alert`, para exibirmos essa mensagem precisamos passar algum texto que vai ser mostrado, fazemos isso da seguinte maneira `alert("Mensagem para exibir");`.

Nos próximos artigos vamos entender melhor como é o funcionamento disso, por enquanto queremos apenas testar se nosso ambiente de desenvolvimento está funcionando.

Na linha 7 adicionamos o método `alert`, com a mensagem "Olá mundo!", conforme segue:

```html{7}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ambiente de Desenvolvimento – JavaScript (S01E02)</title>
    <script>
      alert("Olá mundo!");
    </script>
  </head>
  <body>

  </body>
</html>
```

Para vermos o resultado precisamos abrir o `index.html` no navegador. Ao fazermos isso irá aparecer uma caixa de mensagem parecida com a que segue:

<img src="https://devheroes.io/wp-content/uploads/2016/11/javascript-s01e02_alert-window.jpg" alt="Janela de Alerta do Chrome" width="444" height="141" class="image--center size-full wp-image-177" />

Acredito que os passos aqui abordados são simples, mas se ficarem presos em algum ponto deixem suas dúvidas nos comentários que vou procurar ajudar.

Se desejarem podem baixar o código final no [GitHub](https://github.com/mdapper/javascript-s01/blob/master/episodio-02/index.html). Vou manter um repositório lá de toda a série.

## Conclusão

Neste post vimos como configurar nosso ambiente de desenvolvimento para escrevermos e executarmos nosso código JavaScript. Aqui consideramos apenas uma maneira de usarmos a tag `<script>`.

No [próximo post](https://devheroes.io/como-usar-tag-script-javascript-s01e03/) vamos ver de que outra forma podemos usar essa tag e quais as vantagens e desvantagens de cada um, além dos principais atributos dela e como usar eles.
