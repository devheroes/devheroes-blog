---
title: 'React v16.3.0: Novos métodos de lifecycle e context API'
date: '2018-06-07'
author: mdapper
spoiler: No post anterior vimos sobre as futuras mudanças em alguns métodos de lifecycle. Na versão 16.3.0 estão sendo adicionados alguns métodos de lifecycle para ajudar com a migração. Também estão sendo introduzidas novas APIs para alguns recursos muito solicitados, uma API oficial para context, uma API para encaminhar refs, e uma API ref mais amigável.
image: react-v16-3-0-lifecycle-context-api-768x403.jpg
cta: react
---

No [post anterior](https://devheroes.io/futuro-do-react-metodos-lifecycle/) vimos sobre as futuras mudanças em alguns métodos de *lifecycle*. Na versão 16.3.0 estão sendo adicionados alguns métodos de *lifecycle* para ajudar com a migração. Também estão sendo introduzidas novas APIs para alguns recursos muito solicitados: uma API oficial para *context*, uma API para encaminhar *refs*, e uma API *ref* mais amigável.

<!--more-->

> **Nota:**
>
> Este post é uma tradução do blog oficial do React, você pode ver o artigo original [aqui](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)

## Nova Context API

Por muitos anos, React ofereceu uma API experimental para *context*. Embora fosse uma ferramenta poderosa, seu uso era desencorajado por causa de problemas inerentes na API, e porque o objetivo sempre foi que ela fosse substituída por uma API melhor.

A versão 16.3 introduz uma nova API de *context* que é mais eficiente e suporta tanto verificação de tipos estática, como atualizações profundas.

> **Nota:**
>
> A antiga API de *context* vai continuar funcionando durante as versões 16.x, assim você terá tempo para migrar.

A seguir um exemplo ilustrando como você pode injetar um "theme" usando a nova API de *context*:

```jsx{1,8-10,18-20}
const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  state = {theme: 'light'};

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}
```

[Aprenda mais sobre a nova API de context aqui.](https://reactjs.org/docs/context.html)

## createRef API

Anteriormente, React fornecia duas maneiras de administrar *refs*: a API legada *string ref* e a API de *callback*. Embora a API *string ref* fosse a mais conveniente das duas, ela tinha [várias desvantagens](https://github.com/facebook/react/issues/1373), por isso era recomendado usar a opção com *callback*.

A versão 16.3 adiciona uma nova opção para administrar *refs*, que oferece a conveniência de uma *string ref*, mas sem nenhuma das desvantagens:

```jsx{5,9,13}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

> **Nota:**
>
> As refs de callback continuam a serem suportados, em adição a nova API `createRef`.
>
> Você não precisa substituir *refs* de *callback* em seus componentes. Elas são um pouco mais flexíveis, por isso vão permanecer como um recurso avançado.

[Aprenda mais sobre a nova API de createRef aqui.](https://reactjs.org/docs/refs-and-the-dom.html)

## forwardRef API

Geralmente, componentes React são declarativos, mas as vezes acesso imperativo as instâncias do componente e seus nodes DOM são necessárias. Isso é comum para casos de uso como administrar foco, seleção ou animações. React fornece *refs* como uma forma de resolver este problema. No entanto, encapsulamento de componentes gera alguns desafios com *refs*.

Por exemplo, se você substitui um `<button>` por um componente customizado `<FancyButton>`, o atributo `ref` nele irá começar a apontar para o componente que o envolve em vez do node DOM (e seria `null` para componentes funcionais). Embora isso seja desejável para componentes do "nível de aplicação" como `FeedStory` ou `Comment` que precisam ser encapsulados, pode ser irritante para componentes como `FancyButton` ou `MyTextInput` que são tipicamente usados como seus equivalentes DOM, e que precisam expor seus nodes DOM.

Encaminhamento de *ref* é uma nova funcionalidade opcional que permite alguns componentes pegar um `ref` que recebem, e passá-los ainda mais para baixo (em outras palavras, "adiante") para um filho. No exemplo abaixo, `FancyButton` passa sua *ref* adiante para um `button` do DOM que este renderiza:

```jsx{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

Dessa forma, componentes usando `FancyButton` podem pegar o *ref* do node `button` do DOM e acessar, se for necessário, como que diretamente o `button` do DOM.

Passar adiante *ref* não é limitado a componentes que renderizam nodes DOM. Se você escrever [componentes higher order](https://reactjs.org/docs/higher-order-components.html), é recomendado passar adiante a *ref* para as instâncias do componente de classe empacotados.

[Aprenda mais sobre a API forwardRef aqui.](https://reactjs.org/docs/forwarding-refs.html)

## Mudanças nos Lifecycle de Componentes

A API de *class* do React está disponível por bastante tempo já e com poucas alterações. Entretanto, conforme vai sendo adicionado suporte para recursos mais avançados (como [error boundaries](https://reactjs.org/docs/react-component.html#componentdidcatch) e o futuro [modo async rendering](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) este modelo foi estendido de maneiras que não eram originalmente pretendidas.

Por exemplo, com a API atual, é muito fácil bloquear o *render* inicial com lógica não essencial. Isso em parte acontece por existirem diversas maneiras de resolver uma tarefa, e pode não ser claro qual é a melhor. O comportamento de interromper, ao lidar com erros, com frequência não é levado em conta e pode resultar em *memory leaks* (algo que vai também impactar o futuro modo *async rendering*). A API de *class* atual também complica outros esforços, como criar um [protótipo de um compilador React](https://twitter.com/trueadm/status/944908776896978946).

Muitos desses problemas são gerados por uma parte dos métodos de *lifecycle* (`componentWillMount`, `componentWillReceiveProps`, e `componentWillUpdate`). Estes também acabam sendo os *lifecycles* que mais causam confusão entre comunidade React. Por estas razões, estes métodos serão depreciados em favor de alternativas melhores.

Esta mudança vai causar impacto em muitos componentes existentes. Por causa disso, a migração será o mais gradual possível, e vão ser providas alternativas. (No Facebook, são mantidos mais de 50.000 componentes React. Eles também dependem de um *release* gradual)

> **Nota:**
>
> Avisos de depreciação serão habilitados em uma futura versão 16.x, **mas os lifecycles legados vão continuar funcionando até a versão 17**.
>
> Mesmo na versão 17, ainda será possível usar eles, mas terão um prefix "UNSAFE_" para indicar que eles podem causar problemas. Também foi preparado um [script que automatiza renomear eles](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) em código existente.

Além de depreciar *lifecycles* que não são seguros, estão sendo adicionados dois novos *lifecycles*:

* [`getDerivedStateFromProps`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) está sendo adicionado como uma alternativa mais segura ao método legado `componentWillReceiveProps`.
* [`getSnapshotBeforeUpdate`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) está sendo adicionado para suportar ler propriedades de forma segura do DOM antes que sejam feitos updates.

[Aprenda mais sobre estas mudanças de lifecycle aqui.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

## StrictMode Component

`StrictMode` é uma ferramenta para destacar possíveis problemas em uma aplicação. Assim como `Fragment`, `StrictMode` não renderiza nenhuma UI visível. Ele adiciona verificações adicionais e avisos para os seus descendentes.

> **Nota:**
>
> As verificações `StrictMode` rodam apenas em modo de desenvolvimento; *não impactam o build de produção*.

Embora não seja possível que o *strict mode* pegue todos os problemas (por exemplo, algumas mutações de tipos), ele pode ajudar em muitos. Se você ver avisos em *strict mode*, estes provavelmente vão causar bugs para o *async rendering*.

Na versão 16.3, `StrictMode` ajuda com:

* Identificar componentes com métodos *lifecycle* que não são seguros
* Avisar sobre usos da API *string ref* legada
* Detectar efeitos colaterais inesperados

Funcionalidades adicionais serão adicionadas em futuras versões do React.

[Aprenda mais sobre o componente `StrictMode` aqui.](https://reactjs.org/docs/strict-mode.html)
