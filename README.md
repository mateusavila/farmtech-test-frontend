# Teste da vaga de Desenvolvedor frontend na FarmTech

[Link do projeto na vercel](https://farmtech-test-frontend.vercel.app/).

## Setup inicial

Instale todas as dependências utilizando o seu gerenciador de pacotes favorito. Recomendo, para este projeto, usar bun (que é muito rápido e ótimo na gestão de cache).

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Rodando o ambiente de desenvolvimento

Inicie o ambiente de desenvolvimento `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Produção

Montando os pacotes para produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Para visualizar o projeto montado (buildado):

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Composition API

Este projeto roda utilizando-se de composition API. A escolha se dá pela facilidade de incluir módulos em diversas partes do projeto e pela facilidade de se testar funções. Eu recomendo este "approach" para facilitar o trabalho em projetos grandes.

## Por que escolhi o nuxt?

O nuxt vem um com rol de ferramentas que enriquecem a experiência do desenvolvedor. As principais que utilizei neste projeto foram:

- utilização de pages para criação automatizada das rotas
- Auto-import dos componentes
- Auto-import dos tipos do projeto (listados na pasta utils)
- Pasta de layouts para arquitetar modelos para arquivos. Neste projeto nem precisaria ter esta pasta, mas no futuro ter esta pasta para instrumentalizar uma arquitetura de fácil manutenção.

## Pacotes utilizados no projeto

Este projeto é feito com nuxt, na sua versão mais nova 3.13, e alguns pacotes que julgo interessante neste projeto para enriquecer ele:

- vue3-apexcharts: componente que gera gráficos ricos com altíssima personalização dos dados.
- @nuxtjs/tailwindcss: configura o tailwind para rodar em componentes vue dentro do nuxt.
- @nuxtjs/google-fonts: configura as fontes do google, gerando snippets que otimizam o carregamento das fontes, para evitar carregamento de fontes nativas antes da fonte oficial.
- vitest: ferramenta de testes que funciona dentro do vite.
- @vue/test-utils: ferramenta que facilita os testes de componentes vue dentro de tools de teste.
- @vitest/coverage-v8: ferramenta de cobertura de testes

## Features do projeto

Este projeto foi pensado numa visualização fácil dos dados de covid no mundo. Para tanto, optamos em listar os dados da rota de /api/reports?per_page=20 em uma paginação de resultados.

Outra feature relevante para o projeto é a filtragem utilizando datalist, do HTML 5, que enriquece a experiência do usuário em ajudar ele a escolher o país. Infelizmente, a base de dados da covid utiliza países em inglês, e a base tem tido uma demora na resposta. Logo, para contornar esta lentidão, optei por cachear a rota de países por 1 ano, para ter um desempenho muito rápido.

Outra rota que teve enorme velocidade foi a rota de top_five, que aglutina os dados dos 5 países com os piores índices do mundo: Alemanha, França, Brasil, Índia e Estados Unidos. Aglutinando estes 5 países em uma rota cacheada por 1 ano, gerei um gráfico de barra para facilitar a leitura dos dados. Esta inclusão ajuda usuários a lidarem dinamicamente.

## Notas do Lighthouse
Neste projeto tem notas altas no lighthouse, porém não bate 100 em tudo por algumas razões particulares:

- O componente apexchart não tem tree shaking, mandando um pedaço grande de requisição para o site. Eu poderia fazer este gráfico em css puro, porém fazia sentido ofertar para o analisador uma implementação real
- A imagem da logo possui 2kb. Eu até cheguei a exportar uma variante em webp, que geraria uma imagem de 1.5kb. Mas acho que este site não teria milhões de visitas para justificar isto.

## Cobertura de testes

O vitest é um aliado incrível para projetos feitos em vite. A implementação com nuxt é facilitada com suporte maravilhoso local, diferente da implementação do jest (que exige algumas bruxarias para funcionar).

A cobertura alcançada foi de 
- 87.61% Statements 198/226
- 93.61% Branches 44/47
- 91.3% Functions 21/23
- 87.61% Lines 198/226

Até gerei o teste de validação das rotas de backend (que baixam a média global de cobertura dos testes), porém o código de teste que eu criei apenas valida se a requisição está contendo os dados corretos.

O vitest mapeou também os arquivos do nuxt.config.ts e do tailwind.config.ts, porém estes arquivos não são configurados por mim, e sim pelos mantenedores. Logo não faz sentido ter cobertura de testes para estes arquivos.

O esforço maior foi ter uma cobertura altíssima de testes nos componentes, composables e layouts.
