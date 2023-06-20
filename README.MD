# Food Explorer

## About

Food Explorer is a web application developed using technologies such as React.js on the [front-end](https://github.com/GabrielRiomar/backend_foodexplorer) and Node.js back-end that provides a browsing and food ordering experience for restaurant customers.

The administrator has access to create, edit, and delete dishes. New users need to register in order to use the services available on the platform.

## Technologies

- Nodejs
- bcryptjs
- cors
- dotenv
- express
- express-async-errors
- jest
- jsonwebtoken
- knex
- multer
- nodemon
- pm2
- sqlite
- sqlite3

## Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
git clone https://github.com/GomidesTs/food-explorer-back-end.git
```

Execute o back-end

```bash
# Na raiz do projeto renomeie o arquivo .env.example para .env e insira uma porta para a aplicação rodar e um secret para utilizar o jwt no projeto
PORT =
AUTH_SECRET =

# Navegue até o diretório do back-end
cd food-explorer-backend

# Instale as dependências necessárias
npm install

# Agora inicie o servidor do BackEnd
npm run dev

# O terminal irá exibir a frase 'Server is running on Port' e a porta onde a aplicação está sendo executada.
# Server is running on Port {PORT definida no arquivo .env}
```

## Veja o resultado final

Você observará a união desse repositório com o [front-end](https://github.com/GomidesTs/food-explorer-front-end), crie uma conta e desfrute da aplicação.

### Quer ver como a aplicação funciona vista pelo administrador? Use a conta a seguir

`e-mail: admin@foodexplorer.com` `senha: rocketseat`

O servidor deste projeto foi hospedado no [Render](https://render.com/), um serviço de hospedagem gratuito. É importante ressaltar que, por estar hospedado em um serviço gratuito, o back-end entra em estado de hibernação após 15 minutos sem utilização. Caso o usuário tente acessar o site e o back-end não responda, é necessário aguardar um pouco, pois ele estará "inicializando" os serviços novamente. Essa etapa pode levar até 1 minuto, dependendo da carga nos servidores do Render. É importante destacar que esse tempo de inicialização pode afetar o desempenho da aplicação, especialmente em períodos de alta demanda.

Por outro lado, o front-end foi hospedado na plataforma [Netlify](https://www.netlify.com/), que permite hospedar sites e aplicativos web de forma gratuita. Para que o front-end funcione corretamente, é fundamental que o servidor de back-end esteja em funcionamento e respondendo corretamente. Caso contrário, o front-end pode apresentar erros ou comportamentos inesperados.

[O resultado FINAL pode ser visto aqui](https://delicate-belekoy-60cb5c.netlify.app/)

## Executando Testes

Para executar testes, execute o seguinte comando

```bash
npm run test
```
