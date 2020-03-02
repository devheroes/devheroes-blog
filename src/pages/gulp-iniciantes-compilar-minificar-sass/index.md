---
title: 'Gulp para iniciantes - como compilar e minificar Sass'
date: '2017-01-04'
spoiler: Neste artigo vamos ver como instalar e usar o *Gulp* para automatizar algumas tarefas básicas como compilar e minificar o *Sass*.
cta: gulp
---

Neste artigo vamos ver como instalar e usar o *Gulp* para automatizar algumas tarefas básicas como compilar e minificar o *Sass*.

<img src="https://devheroes.io/wp-content/uploads/2017/01/gulp-iniciantes-compilar-minificar-sass.jpg" alt="Gulp para iniciantes - como compilar e minificar Sass" />

## Estrutura básica de pastas e arquivos

Uma das vantagens em usarmos *Gulp* e *Sass* é para podermos organizar melhor nosso projeto. Vamos começar criando uma estrutura básica inicial de pastas conforme segue:

```
|- gulp-intro/
  |- css/
  |- src/
    |- scss/
      style.scss
  index.html
```

A pasta principal do projeto vai ser `gulp-intro`. Dentro da pasta `/src/scss` é onde vamos trabalhar em nosso *Sass*. Depois a versão compilada e minificada do *Sass* vai ser exportada para a pasta `/css`.

Fiquem à vontade em adaptar essa estrutura para uma que vocês já utilizam, só irão precisar mais para frente apontar algumas variáveis para as pastas que forem usar.

## Instalação do Gulp

Antes de instalar o *Gulp* você vai precisar ter em seu computador o Node.js instalado.

