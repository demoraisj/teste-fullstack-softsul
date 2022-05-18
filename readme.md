# Teste de execução de código para a empresa [SoftSul Sistemas](http://www.softsulsistemas.com.br/)

## Instruções para rodar o projeto (para desenvolvimento)

É necessário as versões LTS do Docker e Docker-Compose.

- Execute ```cp .env.example .env && (cd backend && cp .env.example .env) && (cd mobile && cp .env.example .env)```
- Verifique as variáveis e ajuste ao seu ambiente se necessário. (Uma chave para a API Google Maps é necessária para mostrar os mapas no frontend web)
- Execute ```docker-compose up --detach``` e de um tempo até que todos os scripts nos containers tenham sido executados.

### Para a aplicação mobile

 - Instale o expo-cli e localtunnel globalmente ```yarn global add expo-cli localtunnel```
 - Execute ```(cd mobile && cp .env.example .env)```
 - Execute ```sudo lt --port 8000 --local-host "127.0.0.1"``` (Ou qualquer outra porta que você tenha exposto o backend/laravel)
 - Use o endereço obtido na env BACKEND_URL, em ./mobile/.env
 - Execute ```yarn install``` em ./mobile
 - Execute ```yarn start``` em ./mobile e connecte-se ao seu aplicativo expo go no seu dispositivo mobile.

<br />

Se houver conflito de portas, existem configurações no arquivo .env na raíz dessse proeto que podem ser alteradas, rode um down e novamente um up no docker-compose em seguida.

## Bibliotecas utilizadas

O frontend roda em React, o backend em laravel, e o mobile em React Native, <br />
Não existem bibliotecas extras no laravel, apenas 'first party' (Como o laravel sanctum e fortify). <br />

No frontend, foram usadas as bibliotecas (além do react):
 - [react-router-dom](https://reactrouter.com/web/guides/quick-start) - para rotas
 - [tailwindcss](https://tailwindcss.com/) - para estilização
 - [headlessui](https://headlessui.dev/) - para criação de componentes
 - [heroicons](https://heroicons.com/) - para icones
 - [axios](https://axios-http.com/ptbr/) - para requisições http
 - [date-fns](https://date-fns.org/) - para manipulação de datas
 - [react-transition-group](https://reactcommunity.org/react-transition-group/docs) - para animações de transição
 - [svelte](https://svelte.dev/) - para implementação de stores observáveis, apenas. (svelte/store)

No mobile:
 - [tailwind-rn]() - para estilização
 - [axios](https://axios-http.com/ptbr/) - para requisições http
 - [react-navigation](https://reactnavigation.org/) - para navegação
 - [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) - para guardar o token de autenticação da api
