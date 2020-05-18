import React from 'react';
import Layout from '../layouts/Layout';

type Props = {
  location: {
    pathname: string;
  };
};

export default function NotFoundPage({ location }: Props) {
  return (
    <Layout location={location}>
      <main>
        <h1>Não encontrado</h1>
        <p>Essa não é a página que você está procurando.</p>
      </main>
    </Layout>
  );
}