Se você estiver no Windows faça o [download dele](https://nodejs.org/en/) e instale. Caso use macOS ou Linux recomendo instalar o Node usando o [NVM](https://github.com/creationix/nvm), ele permite que você instale diferentes versões do Node e troque facilmente entre elas, o que é muito útil caso você trabalhe em projetos que usam diferentes versões dele.

Para quem usa Linux, saiu um artigo recente no [Tableless](https://tableless.com.br/como-instalar-node-js-no-linux-corretamente-ubuntu-debian-elementary-os/) de como fazer a instalação do Node usando o NVM.

Assim que tiver o Node instalado podemos instalar o *Gulp* usando o comando que segue do NPM:

```bash
$ npm install --global gulp-cli
```

Esse comando vai instalar globalmente `--global` o `gulp-cli` para utilizarmos ele em qualquer projeto.

Se você ainda não tem em seu projeto um arquivo chamado `package.json` vamos criar ele agora. Nele ficam armazenados algumas informações sobre o seu projeto, entre elas quais são as dependências dele.

Podemos criar este arquivo usando o comando abaixo:

```bash
$ npm init
```

Vão aparecer algumas perguntas para você responder que são usadas para poder criar o arquivo `package.json`. Não é preciso preencher todos os dados que vão ser solicitados, você pode fazer isso mais tarde se for preciso.

Na imagem que segue destacado em vermelho estão minhas respostas:

<img src="https://devheroes.io/wp-content/uploads/2017/01/gulp-npm-init.png" alt="Perguntas para responder do comando npm init" />

O que aparece dentro de parênteses são sugestões do próprio NPM como respostas, basta dar `Enter` para confirmar, ou então digitar outra resposta se preferir.

O arquivo `package.json` criado terá o seguinte conteúdo:

```jsxon
{
  "name": "gulp-intro",
  "version": "1.0.0",
  "description": "Gulp Intro",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Marcelo Dapper",
  "license": "ISC"
}

```

Uma vez que temos em nosso projeto o arquivo `package.json` podemos instalar a dependência local do *Gulp* usando o comando abaixo:

```bash
$ npm install --save-dev gulp
```

Após fazermos isso essa dependência será baixada para a pasta `node_modules`, se procurar dentro dela vai encontrar uma pasta chamada `gulp`:

<img src="https://devheroes.io/wp-content/uploads/2017/01/gulp-folder-v2.png" alt="Pasta gulp dentro de node_modules em nosso projeto" />

Vai perceber também que foram instaladas muitas outras coisas junto do Gulp, isso é normal, não se assuste. As outras pastas são dependências que o próprio *Gulp* vai precisar.

Se abrir o arquivo `package.json` vai ver o *Gulp* listado como `devDependencies`, conforme segue na linha 12:

```jsxon{12}
{
  "name": "gulp-intro",
  "version": "1.0.0",
  "description": "Gulp Intro",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Marcelo Dapper",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1"
  }
}

```

Se você está usando o Git para controle de versão do seu projeto, lembre-se de criar um arquivo `.gitignore` na raiz do seu projeto e incluir nele `node_modules` para que ele ignore está pasta, você não vai querer ter ela em seu repositório.

Para este artigo criei meu arquivo `.gitignore` com o seguinte conteúdo:

```
# Node.js #
node_modules
```

### Criar o arquivo de configuração 'gulpfile.js'

Todas as configurações do *Gulp* são guardadas dentro de um arquivo chamado `gulpfile.js`. Por isso vamos criar agora este arquivo na raiz de nosso projeto.

Após isso teremos a seguinte estrutura de arquivos e pastas em nosso projeto:

```bash{8}
|- gulp-intro/
  |- css/
  |- node_modules/
  |- src/
    |- scss/
      style.scss
  .gitignore
  gulpfile.js
  index.html
  package.json
```

## Como criar nossa primeira tarefa

Agora vamos começar a configuração de nossa primeira tarefa dentro do arquivo `gulpfile.js`. O primeiro passo é dar `require` no *Gulp* conforme segue:

```javascript
var gulp = require('gulp');
```

A declaração `require` diz para o Node procurar dentro da pasta `node_modules` por um pacote chamado `gulp` e atribuir o conteúdo dele para a variável `gulp`.

Depois disso podemos iniciar inserindo nossa primeira tarefa conforme segue nas linhas 3-6:

```jsx{3-6}
var gulp = require('gulp');

// Default task - Run with command 'gulp'
gulp.task('default', function() {
  console.log('Gulp funcionando...');
});

```

Com o trecho acima estamos criando a tarefa padrão do *Gulp*, para rodarmos ela basta no nosso *command line* darmos o seguinte comando:

```bash
$ gulp
```

Teremos o seguinte resultado:

<img src="https://devheroes.io/wp-content/uploads/2017/01/comando-gulp.png" alt="Log ao dar comando gulp" />

Temos, destacado pelo retângulo vermelho, o log que definimos em nossa tarefa `default`. É claro que essa tarefa não serve para nada, mas confirma que o *Gulp* está funcionando. Mais para frente vamos substituir essa tarefa por outra.

## Usando Gulp para compilar Sass

O *Gulp* sozinho não realiza muita coisa, precisamos instalar plugins para as funcionalidades que desejamos. Para *Sass* vamos instalar o seguinte plugin `gulp-sass` usando o comando que segue:

```bash
$ npm install --save-dev gulp-sass
```

Em nosso arquivo `gulpfile.js` precisamos fazer o `require` deste pacote e a atribuição para a variável conforme segue na linha 2:

```jsx
var gulp = require('gulp');
var sass = require('gulp-sass');

```

Em seguida, vamos criar variáveis para apontar onde está nosso arquivo do *Sass*, a pasta de destino do arquivo CSS final após ser compilado e as [opções de compilação](https://github.com/sass/node-sass#options):

```jsx
/*
 * Variables
 */
// Sass Source
var scssFiles = './src/scss/style.scss';

// CSS destination
var cssDest = './css';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

```

### Compilar Sass para desenvolvimento

Vamos criar uma nova tarefa que vai compilar o *Sass* em um formato para desenvolvimento, não vai ser minificado para podermos verificar em busca de erros.

Vamos dar o nome dessa tarefa de `sassdev` conforme segue:

```jsx
// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  // Código de nossa tarefa vai aqui
});

```

Abaixo temos o conteúdo de nossa tarefa básica para compilarmos o *Sass* para desenvolvimento:

```jsx
// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions))
    .pipe(gulp.dest(cssDest));
});

```

A primeira coisa que fizemos foi informar onde estão os arquivos por meio do `gulp.src(scssFiles)` na linha 5, veja que nele passamos como parâmetro a variável `scssFiles` que criamos antes e contém o caminho para os arquivos.

No *Gulp* usamos o `.pipe()` para encadearmos uma série de atividades em nossa tarefa, por isso em seguida usamos `.pipe(sass(sassDevOptions))` para chamarmos a tarefa `sass()` e passamos como parâmetro para ela a variável `sassDevOptions` com as opções de compilação que definimos anteriormente.

Por último encadeamos mais um comando usando `.pipe(gulp.dest(cssDest))` para chamarmos o comando `gulp.dest()` e passamos como parâmetro a variável `cssDest` com o caminho para o arquivo final CSS compilado.

Podemos fazer mais um ajuste antes de continuarmos, do jeito que está agora se houver algum erro em nosso *Sass* a tarefa não é concluída e não nos informa o que houve. Para termos uma mensagem de erro vamos adicionar após `sass(sassDevOptions)` o comando `.on('error', sass.logError)`, ficando:

```jsx
.pipe(sass(sassDevOptions).on('error', sass.logError))
```

Nossa tarefa final vai ficar:

```jsx
// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

```

### Compilar Sass para produção

Agora vamos criar uma tarefa que vai compilar o *Sass* em um formato para produção, ele vai ser minificado. Vamos dar o nome dessa tarefa de `sassprod` conforme segue:

```jsx
// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssMinDest));
});

```

Podemos ver acima que a tarefa é a mesma que a de desenvolvimento. Modificamos o nome da tarefa na linha 3 para `sassprod`. Na linha 5 mudamos a variável com as opções do *Sass* para `sassProdOptions`. E por último na linha 6 mudamos a variável que contém o arquivo de destino para `cssMinDest`.

Mas existe um problema, essa tarefa vai criar um arquivo com o mesmo nome do arquivo gerado pela `sassdev`. Para contornarmos isso vamos instalar um plugin do *Gulp* chamado `gulp-rename` através do comando que segue:

```bash
$ npm install --save-dev gulp-rename
```

Depois precisamos adicionar ele como `require` em nosso arquivo `gulpfile.js` conforme segue na linha 3:

```jsx
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

```

Em nossa tarefa `sassprod` vamos encadear mais um evento para antes de salvar o arquivo final renomear ele conforme vemos na linha 5:

```jsx
// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});

```

Dessa maneira nosso arquivo para a produção passa a ter um nome diferente do arquivo gerado para desenvolvimento. É muito comum a versão minificada receber no nome do arquivo o complemento `.min` conforme usamos aqui.

## Criar a tarefa 'watch'

Da forma que temos agora, precisamos toda vez que houver uma mudança em nosso *Sass* rodar o comando do *Gulp* para compilar.

Normalmente estamos acostumados em fazer mudanças em nosso CSS e testar imediatamente elas no navegador. Se queremos ter algo próximo disso no *Sass* podemos usar o `watch`. O que ele faz é observar nossos arquivos *Sass*, assim que ele nota uma alteração é disparado a tarefa de compilação que desejamos.

Para isso vamos criar uma nova tarefa chamada `watch` conforme segue:

```jsx
// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassdev', 'sassprod']);
});
```

Nela usamos um recurso do próprio *Gulp* chamado `gulp.watch`.

Precisamos passar dois parâmetros:

- No primeiro informamos os arquivos que queremos que o *Gulp* observe por mudanças, no caso usamos a variável que aponta isso `scssFiles`.
- No segundo parâmetro passamos um *array* com as tarefas que queremos disparar caso os arquivos sejam modificados, no nosso caso vamos rodar as duas tarefas de *Sass* `sassdev` e `sassprod`.

Caso queira ganhar tempo, especialmente se seu projeto estiver demorando muito para compilar, pode optar por disparar apenas uma das tarefas.

## Criar a tarefa 'default'

Agora que definimos todas as tarefas de nosso projeto podemos ajustar nossa tarefa default, ela roda ao darmos apenas o comando `gulp`.

No começo desse artigo criamos a tarefa `default` para vermos se o *Gulp* estava funcionando, podemos apagar ela e substituir pela que segue:

```jsx
// Default task - Run with command 'gulp'
gulp.task('default', ['sassdev', 'sassprod', 'watch']);

```

Agora ao darmos o comando `gulp` primeiro vai rodar a tarefa `sassdev`, em seguida a tarefa `sassprod` e por último vai rodar a `watch`, que vai passar a monitorar os arquivos *Sass* em nosso projeto, sempre que houver uma mudança vai compilar novamente eles.

## Arquivo `gulpfile.js` final

Nosso arquivo final do *Gulp* vai ficar como segue:

```jsx
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

/*
 * Variables
 */
// Sass Source
var scssFiles = './src/scss/style.scss';

// CSS destination
var cssDest = './css';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

/*
 * Tasks
 */
// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});

// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassdev', 'sassprod']);
});

// Default task - Run with command 'gulp'
gulp.task('default', ['sassdev', 'sassprod', 'watch']);

```

## Testes

Vamos agora escrever um código em *Sass* e ver se está funcionando corretamente. Abra o arquivo `src/scss/style.scss` e vamos escrever nele o código que segue:

```scss
.card {
  background-color: red;

  &__title {
    color: white;
  }
}

```

Em nosso *command line* vamos rodar o comando abaixo:

```bash
$ gulp
```

Vamos na pasta `/css` e verificar se os arquivos `style.css` e `style.min.css` foram criados. No arquivo não minificado devemos ter o seguinte código CSS compilado:

```css
.card {
  background-color: red;
}

.card__title {
  color: white;
}

```

Ao dar o comando `gulp` além de ter compilado ele passou a observar nosso arquivo `src/scss/style.scss`, se fizermos qualquer mudança nele e salvarmos, as tarefas `sassdev` e `sassprod` são disparadas novamente.

Podemos testar isso agora, vamos adicionar o código abaixo das linhas 8-11 e salvar nosso arquivo:

```scss
.card {
  background-color: red;

  &__title {
    color: white;
  }

  &__img {
    border: 1px solid #eee;
    border-radius: 5px;
  }
}

```

No *command line* podemos ver que as tarefas foram executadas novamente e nossos arquivos `style.css` e `style.min.css` foram atualizados com a adição das linhas 9-12 conforme segue:

```css
.card {
  background-color: red;
}

.card__title {
  color: white;
}

.card__img {
  border: 1px solid #eee;
  border-radius: 5px;
}

```

Caso queira finalizar a tarefa `watch` basta dar o comando `Ctrl + C` que ela será interrompida.

## Conclusão

Neste post vimos como instalar a usar o *Gulp* para automatizar tarefas como a compilação do *Sass*. Como podem ter notado fizemos uma estrutura bem básica, para entendermos o funcionamento do *Gulp* neste primeiro momento.

Em um próximo artigo vamos ver como usar o `autoprefixer` para adicionar os prefixos dos navegadores onde necessário em nosso CSS.

Também trabalharmos com um único arquivo *Sass* como fizemos aqui não é o recomendável. Futuramente vamos ver como organizar o *Sass* para termos um projeto mais escalável e de fácil manutenção usando as metodologias *BEM* e *ITCSS* junto com o *Sass*.
