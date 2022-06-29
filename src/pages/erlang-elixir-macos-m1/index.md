---
title: 'Como instalar Erlang e Elixir no macOS com chip M1 da Apple'
date: '2022-06-29'
author: mdapper
spoiler: Neste artigo vamos ver como instalar o Erlang 24.2 e Elixir 1.13.1 OTP 24 no macOS Monterey 13.2.1 com chip M1 da Apple usando o asdf.
---

Neste artigo vamos ver como instalar o Erlang 24.2 e Elixir 1.13.1 OTP 24 no macOS Monterey 13.2.1 com chip M1 da Apple usando o [asdf](https://asdf-vm.com/).

Inicialmente estava rodando o Erlang e Elixir dentro do Docker, mas estava encontrando algumas limitações, entre elas a performance que não estava boa.

Por causa disso resolvi me aventurar e tentar instalar o Erlang e Elixir nativamente no macOS com chip M1 da Apple. Após algumas tentativas frustradas, e pesquisando várias soluções na internet, deu certo a instalação.

Essas instruções são uma combinação do que fui pegando de vários lugares, foi o que deu certo pra mim e outros em nosso projeto atual, pode ser que vocês não consigam os mesmos resultados.

O que segue é um guia do que funcionou no meu caso.

## Dependências

Vamos começar instalando algumas dependências através do brew que vão ser necessárias para alguns dos comandos a seguir:

```bash
brew install autoconf fop coreutils automake libyaml readline libxslt libtool unixodbc unzip curl
```

## asdf

Para poder instalar diferentes versões do Erlang e Elixir vamos usar o asdf.

- Primeiro precisamos instalar o asdf pelo método Git:

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.0
```

- Adicionar o seguinte no arquivo `~/.zshrc`:

```bash
. $HOME/.asdf/asdf.sh
```

Veja na [documentação oficial](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) para um guia atualizado de como instalar o asdf.

- Depois precisamos instalar o plugin asdf do [Erlang](https://github.com/asdf-vm/asdf-erlang):

```bash
asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git
```

- Agora instalamos o plugin asdf do [Elixir](https://github.com/asdf-vm/asdf-elixir):

```bash
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
```

## wxWidgets

Esse passo não deveria ser necessário, ao instalar o Erlang usamos uma opção `--without-wx` mais para frente, só que esta parece não ser respeitada e a instalação falha por não termos o _wxWidgets_.

Teoricamente bastaria instalar o _wxWidgets_ e tentar de novo instalar o Erlang. Mas parece que o _wxWidgets_ em sua versão mais recente, atualmente a v3.1.6, gera um erro na instalação do Erlang.

Na versão anterior, a v3.1.5, funciona instalar o Erlang, por isso vamos então instalar o _wxWidgets_ manualmente na v3.1.5 em nosso sistema.

- Clonar e configurar o repo:

```bash
git clone git@github.com:wxWidgets/wxWidgets.git
cd wxWidgets
git checkout tags/v3.1.5
git submodule update --init src/png
git submodule update --init src/jpeg
git submodule update --init src/zlib
git submodule update --init src/tiff
git submodule update --init src/expat
git submodule update --init 3rdparty/catch

# Tente o próximo comando, ele não funcionou pra mim mas segui sem ele com sucesso
git submodule update --init 3rdparty/pcre
```

- Configurações pré build:

```bash
./configure --with-cocoa --prefix=/usr/local --enable-webview --enable-compat28 --with-macosx-version-min=12.3 --with-libjpeg=builtin --with-libpng=builtin --with-regex=builtin --with-libtiff=builtin --with-zlib=builtin --with-expat=builtin
```

- Build e instalação:

```bash
make
sudo make install
```

## openssl

Para instalação do Erlang e Elixir precisamos também do openssl na v1, é possível que no seu macOS já tenha ele instalado em uma versão mais recente. Mas a v2 ou v3 não funciona na hora de instalar o Erlang.

- Instale a v1 usando o brew:

```bash
brew install openssl@1.1
```

- Como meu sistema estava usando a v2 do openssl, então dei o seguinte comando:

```bash
brew unlink openssl@2
```

- Se estiver usando a v3 use:

```bash
brew unlink openssl@3
```

- Configure para usar a v1 usando o comando:

```bash
brew link openssl@1.1
```

Neste momento recebi uma mensagem dizendo que não foi possível fazer o link, que deveria usar o comando com force ou então definir a versão usando uma variável de ambiente em meu arquivo `~/.zshrc`.

Optei em adicionar a seguinte variável em meu `~/.zshrc`:

```bash
export PATH="/opt/homebrew/opt/openssl@1.1/bin:$PATH"
```

Quando der o comando de link veja qual a sugestão de variável ele informa, se é realmente a mesma acima.

- Além da var anterior defini no `~/.zshrc` as seguintes variáveis:

```bash
export CC=clang
export CPP="clang -E"
export EGREP=egrep
export KERL_BUILD_DOCS=yes
export KERL_INSTALL_MANPAGES=yes
export KERL_USE_AUTOCONF=0
export wxUSE_MACOSX_VERSION_MIN=12.3

export KERL_CONFIGURE_OPTIONS="--disable-debug --disable-silent-rules --enable-dynamic-ssl-lib --enable-gettimeofday-as-os-system-time --enable-kernel-poll --without-javac --without-wx --without-odbc"
```

## Instalar Erlang e Elixir

Agora com tudo configurado podemos seguir com a instalação do Erlang e Elixir.

- Instalar o Erlang com o comando:

```bash
asdf install erlang 24.2
```

- Instalar o Elixir com o comando:

```bash
asdf install elixir 1.13.1-otp-24
```

Como eu estava usando o Docker para rodar um projeto Elixir, neste ponto apaguei as pastas `deps` e `_build` e segui com o processo normal de configurar o projeto.
