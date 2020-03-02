---
title: 'Futuro do React e os métodos de lifecycle'
date: '2018-04-02'
author: mdapper
spoiler: Por mais de um ano o time do React tem trabalhado para implementar renderização assíncrona (async rendering). No mês de fevereiro, durante uma palestra na JSConf Islândia, Dan Abramov mostrou o futuro do React e algumas das possibilidades que async rendering vai trazer.
cta: react
---

Por mais de um ano o time do React tem trabalhado para implementar renderização assíncrona (*async rendering*). No mês de fevereiro, durante uma [palestra na JSConf Islândia](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html), Dan Abramov mostrou o futuro do React e algumas das possibilidades que *async rendering* vai trazer.

Este post vai lhe ajudar a preparar seus componentes para poder usar o *async rendering* quando este for lançado.

Uma das principais lições que o time do React aprendeu enquanto desenvolvia o *async rendering* foi que alguns dos *lifecycles* tendem a encorajar práticas de código não seguras. São os seguintes:

* `componentWillMount`
* `componentWillReceiveProps`
* `componentWillUpdate`

Estes métodos de *lifecycle* foram muitas vezes mal entendidos e algumas vezes mal utilizados. Seu uso errado pode causar ainda mais problemas com o *async rendering*. Por causa disso será adicionado o prefixo "UNSAFE_" nos *lifecycles* acima em uma futura versão do React. Vale uma observação, "unsafe" aqui não se refere a segurança, mas ao invés disso, transmite a ideia de que o código usando estes *lifecycles* terão uma chance maior de ter *bugs* em futuras versões do React, especialmente quando o *async rendering* for habilitado.

## Migração Gradual

Estas mudanças vão ser graduais. O plano é fazer o seguinte:

* Na versão 16.3: Introduz pseudônimos para os *lifecycles* que não são seguros: `UNSAFE_componentWillMount`, `UNSAFE_componentWillReceiveProps` e `UNSAFE_componentWillUpdate`. Tanto os nomes antigos dos *lifecycles*, como os novos pseudônimos vão funcionar nesta versão.

* Uma futura versão 16.x: Vai habilitar avisos de depreciado para `componentWillMount`, `componentWillReceiveProps` e `componentWillUpdate`. Tanto os nomes antigos dos *lifecycles*, como os novos pseudônimos vão funcionar nesta versão, mas os nomes antigos vão gerar um *log* de aviso quando em modo de desenvolvimento.

* Na versão 17.0: Vai remover `componentWillMount`, `componentWillReceiveProps` e `componentWillUpdate`. Apenas os nomes de *lifecycles* com "UNSAFE_" vão funcionar deste ponto em diante.

**Se você é um desenvolvedor de uma aplicação em React, você não precisa fazer nada com respeito aos métodos de lifecycle ainda. O objetivo primário da versão 16.3 é habilitar os mantenedores de projetos open source para atualizarem suas bibliotecas antes de qualquer aviso de depreciado. Estes avisos não serão habilitados até uma futura versão 16.x do React**

O Facebook mantém mais de 50.000 componentes React, eles portanto não pretendem reescrever eles todos de imediato. Também irão fazer a migração aos poucos junto com a comunidade do React.

## Migrando os métodos legados de lifecycles

A seguir vamos ver alguns exemplos que usam as novas APIs de componentes React introduzidos na versão 16.3.

Além dos seguintes pseudônimos (só lembrando que os nomes sem "UNSAFE_" ainda vão funcionar):

* `UNSAFE_componentWillMount`
* `UNSAFE_componentWillReceiveProps`
* `UNSAFE_componentWillUpdate`

Também estão sendo introduzidos dois novos métodos de *lifecycles*:

* o static `getDerivedStateFromProps`
* `getSnapshotBeforeUpdate`.

### Novo lifecycle: getDerivedStateFromProps

```jsx
class Example extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // ...
  }
}
```

O novo método de *lifecycle* estático `getDerivedStateFromProps` é invocado após um componente ser instanciado, bem como quando ele recebe novos *props*. Ele pode retornar um objeto para atualizar o *state*, ou *null* para indicar que as novas *props* não requerem update do *state*.

Juntamente com `componentDidUpdate`, este novo lifecycle deve cobrir todos os casos de uso para o método legado `componentWillReceiveProps`.

### Novo lifecycle: getSnapshotBeforeUpdate

```jsx
class Example extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
```

O novo *lifecycle* `getSnapshotBeforeUpdate` é chamado logo antes das mutações serem feitas (por exemplo, antes do DOM ser atualizado). O valor retornado por este *lifecycle* será passado como o terceiro parâmetro para `componentDidUpdate`. Não é preciso usar este *lifecycle* frequentemente, mas pode ser útil em casos como manualmente preservar a posição do scroll durante *rerenders*.

Juntamente com `componentDidUpdate`, este novo *lifecycle* deve cobrir todos os casos de uso para o método legado `componentWillUpdate`.

Se você usa Flow e quiser um exemplo dos tipos para estes métodos, pode encontrar neste [gist](https://gist.github.com/gaearon/88634d27abbc4feeb40a698f760f3264).

Se quiser ver alguns exemplos de como ambos estes *lifecycles* podem ser usados veja [este post](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples) do blog oficial do React, ele serviu de referência para este artigo sobre o futuro do React.
