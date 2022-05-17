# Instruções para roda o projeto (para desenvolvimento)

É necessário as versões LTS de Localtunnel(npm global), NodeJS, Yarn, PHP (>= 7.4), Composer, Docker e Docker-Compose.

 - Execute ```cp .env.example .env && (cd backend && cp .env.example .env)```
 - Execute ```(cd backend && composer install && php artisan key:generate)```
 - Execute ```(cd frontend && yarn install && yarn tailwind:build)```
 - Execute ```docker-compose up --detach --build```
 - Depois que os container estiverem ativos, execute ```docker exec -it laravel php artisan migrate```

## Para a aplicação mobile

- Siga os passos de preparo de ambiente do Expo.
- Execute ```lt --port 8000``` (Ou qualquer outra porta que você tenha exposto o backend/laravel)
- Use o endereço obtido na env BACKEND_URL, em ./mobile/.env
- Execute ```yarn android``` em ./mobile

<br />

Se houver conflito de portas, existem configurações no arquivo .env na raíz dessse proeto que podem ser alteradas, rode um down e novamente um up no docker-compose em seguida.

# Bibliotecas utilizadas

O frontend roda em React, o backend em laravel. <br />
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
