type Authors = {
  [key: string]: {
    name: string;
    url: string;
    bio: string;
  };
};

export const authors: Authors = {
  mdapper: {
    name: 'Marcelo Dapper',
    url: 'https://twitter.com/mdapper',
    bio:
      'Desenvolvedor front-end, atualmente focado em construir plicações com JavaScript e React',
  },
  fxcosta: {
    name: 'Felix Costa',
    url: 'https://twitter.com/fxcosta',
    bio:
      'Desenvolvedor full-stack, apaixonado por web e programação, eterno aprendiz e entusiasta das boas práticas, orientação a objetos, arquitetura de software, open source, PHP e JavaScript.',
  },
};
