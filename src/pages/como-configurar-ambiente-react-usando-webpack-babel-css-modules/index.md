---
title: 'Como configurar um ambiente para desenvolvimento em React usando Webpack 2, Babel e CSS Modules'
date: '2017-02-06'
author: mdapper
spoiler: Neste post vamos ver como montar um ambiente moderno para desenvolvimento em React usando Webpack 2, Babel e CSS Modules, com ou sem Sass.
image: ambiente-react-com-webpack-babel-css-modules-768x403.jpg
cta: react
---

Neste post vamos ver como montar um ambiente moderno para desenvolvimento em React usando Webpack 2, Babel e CSS Modules, com ou sem Sass.

A maioria dos desenvolvedores já ouviu falar sobre React em algum momento, se é que já não estão usando ele. Não vou neste artigo explicar o que ele é ou como funciona, já existe bastante informação sobre isso.

Existem muitos *boilerplates* para facilitar iniciar com React, como por exemplo o [Create React App](https://github.com/facebookincubator/create-react-app). Meu objetivo neste artigo é entender como montar um ambiente de desenvolvimento para React do zero. O que cada parte faz e como elas se conectam para produzir o resultado final.

Se você também está começando faça os passos junto comigo, talvez assim como foi para mim tudo no final faça muito mais sentido ao ver em funcionamento.

## Requisitos

Precisamos ter instalado o [Node.js](https://nodejs.org/en/) (na versão 6 ou superior) e o npm ou [Yarn](https://yarnpkg.com/).

Outra coisa útil é instalarmos em nosso editor de preferência o *plugin* do Babel, isso vai ajudar na hora de escrever nossos componentes em ES2015 e JSX. Seguem algumas opções para os principais editores:

- [language-babel](https://atom.io/packages/language-babel) para o Atom
- [babel-sublime](https://github.com/babel/babel-sublime) para o Sublime
- [vscode-babel-coloring](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring) para o VS Code

## Estrutura básica do projeto

Vamos começar criando uma estrutura básica inicial de pastas e arquivos conforme segue:

```
|- intro-react/
  |- public/
    index.html
  |- src/
    |- components/
    index.js
```

Dentro do arquivo `./public/index.html` teremos o seguinte:

```html{numberLines: true}{7,8}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Intro</title>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="./bundle.js"></script></body>
</html>
```

Notar que ainda não temos o arquivo `./bundle.js` da linha 8, ele ainda não existe, vai ser gerado pelo Webpack.

A `<div id="app"></div>` da linha 7 vai ser usada pelo React para inserir nossos componentes.

## Instalar Dependências

Precisamos instalar e configurar as seguintes dependências que vamos usar no projeto:

- React e React DOM
- Webpack
- Babel
- CSS Modules
- Webpack Dev Server

Essas são as principais, vão ter outras que vemos também a seguir.

### React

Se você ainda não tem em seu projeto um arquivo chamado `package.json` vamos criar ele agora. Nele ficam armazenados algumas informações sobre o seu projeto, entre elas quais são as dependências dele.

Podemos criar este arquivo usando o comando abaixo em nosso terminal ou console:

```bash{outputLines: 2-4}
npm init

# ou se preferir usar Yarn

yarn init
```

Preencha os dados que forem solicitados conforme preferir. Em seguida podemos instalar as `dependencies` do `react` e `react-dom` conforme segue:

```bash{outputLines: 2-4}
npm install --save react react-dom

# ou se preferir usar Yarn

yarn add react react-dom
```

Pronto, React instalado. Mas ainda não conseguimos fazer muita coisa só com isso. Vamos ver como usar o Webpack em conjunto com o React.

### Webpack

Se ainda não estiver familiarizado com o Webpack leia primeiro o excelente [artigo do Felix Costa](https://devheroes.io/webpack-2-para-iniciantes-o-que-e-porque-usar-e-como-iniciar/) que introduz ele.

Para instalar o Webpack como uma `devDependencies` use o comando a seguir:

```bash{outputLines: 2-4}
npm install --save-dev webpack

# ou se preferir usar Yarn

yarn add --dev webpack
```

Não vamos instalar ele globalmente pois não é uma prática recomendada pela documentação do Webpack. Se fizéssemos isso, ficaríamos presos a uma versão específica e poderíamos ter erros em projetos que usam uma versão diferente do Webpack.

Agora vamos criar o arquivo `webpack.config.js`, nele vamos fazer todas as configurações necessárias para criarmos nosso arquivo `bundle.js`. A seguir segue a configuração inicial:

```jsx{numberLines: true}{5,8-10,14,17,18}
const { resolve } = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
};
```

Como arquivo de entrada vamos ter o `index.js`, conforme vemos na linha 5, este será nosso componente principal no React mais para frente. Quando temos apenas um item ele pode ser uma *string*, mas como vamos adicionar outras entradas mais para frente criei um *array* para a chave `entry`.

Na chave `output` informamos o seguinte:

- primeiro, qual vai ser o nome do arquivo na chave `filename`.
- segundo, o caminho onde vamos salvar ele quando o bundle for gerado usando a chave `path`.
- terceiro, a chave `publicPath` que vai servir para o Webpack Dev Server.

Na linha 12 temos `devtool: 'inline-source-map'` que serve para gerar source maps de nosso JavaScript, eles nos ajudam a encontrar erros com maior facilidade, mas deve ser usado apenas em desenvolvimento pois gera um *bundle* muito maior.

A chave `resolve` na linha 13 serve para quando não usamos a extensão do arquivo nos *imports* como por exemplo `import MyComponent from './MyComponent'`, ele vai procurar um arquivo chamado `MyComponent.js`.

Usamos `stats` na linha 16 para definir como serão exibidos os *reports* do Webpack:

- A chave `colors` habilita o uso de cores.
- Já a chave `reasons` mostra mais detalhes quando algo falha.

Antes de darmos sequência na configuração do Webpack precisamos instalar e configurar o Babel.

### Babel

Vamos usar ES2015 (ES6) e JSX para a criação de nossos componentes React, para isso vamos precisar transpilar esse código para uma versão que os navegadores atuais compreendam, nessa hora que entra o Babel.

Precisamos instalar ele e algumas dependências para usar em conjunto com o Webpack conforme segue:

```bash{outputLines: 2-4}
npm install --save-dev babel-loader babel-core babel-preset-env babel-preset-react

# ou se preferir usar Yarn

yarn add --dev babel-loader babel-core babel-preset-env babel-preset-react
```

Instalamos o *loader* do Babel para o Webpack `babel-loader`, o core do Babel `babel-core`, o *preset* para usarmos os recursos mais recentes da ES `babel-preset-env` e por último o *preset* para React `babel-preset-react` que permite usarmos JSX.

Agora vamos criar na raiz de nosso projeto um arquivo com nome `.babelrc`. Nele vamos adicionar as configurações para o Babel conforme segue:

```json{3,13}
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "> 2%",
          "last 2 versions"
        ]
      },
      "modules": false,
      "loose": true
    }],
    "react"
  ]
}
```

Aqui estamos informando que o Babel deve usar sempre que transpilar nosso código os *presets* `env` e `react`.

Para o `env` usamos também um objeto com algumas configurações adicionais:

- A primeira é `"targets"`, nela passamos um objeto que contém uma chave `"browsers"`, nesta passamos um array com uma lista dos navegadores que desejamos suportar, neste caso todos os que tenham mais que 2% de uso no mundo e também as duas últimas versões de cada navegador. Essa chave `"browsers"` faz uso do pacote [Browserslist](https://github.com/ai/browserslist) para declarar os ambientes suportados, veja ele para mais detalhes de seu funcionamento.
- A segunda é `"modules": false`, assim informamos que não queremos que o Babel cuide dos módulos, quem vai fazer isso é o próprio Webpack.
- A terceira configuração `"loose": true` permite que certas transformações gerem um *output* mais limpo. Como resultado, o código vai executar mais rápido, também ser bem mais legível e parecido com o original. Para entender melhor quando se deve ou não usar o modo `loose` consulte a [documentação](https://developit.github.io/babel-legacy-docs//docs/advanced/loose/).

A vantagem de usarmos `babel-preset-env` é que ele vai fazer apenas as transformações necessárias de acordo com a lista de browsers que desejamos dar suporte. Por exemplo, se todos os navegadores que vamos suportar já suportam *arrow functions* o Babel não vai transformar estas para ES5.

Se quiser saber mais detalhes sobre o `babel-preset-env` veja a [documentação dele](https://babeljs.io/docs/plugins/preset-env/).

Agora voltando para a configuração do Webpack. Podemos incluir no nosso arquivo de configuração uma nova chave chamada `module` com as configurações para o Babel transpilar nossos arquivos `.js`:

```jsx{numberLines: true}{20-30}
const { resolve } = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: /node_modules/
      },
    ],
  },
};
```

A chave `module` na linha 20 é uma das configurações mais importantes. Aqui colocamos as regras para a criação de nosso *bundle*.

Vamos criar uma regra que vai passar nossos arquivos `.js` pelo Babel e depois gerar o bundle:

- Na chave `test` passamos uma expressão regular, que neste caso vai verificar apenas os arquivos com extensão `.js`
- Se o teste anterior passar, os arquivos vão passar pelo `babel-loader` para serem transpilados.
- Não queremos que os arquivos JavaScript dentro da pasta `/node_modules/` sejam transpilados pelo Babel, por isso usamos a chave `exclude` para informar isso.

Lembrando que já configuramos o Babel por meio do arquivo `.babelrc`, por isso não precisamos configurar mais nada aqui.

Agora vamos ver como trabalhar com CSS nos nossos componentes.

### Usando CSS Modules nos componentes React

Existem diferentes maneiras de trabalhar com *styles* usando React e Webpack. Aqui vou abordar apenas uma delas, que é o uso de [CSS Modules](https://github.com/css-modules/css-modules).

Para isso vamos precisar instalar mais algumas `devDependencies` conforme segue:

```bash{outputLines: 2-4}
npm install --save-dev style-loader css-loader postcss-loader

# ou se preferir usar Yarn

yarn add --dev style-loader css-loader postcss-loader
```

Vamos adicionar agora em nosso arquivo `webpack.config.js` a regra para processar nosso CSS:

```jsx{numberLines: true}{29-54}
const { resolve } = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ],
      },
    ],
  },
};
```

Criamos nossa nova regra dentro da chave `rules`, podemos ver ela nas linhas de 29 a 54. Vamos utilizar três loaders para processarem nosso CSS.

Assim como na regra anterior, passamos em `test` uma expressão regular para ele verificar os arquivos `.css`. Caso atender esse teste, irá rodar os *loaders*.

A ordem que eles rodam é do último para o primeiro, ou seja, primeiro iremos passar nosso CSS pelo `postcss-loader` que vai aplicar os plugins de *postcss* que especificarmos, segundo vai passar pelo `css-loader` que vai fazer uso de CSS Modules. E por último vamos ter o `style-loader` como fallback, para os casos que não se aplicarem aos loaders anteriores.

Vamos entender a configuração deles na ordem que rodam.

#### Configurar o postcss-loader

No `postcss-loader` temos as seguintes configurações:

```jsx
{
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [
        require('autoprefixer')
      ];
    }
  }
}
```

Em `options` vamos passar os [plugins do PostCss](https://github.com/postcss/postcss#plugins) que desejamos utilizar para fazer transformações em nosso CSS. Neste caso estamos usando apenas o `autoprefixer`.

Para informarmos o `autoprefixer` quais os browsers que queremos dar suporte vamos adicionar uma chave de configuração em algum lugar de nosso arquivo `package.json` conforme segue:

```json
{
  ...
  "browserslist": [
    "> 2%",
    "last 2 versions"
  ],
  ...
}
```

Para mais informações sobre essa configuração veja o pacote [Browserslist](https://github.com/ai/browserslist#queries) que é utilizado pelo `autoprefixer`.

Devem ter percebido que é o mesmo pacote usado pelo `babel-preset-env`. Talvez estejam se perguntando, por que precisamos configurar isto em dois lugares, tanto no arquivo `package.json` como no arquivo `.babelrc`?

Bom, para o *autoprefixer* é recomendado fazer essa configuração dentro do arquivo `package.json`, para que outros pacotes do seu projeto possam fazer uso desta configuração.

Mas infelizmente `babel-preset-env` ainda não suporta ler essa configuração no arquivo `package.json`, por isso tivemos que especificar ela também no `.babelrc`. Já existe uma [issue aberta](https://github.com/babel/babel-preset-env/issues/149) para tratar disso. Em uma atualização futura, parece que na versão 2.0 do `babel-preset-env`, será possível configurar isso apenas no `package.json`.

#### Configurar o css-loader

Para o `css-loader` temos um objeto com as seguintes opções:

```jsx
{
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]__[hash:base64:5]',
    url: false
  }
},
```

Aqui passamos para chave `options` um objeto com as seguintes configurações:

- `sourceMap: true` habilita a criação de source maps para nosso CSS, assim vamos identificar com facilidade em qual arquivo está determinado *style* ao inspecionarmos ele no developer tools.
- `modules: true` habilita a exportação para CSS Modules.
- `importLoaders: 1` aqui informamos quantos loaders devem rodar antes do `css-loader`, no nosso caso apenas um, que será o `postcss-loader`.
- `localIdentName: '[name]__[local]__[hash:base64:5]'` nesta configuração podemos compor como vai ser o nome de nossas classes. Por exemplo, se temos um componente chamado `Card` que usa uma classe `title` o nome final de nossa classe vai ser `.Card__title__hYbDt`, a hash no final varia.
- `url: false` informamos para o loader não fazer nenhuma transfformação nas URLs usadas em nosso CSS.

Bom, isso concluí a configuração de nossas `rules`. Vamos ver agora como criar um servidor usando o Webpack.

## Criar um servidor local com Webpack Dev Server

Primeiro vamos instalar o servidor do Webpack e um pacote para fazer o *Hot Module Replacement (HMR)*:

```bash{outputLines: 2-4}
npm install --save-dev webpack-dev-server react-hot-loader@next

# ou se preferir usar Yarn

yarn add --dev webpack-dev-server react-hot-loader@next
```

Aqui instalamos o Webpack Dev Server e também fizemos a instalação do pacote `react-hot-loader`, ele vai permitir que ao fazermos qualquer alteração em nossos componentes React o navegador seja atualizado imediatamente com apenas esta mudança. Usamos a flag `@next` para instalarmos a versão mais recente dele que funciona com o Webpack 2.

Vamos adicionar agora em nosso arquivo `webpack.config.js` as configurações para o `webpack-dev-server` e `react-hot-loader`:

```jsx{numberLines: true}{2,6-9,62-64,67-68}
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
```

Primeira coisa que fizemos foi dar *require* no `webpack` na linha 2, vamos usar alguns *plugins* dele para o *HMR* e outro para gerar mensagens mais claras no *console*.

Na chave `entry` precisamos acrescentar as entradas abaixo:

- Na linha 6 ativamos o *HMR* para React.
- Na linha 7 informamos onde o *bundle* vai estar disponível para o Webpack Dev Server.
- Na linha 8 dizemos para fazer o *reload* apenas de *bundles* bem sucedidos.
- Na linha 9 mantemos o nosso arquivo de entrada `'./src/index.js'`.

Precisamos criar uma chave `devServer` com as configurações para nosso servidor, podemos ver isso a partir da linha 61:

- Na linha 62 habilitamos o *HMR* para nosso servidor de desenvolvimento.
- Na linha 63 usamos a chave `contentBase` para informar onde nosso conteúdo base vai estar, no nosso caso ele se encontra na pasta `public`, é nela que temos nosso arquivo `index.html`.
- Na linha 64 passamos a mesma configuração que fizemos na linha 14.

Por último vamos adicionar alguns *plugins* a partir da linha 66:

- Na linha 67 adicionamos o *plugin* do Webpack que vai habilitar globalmente o *HMR*.
- Na linha 68 adicionamos um *plugin* para gerar mensagens mais legíveis no console sempre que acontecer um *HMR*.

Agora vamos adicionar um plugin do Babel para termos o *HMR* funcionando com nosso código React. Em seu arquivo `.babelrc` adicione `"plugins": ["react-hot-loader/babel"]` no final conforme segue:

```json{15}
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "> 2%",
          "last 2 versions"
        ]
      },
      "modules": false,
      "loose": true
    }],
    "react"
  ],
  "plugins": ["react-hot-loader/babel"]
}
```

Pronto, configurações feitas. Precisamos apenas adicionar um *npm script* `"start"` em nosso arquivo `package.json` conforme segue:

```json
{
  "scripts": {
    "start": "./node_modules/.bin/webpack-dev-server"
  },
}
```

Toda vez que dermos o comando a seguir em nosso terminal, o bundle vai ser gerado e o Webpack Dev Server iniciado em modo *watch*:

```bash{outputLines: 2-4}
npm start

# ou se preferir usar Yarn

yarn start
```

Mas ainda não vamos fazer isso, primeiro vamos criar alguns componentes React básicos.

## Como criar componentes React

Vamos criar nosso componente de entrada no arquivo `src/index.js` conforme segue:

```jsx{numberLines: true}{1-2,5,8}
import React from 'react';
import { render } from 'react-dom';

// AppContainer é um componente wrapper necessário para HMR
import { AppContainer } from 'react-hot-loader';

// Componente que vamos criar
import App from './components/App';

// Estrutura do HMR
const renderApp = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    renderApp(App);
  });
}
```

- Na primeira linha importamos o React.
- Na segunda linha fazemos a importação usando um recurso da ES2015 que permite importar apenas parte de uma biblioteca. Vamos fazer dessa forma para gerar um *bundle* menor, já que vamos utilizar apenas o *render* do `react-dom`.
- Na linha 5 importamos um componente do `react-hot-loader` que precisamos para usar o HMR.
- Na linha 8 importamos nosso componente principal para a variável `App`, vamos criar ele em seguida.
- O restante do código é a estrutura necessária para o *HMR* funcionar em nosso ambiente de desenvolvimento, para maiores informações veja a documentação do [HMR](https://webpack.js.org/guides/hmr-react/)

React usa o padrão [PascalCase](https://en.wikipedia.org/wiki/PascalCase) para dar nome aos componentes, ou seja, eles devem começar com uma letra maiúscula e cada nova palavra deve ter sua primeira letra como maiúscula. Isso serve para podermos diferenciar o que são componentes React de elementos comuns HTML que são escritos em minúsculo.

Antes de criarmos nossos componentes saibam que existe mais de uma maneira de criar eles. Podemos usar as classes da ES2015 ou através do que é chamado de *Stateless Functional Components*, vamos usar este último neste artigo.

Se quiser entender a diferença e quando usar cada um deles leia [este artigo](http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components/) ou então [este](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.gghzlvl6w).

Com isso entendido vamos criar nosso componente `App` no arquivo `/src/components/App.js` conforme segue:

```jsx{numberLines: true}{3-7}
import React from 'react';

const App = () => (
  <div>
    <h1>Meu Primeiro App React</h1>
  </div>
);

export default App;
```

Na primeira linha importamos o React do pacote `react`.

Nas linhas de 3 a 7 temos a definição de nosso componente. Estamos usando a sintaxe ES2015 associando a variável `App` uma *arrow function*. Essa função irá retornar nosso componente, que contém apenas uma `<div>` e dentro desta um `<h1>`.

Na linha 9 exportamos este componente como um módulo para poder ser utilizado em outros lugares. Isso é necessário para podermos usar este componente no arquivo `/src/index.js`.

Pode parecer estranho fazer a importação do React na primeira linha e não fazer uso da variável `React` em nenhum lugar do componente, mas lembre que este código JSX é transpilado para JavaScript conforme segue:

```jsx{numberLines: true}{3,6}
import React from 'react';

const App = () => React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    'Meu Primeiro App React'
  )
);

export default App;
```

Aqui podemos ver que que `React` é usado nas linhas 3 e 6.

## Testar

Chegou a hora de testar se tudo está funcionando.

Para isso vamos em nosso terminal executar o comando abaixo:

```bash{outputLines: 2-4}
npm start

# ou se preferir usar Yarn

yarn start
```

Isso vai iniciar nosso servidor do Webpack.

Em nosso navegador vamos ir até o endereço `http://localhost:8080` para vermos o resultado.

Se tudo deu certo você deve ver o seguinte:

<img src="https://devheroes.io/wp-content/uploads/2017/02/react-intro-01.jpg" alt="Imagem com o resultado - Meu Primeiro App React" />

> Resultado de nosso componente App.js

## Como reaproveitar componentes

Você deve estar se perguntando, todo esse trabalho só pra isso? Bom, agora começa a diversão rsrs.

Vamos criar um novo componente chamado `Message.js` dentro de nossa pasta `/src/components`. Vamos começar ele com o seguinte:

```jsx
import React from 'react';

const Message = () => (
  <div>
    <h2>Hello World!</h2>
  </div>
);

export default Message;
```

Agora vamos em nosso arquivo `App.js` adicionar este novo componente conforme segue:

```jsx{numberLines: true}{2,7}
import React from 'react';
import Message from './Message';

const App = () => (
  <div>
    <h1>Meu Primeiro App React</h1>
    <Message />
  </div>
);

export default App;
```

Primeiro na linha 2 importamos o componente `Message` que acabamos de criar e depois na linha 7 usamos ele com a sintaxe `<Message />`.

Como estamos usando o *HMR* nossa página vai ser atualizada com o seguinte:

<img src="https://devheroes.io/wp-content/uploads/2017/02/react-intro-02.jpg" alt="Imagem com o resultado - Meu Primeiro App React e Hello World!" />

> Resultado de nosso componente App.js e Message.js.

Se quisermos tornar nosso componente `Message.js` reaproveitável, e que ele cada vez exiba uma mensagem diferente, podemos usar `props` conforme segue:

```jsx{numberLines: true}{3,5}
import React from 'react';

const Message = (props) => (
  <div>
    <h2>Hello, {props.name}.</h2>
  </div>
);

export default Message;
```

Aqui usamos um recurso do React de passar propriedades de um componente para o outro, para mais informações veja a [documentação sobre props](https://facebook.github.io/react/docs/components-and-props.html).

Na linha 3 passamos para nossa *arrow function* a variável `props`. Na linha 5 vamos exibir a propriedade chamada  `props.name`.

Para isso temos que atualizar o arquivo `App.js` para ele passar uma propriedade `name` sempre que usarmos o componente `<Message />` conforme segue:

```jsx{numberLines: true}{7-8}
import React from 'react';
import Message from './Message';

const App = () => (
  <div>
    <h1>Meu Primeiro App React</h1>
    <Message name="Bruce Wayne"/>
    <Message name="Clark Kent"/>
  </div>
);

export default App;
```

Notem que agora temos duas ocorrências de nosso componente `<Message />`, em cada uma delas informamos a propriedade `name`. O resultado será o seguinte:

<img src="https://devheroes.io/wp-content/uploads/2017/02/react-intro-03.jpg" alt="Imagem com o resultado - Meu Primeiro App React e Hello Bruce Wayne e Hello Clark Kent" />

> Resultado de nosso componente Message.js usando props.

## Como adicionar estilos usando CSS Modules

Agora vamos ver como usar CSS Modules para dar estilo aos nossos componentes. Vamos fazer isso no componente anterior `<Message />`.

Precisamos primeiro criar um arquivo CSS com o mesmo nome de nosso componente, neste caso `Message.css`, que terá o seguinte conteúdo:

```css
.title {
  font-family: helvetica, arial, sans-serif;
  line-height: 200%;
  padding: 6px 20px 30px;
  background-color: red;
}
```

Para aplicar este *style* em nosso componente, fazemos a seguinte mudança no arquivo `Message.js`:

```jsx{numberLines: true}{2,5}
import React from 'react';
import styles from './Message.css';

const Message = (props) => (
  <div className={styles.title}>
    <h2>Hello, {props.name}.</h2>
  </div>
);

export default Message;
```

Na linha 2 importamos o conteúdo de `Message.css` e associamos ele na variável `styles`.

Em JSX podemos escrever algo semelhante com HTML, mas não é exatamente igual. Notem que em vez de `class` temos que usar `className` na linha 5. Foi preciso fazer isso pois *class* é uma palavra reservada na linguagem JavaScript. Todas as propriedades HTML no JSX devem ser escritas em *camelCase* para serem reconhecidas.

Por isso na linha 5 passamos para `className` o estilo contido na variável `styles`, e ainda especificamos que queremos adicionar apenas o conteúdo que importado que for da classe `.title`. Dessa forma atribuímos em nosso componente o estilo que queremos, o resultado final fica como segue.

<img src="https://devheroes.io/wp-content/uploads/2017/02/react-intro-04.jpg" alt="Imagem final dos componentes React com estilos aplicados através de CSS Modules" />

> Resultado de nosso componente Message.js usando CSS modules.

Notar que o CSS é inserido pelo nosso *bundle* em nossa página, e ele cria um nome único de classe para este componente, ou seja não precisamos nos preocupar de em outro componente usarmos a mesma classe `.title`.

<img src="https://devheroes.io/wp-content/uploads/2017/05/react-intro-05-v2.jpg" alt="Imagem com o código fonte do exemplo onde vemos o nome da classe gerado pelo CSS Module" />

> Classe CSS única criada pelo CSS Module.

É possível usar o *plugin* [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) do Webpack para gerar um arquivo externo que contenha todo nosso CSS, não precisa ficar *inline* como vemos aqui. Em um próximo artigo vamos ver como fazer isso.

## Como configurar Sass

Caso você prefira usar Sass em seus componentes, precisa primeiro instalar as seguintes dependências:

```bash{outputLines: 2-4}
npm install --save-dev sass-loader node-sass

# ou se preferir usar Yarn

yarn add --dev sass-loader node-sass
```

Vamos instalar o loader do Webpack `sass-loader` para processar nossos arquivos `.scss`, quem faz a transformação para CSS é o pacote `node-sass`, por isso precisamos dele também.

Em seguida vamos adicionar no nosso arquivo `webpack.config.js` mais uma regra dentro de `rules`, vai ser a seguinte:

```jsx{numberLines: true}{3,11,27}
  // ...
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          url: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
      {
        loader: "sass-loader"
      }
    ],
  },

  // ...
```

Pode notar que é bem parecida com a que usamos para o CSS, mudamos apenas o seguinte:

- na linha 3 o nosso teste agora passa a ser `test: /\.scss$/,`, queremos testar os arquivo que forem `.scss`
- na linha 11 iformamos que vamos usar dois loaders antes de usar o `css-loader`, no caso primeiro vamos rodar o `sass-loader`, em seguida o `postcss-loader`
- por último na linha 27 colocamos o `sass-loader`, que conforme vimos anteriormente, por ser o último da lista, será o primeiro a rodar

Em seguida podemos criar um arquivo chamado `/src/components/Message.scss` e colocar o seguinte style nele:

```scss
.title {
  font-family: helvetica, arial, sans-serif;
  line-height: 200%;
  padding: 6px 20px 30px;
  background-color: red;

  &:hover {
    background-color: blue;
  }
}
```

Aqui não estamos usando nada muito avançado do Sass, apenas para vermos que está funcionando.

Mas para ter efeito precisamos agora em nosso componente `Message.js` fazer a importação do arquivo `.scss` ao invés do `.css`, podemos fazer conforme segue:

```jsx{2}
import React from 'react';
import styles from './Message.scss';

const Message = (props) => (
  <div className={styles.title}>
    <h2>Hello, {props.name}.</h2>
  </div>
);

export default Message;
```

A única mudança foi na segunda linha, onde importamos agora nosso arquivo Sass.

Como nós modificamos a configuração do Webpack, para ver o resultado você deve parar o Webpack Dev Server, caso esteja rodando, e então iniciar ele novamente:

```bash{outputLines: 2-4}
npm start

# ou se preferir usar Yarn

yarn start
```

Pronto, dessa forma podemos usar também Sass caso precisarmos, notar que neste caso estamos usando ele em conjunto com o CSS Modules.

## Considerações finais

Finalmente temos nossos componentes React reutilizáveis usando CSS Modules. Nada muito complexo, mas já dá para ter uma ideia do que podemos fazer com isso.

Se quiserem ver o código final completo com todas as configurações podem ver no [GitHub](https://github.com/mdapper/intro-react).

Neste artigo vimos como criar um ambiente moderno para desenvolvimento em React usando Webpack 2, Babel e CSS Modules. Em um próximo artigo vamos ver como criar nosso *build* para produção, aguardem.

Qualquer dúvida, crítica ou sugestão só entrar em contato ou comentar aqui embaixo.

## Referências

- [React](https://facebook.github.io/react/)
- [Webpack](https://webpack.js.org/)
- [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
- [Babel](http://babeljs.io/)
- [CSS Module](https://github.com/css-modules/css-modules)
- [Workshop de React do Frontend Masters - $pago](https://frontendmasters.com)
