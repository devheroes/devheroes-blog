---
title: 'Webpack 2 para iniciantes - o que é, porque usar e como iniciar'
date: '2017-01-30'
spoiler: Desenvolver e configurar o ambiente para o desenvolvimento web moderno pode ser um problema, principalmente se você está iniciando e tem medo de todas essas siglas que invadiram o mundo do JavaScript.
cta: webpack
---

Desenvolver e configurar o ambiente para o desenvolvimento web moderno pode ser um problema, principalmente se você está iniciando e tem medo de todas essas siglas que invadiram o mundo do JavaScript.

Cada solução - cada sigla - resolve um problema específico e com o Webpack não é diferente. Na verdade ele é tão poderoso que podemos usa-lo para mais tarefas além da sua proposta inicial.

## O que é o webpack?

Se você está começando ou de olho nas novas soluções para desenvolvimento web como o [Angular](https://angular.io/), [React](https://facebook.github.io/react/), ou qualquer outro framework/biblioteca, deve ter percebido a presença ou menção a essa ferramenta. Sendo direto, o Webpack é um **bundler** (empacotador) de módulos JavaScript.

Mas espera... o que então seria um bundler? O JavaScript é uma linguagem poderosa e a evolução natural da linguagem seria um dia trabalhar com módulos. Quem já trabalhou ou já viu algum código em NodeJS, deve ter percebido o uso do require.

```jsx
var chunk = require('lodash.chunk')
```

Algo muito semelhante a outras linguagens que fazem uso de importação, seja através do caminho do arquivo ou através de [namespaces](http://php.net/manual/pt_BR/language.namespaces.php) como acontece com o PHP:

```php
use App\SomeLibrary;

// or

require_once 'someLibrary.php';
```

E trabalhar com módulos no JavaScript é natural se você está trabalhando com NodeJS mas nos browsers a coisa muda de figura. Se você quer entender mais a ideia dos bundlers eu sugiro o [artigo do Vinicius Reis](https://blog.codecasts.com.br/ecossistema-javascript-parte-05-bundlers-builders-6809b17ddcf8#.ltj42buse) que traz uma boa análise sobre as soluções disponíveis.

Uma vez entendido o que é um bundler, entendemos que trabalhar com um JavaScript modular para os navegadores é uma preocupação adicional. O Webpack abstrai tudo relacionado aos módulos JavaScript e escrevemos como será o processo de build da nossa aplicação usando um arquivo de configuração.

Quando você executa o webpack, ele lê a árvore de dependência do projeto e faz todos os cálculos dos assets necessários para o seu projeto. O que ele nos retorna? Um único arquivo - ou mais a depender da configuração que criamos. Um arquivo estático, que representa todo o projeto e o torna compatível a ser executado pelo navegador, não importando se você está trabalhando com módulos no padrão [ES6 (import)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import) ou C[ommonJS / NodeJS (require)](http://requirejs.org/docs/commonjs.html) ou [AMD](http://requirejs.org/docs/whyamd.html). Confuso? Vamos com calma, aos poucos tudo fará sentido.

## Por que usar?

O webpack cuida do empacotamento pra mim e me retorna um único arquivo parseado e pronto pra ser interpretado pelo navegador mas o que mais ele faz?

A ideia central até poderia ser essa, somente cuidar dos problemas do require nos navegadores, mas desde a sua versão 1, atualmente estamos na versão 2.2, o webpack se tornou um gerenciador de todo código front-end. Como cita o Vinicius Reis em seu artigo:

> ele é capaz de gerar bundlers de (basicamente) qualquer tipo de asset,
> sejam imagens, css, html, sass, less… Essa característica fez muitas
> pessoas deixarem de usar grunt e gulp para usar somente o webpack.

O objetivo é fazer de todo o nosso código um módulo e apenas agrupar as coisas que precisamos e que realmente será usado. Então se eu pudesse listar algumas das coisas mais legais no webpack, eu listaria:

- Eliminação de ativos inutilizados. Nós só construímos as imagens e
  folhas de estilo em nossa pasta final de distribuição que nossa
  aplicação realmente vai precisar. Para isso ele utiliza o Tree Shaking, um algorítimo de dead code elimination.
- Um ótimo sistema / loader para usar módulos nosso JavaScript.
- Ótimos plugins pra agilizar mais ainda o processo de desenvolvimento, integrando com o [Babel](https://babeljs.io/), minificação dos assets e etc.

Uma coisa que precisamos entender é: ele não substitui o [Grunt](http://gruntjs.com/) ou [Gulp](http://gulpjs.com/) ou qualquer [task runner JavaScript](https://blog.codecasts.com.br/ecossistema-javascript-parte-03-task-runners-5acedba9f072). Ele também faz alguns papeis desses, mas tudo com foco no empacotamento da nossa aplicação. No final de todo o processo, o nosso projeto com dezenas de dependências, centenas de arquivos de lógica incluindo os arquivos de CSS, imagens e etc, serão empacotados em, por exemplo, uma pasta com index.html, todo o javascript em somente um arquivo e o restante dos assets usados.

Quanto a decisão de usar ou não, depende da necessidade. Se você vai trabalhar com JavaScript e, consequentemente com módulos, eu sugiro a utilização. Se o seu objetivo é automatização de tarefas sem se preocupar com o uso de módulos e empacotamento, outras soluções seriam melhores como Grunt ou Gulp. Como eu mencionei anteriormente, o webpack vem se tornando um padrão a ser utilizado nos projetos atualmente. Em todo caso, é importante saber que existem outras soluções para empacotamento que tem ganhado certo destaque como o [rollup.js](http://rollupjs.org/) e o irmão mais velho dos bundlers, o [browserify](http://browserify.org/).

## Iniciando

Então vamos começar botando um pouco a mão na massa e alternando entre os conceitos usados pelo webpack. Inicialmente vamos iniciar um projeto simples com nosso [NPM](https://www.npmjs.com/). O mesmo processo pode ser usado com o [Yarn](https://yarnpkg.com/) caso prefira trabalhar com ele:

```bash{outputLines: 2}
npm init
```

Feito isso e terminado a configuração básica do NPM podemos adicionar o webpack em nosso projeto. Vamos usar a versão mais recente, caso queira saber quais são algumas das novas features do Webpack 2 veja [este artigo](https://medium.com/@oieduardorabelo/o-que-h%C3%A1-de-novo-no-webpack-2-81ad9fa08927):

```bash{outputLines: 2}
npm install --save-dev webpack
```

Lembre-se que se estiver utilizando Linux, a depender do seu ambiente, é necessário adicionar o comando sudo: $ sudo npm instal....

Com isso temos o webpack pronto pra ser usado em nosso projeto e adicionado nas dependências de desenvolvimento do projeto. Isso porque não iremos precisar dele em produção. Ele se encarregará de nos entregar o código pronto pra distribuição. É importante notar também que adicionei além do webpack o webpack-dev-server que é um servidor embutido e que facilita o desenvolvimento de aplicações com o webpack. Podemos utilizar algumas coisas bacanas como o hot reload que faz o build e restart do servidor automaticamente para que não precisemos atualizar a página do projeto a cada modificação, entre outras coisas legais.

Para averiguar se tudo está ok, execute o seguinte comando no terminal:

```bash{outputLines: 2}
./node_modules/.bin/webpack
```

A saída deverá ser algo como:

> No configuration file found and no output filename configured via CLI
> option. A configuration file could be named 'webpack.config.js' in the
> current directory. Use --help to display the CLI options.

Estamos prontos para o próximo passo. Caso a mensagem seja algo diferente dessa, houve algo de errado com a instalação ou com o ambiente.

## Conceitos

Como vimos na saída do comando acima, o webpack diz que não encontrou arquivo de configuração algum. Isso porque o webpack trabalha em cima de um arquivo de configuração. Sem ele, o webpack não saberá o que fazer. Esse arquivo nada mais é que um objeto JavaScript e por convenção deve ser chamado de `webpack.config.js`. Crie então na raiz um arquivo com esse nome.

Após isso, antes de começarmos a "codar" no arquivo de configuração, é importante conhecer os conceitos que o webpack traz. Isso é pre-requisito para bom entendimento das configurações e para evitar futuras dores de cabeça.

### Entry

O webpack cria um grafo de todas as dependências da nossa aplicação. O ponto inicial desse grafo é o chamado entry point. Ele quem irá dizer para o webpack por onde começar e por onde seguir pelas dependências. Podemos entender esse entry point como um root ou index da nossa aplicação. Vamos começar então a codificar o nosso arquivo e preencher o entry point:

```jsx
module.exports = {
  entry: {
    app: './index.js',
  }
};
```

Então estamos dizendo: webpack, eu vou ter um arquivo chamado index.js onde toda a minha aplicação JavaScript irá começar e a partir de lá você pode começar a montar o seu grafo pra no final me gerar algo bem bacana!

Lógicamente, vamos criar esse arquivo index.js, por enquanto, vazio. Se for Linux e estiver no terminal, pode usar:

```bash{outputLines: 2}
touch index.js
```

Outra coisa a se observar é que o entry point não se limita somente a isso. Na verdade toda configuração do webpack pode ser bem complexa e flexível. Como sugere a [documentação do webpack](https://webpack.js.org/concepts/entry-points/) podemos utilizar múltiplos entries:

```jsx
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};

module.exports = config;
```

### Output

Uma vez feito todo o empacotamento, o webpack precisa "cuspir" tudo isso em uma saída. Então precisamos dizer para o webpack onde será e como será essa saída e como o nosso código empacotado irá se comportar. Fazemos isso na propriedade output do webpack. Algo assim:

```jsx{numberLines: true}{7-10}
var path = require('path');

module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  }
};
```

Com isso, o webpack irá ler cada entry, gerar sua árvore e dependência, todo o código será parseado e empacotado em um arquivo final, que será aquele especificado na chave `output.filename`.

O [name] ali apresentado entre colchetes será substituído por cada nome dentro da chave entry dinamicamente. Então teremos no final: `app.bundle.js` porque o nome do nosso entry point é app.

### Loaders

Como já foi mencionado, o webpack consegue trabalhar com cada arquivo, seja .css, .scss, .jpg, etc e ele trata todos como um módulo. Só que apesar disso, o webpack apenas entende JavaScript. O objetivo dos Loaders é pegar esses arquivos e transforma-los em módulos que serão adicionados em nosso grafo de dependências. Ou seja, aqui podemos trabalhar com os demais arquivos além de JavaScript. É realmente um pré-processamento dos arquivos, como um [SASS](http://sass-lang.com/) ou [LESS](http://lesscss.org/) ou Babel da vida.

A configuração consiste de dois propósitos:

- Identificar os arquivos que devem ser transformados por um certo loader.
- Transformar esse arquivo que então será adicionado no grafo de dependências e usado no nosso bundle.

Para o nosso projeto de teste, vamos utilizar ES6 (ES2015), e como essa versão não é compreendida pelos navegadores ainda, é necessário um processo de transpilação que basicamente irá converter nosso código ES6 em um código "entendível" pelo browser como o ES5. Para fazer esse trabalho de transpilação usamos o Babel e podemos usar um loader do webpack que é específico pra fazer essa transpilação para nós. Antes de mais nada vamos adicionar as dependências exigidas para trabalharmos com Babel:

```bash{outputLines: 2}
npm install babel-loader babel-core babel-preset-es2015
```

Perceba que baixamos o loader para o webpack e baixamos também o core do Babel juntamente com o Preset para ES6.

Com tudo instalado podemos incluir no nosso arquivo de configuração uma nova chave chamada modules. Veja como fica a configuração do Babel:

```jsx{numberLines: true}{12-21}
var path = require('path');

module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['es2015']]
        }
      },
    ]
  }
};
```

`Rules` é um array que conterá todos os nossos loaders e cada loader é um objeto com suas chaves principais que é `test` e `loader`. No caso do babel-loader podemos passar parâmetros adicionais. Essa configuração é a padrão para se trabalhar com ES6 e Babel juntamenet com o webpack.

Com essa configuração, o Webpack irá procurar todos os arquivos que combinam com a expressão regular /\.js$/ (propriedade test) e irá utilizar o babel-loader (propriedade loader) nesses arquivos. É importante frisar que para a propriedade test usamos expressões regulares para realmente conseguir capturar os arquivos que irão sofrer esse pré-processamento. Usar expressões regulares te da um maior controle de quais arquivos serão usados ou não.

Poderíamos usar outros loaders, como exemplo, para SASS ou LESS ou para trabalhar com nossas fontes mas como não usaremos nesse artigo, deixo como dever de casa para o leitor. Apenas para entender como seria um arquivo de configuração com mais loaders, observe esse exemplo:

```jsx{numberLines: true}{15-16,19-20}
const loaders = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015']
          ]
        }
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        loader: 'url-loader'
      }
    ]
  }
}
```

Sem segredos. Usamos 3 loaders para trabalharmos com LESS (style-loader, css-loader e less-loader) e um loader para trabalharmos com endereço das fontes (url-loader). Com toda essa configuração já somos capazes de escrever em LESS e nosso bundle terá nosso LESS pré-processado e pronto pra produção.

### Plugins

Os loaders apenas executam transformações em cima dos arquivos base. Já os Plugins podem e são mais usados para que certas ações e funcionalidades sejam adicionadas na compilação dos nossos módulos empacotados. Além disso o sistema de plugins é extremamente customizável. Nós construímos um objeto do plugin e o adicionamos no arquivo de configuração e esse plugin será responsável por tomar certas ações.

Existe uma lista de plugins oficiais do webpack que pode ser [encontrada aqui.](https://webpack.js.org/plugins/) Mas existem diversos outros feitos por terceiros e você mesmo pode construir o seu a depender da sua necessidade.

Um plugin bastante útil e conhecido é o **CommonsChunkPlugin**. Se estivermos dividindo a nossa aplicação em vários arquivos finais (empacotados) é bem possível que, em cada uma dessas partes, estejamos utilizando uma dependência em comum entre eles. Por padrão, o Webpack irá resolver as dependências unicamente para cada arquivo. E isso é bem ruim do ponto de vista do pacote final. Para utilizarmos o plugin que soluciona isso temos:

```jsx
const webpack = require('webpack');

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names : ['vendor', 'manifest'],
  filename: "commons.js"
});
```

Com esse exemplo, teremos um arquivo chamado common.js que, caso você tenha uma dependência de vendor seja usada ela será extraída para esse arquivo no final e poderemos fazer otimizações de cache ao invés de ter que carregar um pacote maior sempre que uma nova página é visitada.

Uma observação importante é saber o que exatamente é o nome vendor dentro do nosso CommonsChunkPlugin: é apenas uma referência a alguma dependência que podemos colocar dentro do nosso entry point. Vamos observar:

```jsx
entry: {
  app: './index.js',
  vendor: ['lodash', 'bootstrap', 'whateverDependency']
},
```

Além de falar pro webpack qual o meu arquivo inicial, de start da árvore de dependências, eu posso declarar quais dependências eu quero que sejam geradas separadamente. Nesse exemplo além de um app.bundle.js eu terei um arquivo separado somente com as bibliotecas [lodash](https://lodash.com/), [bootstrap](http://getbootstrap.com/) ou qualquer outra lib. Com esse tipo de configuração eu consigo mais organização no arquivo de configuração e deixo mais explícito como eu quero que seja gerados os chunks com o CommonsChunksPlugins.

No nosso exemplo final não precisaremos usar Plugins mas vamos ver como ficaria nosso arquivo de configuração com a adição de um plugin:

```jsx{numberLines: true}{33}
const webpack = require('webpack');
const path = require('path');

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: [
    'vendor', 'manifest'
  ],
  filename: "commons.js"
});

module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015']
          ]
        }
      }
    ]
  },
  plugins: [commonChunkPlugin]
};

```

E todos os outros plugins adicionados serão declarados na chave plugins, separados por vírgula. Caso prefira instanciar o plugin dentro da chave plugins, não há problema:

```jsx
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    filename: "commons.js"
  }),
]
```

Com esse conceito final e uma configuração básica do webpack, podemos agora começar algumas brincadeiras para ver seu comportamento.

## Exemplo prático e resultado

Vamos então ao nosso arquivo webpack.config.js final para esse exemplo:

```jsx
const path = require('path');

module.exports = {
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015']
          ]
        }
      }
    ]
  }
};
```

Já criamos mais no começo do artigo o nosso arquivo index.js então vamos agora criar nossos arquivos index.html e um diretório chamado dist e que especificamos lá na chave output.path. Isso é mais para organização do código gerado pelo webpack mas fica a gosto do freguês uma configuração pessoal em relação a onde armazenar o código empacotado.

```bash{outputLines: 2}
touch index.html && mkdir dist
```

A ideia é: teremos uma página em HTML que simplesmente terá um input e um botão de pesquisar. O que a nossa página fará é, dado um determinado CEP digitado pelo usuário, quando ele clicar em pesquisar, ser exibido abaixo a cidade referente a esse CEP. Vamos ao nosso index.html:

```html{numberLines: true}{17}
<!DOCTYPE html>
<html lang="pt">
  <head>
    <title>Simple Webpack Usage</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div>
      <input id="cepInput" type="text" name="cep" value="">
      <button id="searchCep">Pesquisar</button>

      <h2 class="city-result">
      </h2>
    </div>

    <script src="dist/app.bundle.js"></script>
  </body>
</html>
```

Uma observação aqui é a tag script que adicionamos. Percebeu que ela aponta pra um arquivo que ainda não existe? Mas esse arquivo é o que será gerado pelo webpack pra nós, lembra? O nome dele será app.bundle.js porque no nosso entry point demos para ele o nome app.

Para realizar a pesquisa por CEP utilizaremos uma excelente lib feita pelo [Filipe Deschamps](https://twitter.com/FilipeDeschamps), a [cep-promise](https://github.com/filipedeschamps/cep-promise) que é baseada em [Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise). Vamos instalar via NPM:

```bash{outputLines: 2}
npm install --save cep-promise
```

E finalmente vamos para o nosso arquivo index.js que conterá a nossa simples lógica JavaScript:

```jsx{numberLines: true}{1,6,9}
import cep from 'cep-promise';

document
  .getElementById("searchCep")
  .addEventListener("click", () => {
    let cepValue = document.getElementById('cepInput').value;

    cep(cepValue).then((data) => {
      document.querySelector('.city-result').innerHTML = data.city;
    }).catch(console.log)
  });

```

Não há muito segredo e se parecer assustador pra você, calma, vamos entende-lo. Nós importamos a cep-promise usando ES6 imports (e podemos fazer isso porque o nosso babel-loader vai cuidar de tudo pra nós), escutamos um evento de clique no botão que faz a pesquisa, pegamos o valor que está no input que o usuário digitou e então chamamos a função de cep pra fazer a pesquisa. No final da promessa, ela irá jogar o valor da cidade pra dentro do nosso elemento H2 que colocamos com uma classe chamada city-result.

Massa, agora que terminamos tudo, vamos fazer funcionar? Porque até então o nosso index.html precisa de um app.bundle.js e não criamos ainda. O comando que fará o empacotamento da nossa aplicação é aquele que usamos no final do primeiro capítulo: `./node_modules/.bin/webpack`
E a saída será algo semelhante a isso:

<img src="https://devheroes.io/wp-content/uploads/2017/01/appbundle-768x439.png" alt="Saída do comando principal do webpack" />

> Saída do comando principal do webpack

O mais importante que devemos notar é a linha amarela. Ele basicamente diz que emitiu um arquivo chamado app.bundle.js e o seu tamanho total é 434kb. Sim, esse é o arquivo completo com o nosso arquivo e com todas as dependências que foram usadas, que no caso, foi somente o cep-promise mas poderiam ser muito mais e com um grau de complexidade maior.

Se dermos uma olhada no arquivo final gerado dentro da pasta dist/ veremos que ele nos joga um arquivo enorme, escrito totalmente em um JavaScript que será entendido pelos browsers.

<img src="https://devheroes.io/wp-content/uploads/2017/01/appbundle2-768x376.png" alt="Janela do Visual Studio Code com o resultado do bundle gerado pelo webpack" />

> Janela do Visual Studio Code com o resultado do bundle gerado pelo webpack

Para executar nosso projeto poderíamos utilizar o webpack-dev-server como mencionei anteriormente mas por hora, vamos utilizar um utilitário que facilita muito o processo de "servir" páginas em ambiente local. É o [lite-server](https://github.com/johnpapa/lite-server) do [John Papa](https://twitter.com/John_Papa). Basta seguir os passos inicias descritos na documentação, no meu caso, instalei globalmente mesmo. Uma vez instalado posso usar o seguinte comando dentro do projeto raiz:

```bash{outputLines: 2}
lite-server
```

O servidor irá ler automaticamente o nosso index.html e nos fornecer um endereço local para acessarmos a nossa aplicação.
Se formos testar agora a nossa aplicação, teremos o seguinte resultado:

<img src="https://devheroes.io/wp-content/uploads/2017/01/appbundle3-768x134.png" alt="Janela do browser com o resultado da execução da nossa aplicação usando webpack" />

> Janela do browser com o resultado da execução da nossa aplicação usando webpack

Conseguimos executar nossa aplicação empacotada e que utiliza ES6 com sucesso! Se você der uma olhada profunda no app.bundle.js gerado pelo webpack verá que tanto a nossa lógica do index.js quanto toda a lib cep-promise estará lá, pronta pra uso.

## Considerações finais

Webpack é isso e muito mais. Muito mais. É uma ferramenta poderosa que só tem a acrescentar na sua stack front-end. Poderíamos ter usado o webpack-dev-server, utilizado mais plugins para mais problemas específicos mas o objetivo desse simples artigo é somente dar um norte sobre webpack. Com certeza vale a pena investir nele e na documentação do webpack 2.x que está fantástica e tem quase tudo que é possível fazer com ele e descobrir como ele pode te ajudar.

Irei deixar alguns links de outros artigos e materiais que usei como fonte para esse artigo. Até a próxima! Ah, peço-lhe humildemente que qualquer dúvida, crítica, reclamação ou erros me notifique por e-mail, twitter, tanto faz, deixa aí seu feedback para saber onde posso melhorar. Abraços.

## Referências

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Introdução ao Webpack 2](https://medium.com/tableless/introdu%C3%A7%C3%A3o-ao-webpack-2-39e4c97d5b8c#.iyfibdtp0)
- [Começando um projeto com Webpack 2](http://barraponto.blog.br/2017/01/12/comecando-um-projeto-com-webpack-2/)
- [Another Webpack tutorial on the internet](https://blog.boseriko.com/another-webpack-tutorial-on-the-internet-43b35af4b55f#.7osckxb77)
- [Another webpack intro](https://medium.com/@_jh3y/another-webpack-intro-c71454efa194#.jdj3w2ti7)
- [Webpack — New way of building ng2 app](https://medium.com/@richavyas/webpack-new-way-of-building-ng2-app-a34a3bdabb17#.6t13w8mmp)
