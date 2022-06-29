---
title: 'How to install Erlang and Elixir on macOS with Apple M1 Chip'
date: '2022-06-29'
author: mdapper
spoiler: In this article we will see how to install Erlang 24.2 and Elixir 1.13.1 OTP 24 on macOS Monterey 13.2.1 with Apple M1 Chip using asdf.
---

In this article we will see how to install Erlang 24.2 and Elixir 1.13.1 OTP 24 on macOS Monterey 13.2.1 with Apple M1 Chip using [asdf](https://asdf-vm.com/).

Initially I was running Erlang and Elixir inside Docker, but I was encountering some limitations, among them the performance that was not good.

Because of that, I decided to install Erlang and Elixir natively on macOS with Apple M1 Chip. After a few failed attempts, and researching various solutions on the internet, the installation was successful.

These instructions are a combination of what I've been getting from several places, it's what worked for me and others in our current project, you may not get the same results.

What follows is a guide off what worked for us.

## Dependencies

Let's start by installing some dependencies through brew that will be needed for some of the following commands in this article:

```bash
brew install autoconf fop coreutils automake libyaml readline libxslt libtool unixodbc unzip curl
```

## asdf

In order to install different versions of Erlang and Elixir we will use asdf.

- First we need to install asdf using the Git method:

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.0
```

- Add the following to `~/.zshrc`:

```bash
. $HOME/.asdf/asdf.sh
```

See on the [official docs](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) for an updated guide on how to install asdf.

- Then we need to install the [Erlang asdf plugin](https://github.com/asdf-vm/asdf-erlang):

```bash
asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git
```

- Then we need to install the [Elixir asdf plugin](https://github.com/asdf-vm/asdf-elixir):

```bash
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
```

## wxWidgets

This step shouldn't be necessary, when installing Erlang we use a `--without-wx` option later on, but it doesn't seem to be respected and the installation fails because we don't have _wxWidgets_.

Theoretically it would be enough to install _wxWidgets_ and try again to install Erlang. But it seems that _wxWidgets_ in its latest version, currently v3.1.6, throws an error when installing Erlang.

In the previous version, v3.1.5, it works to install Erlang, so let's install _wxWidgets_ manually in v3.1.5 on our system.

- Clone and config the repo:

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

# Try the next command, it didn't work for me but I followed without it successfully
git submodule update --init 3rdparty/pcre
```

- Pre-build configs:

```bash
./configure --with-cocoa --prefix=/usr/local --enable-webview --enable-compat28 --with-macosx-version-min=12.3 --with-libjpeg=builtin --with-libpng=builtin --with-regex=builtin --with-libtiff=builtin --with-zlib=builtin --with-expat=builtin
```

- Build and installation:

```bash
make
sudo make install
```

## openssl

To install Erlang and Elixir we also need openssl in v1, it is possible that on your macOS you already have it installed in a newer version. But in v2 or v3 it doesn't work to install Erlang.

- Install the v1 using brew:

```bash
brew install openssl@1.1
```

- As my system was using openssl v2, so I gave the following command to not use it:

```bash
brew unlink openssl@2
```

- If in your system is using v3 try to use the command:

```bash
brew unlink openssl@3
```

- Now configure to use v1 using the command:

```bash
brew link openssl@1.1
```

At this point I received a message saying that the link could not be made, that I should use the command with force or else set the version using an environment variable in my `~/.zshrc` file.

I chose to add the following variable to my `~/.zshrc`:

```bash
export PATH="/opt/homebrew/opt/openssl@1.1/bin:$PATH"
```

When you give the link command see what the suggestion was, if it is really the same as above.

- In addition to the previous var I defined in `~/.zshrc` the following variables:

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

## Installing Erlang and Elixir

Now with everything configured we can proceed with the installation of Erlang and Elixir.

- Install Erlang with the command:

```bash
asdf install erlang 24.2
```

- Install Elixir with the command:

```bash
asdf install elixir 1.13.1-otp-24
```

As I was using Docker to run an Elixir project, at this point I deleted the `deps` and `_build` folders and went through the normal process of configuring the project.
