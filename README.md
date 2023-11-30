# Search Flight


Esse repositório contém o código fonte do projeto Search Flight, que é um sistema voltado para agências de viagens, que permite a busca de voos através de regiões personalizadas. Isso visa solucionar um problema bastante comum para clientes, que precisam buscar voos de forma manual, aeroporto por aeroporto, para encontrar o melhor preço.

Usando esse sistema é possível selecionar aeroportos para buscar voos. Por exemplo, é possível buscar voos para perto de Roma e selecionar os aeroportos de Roma, Milão e Veneza. O sistema irá buscar voos para esses aeroportos e mostrar os resultados em uma única tela.

Para isso, basta o usuário buscar uma cidade de origem, buscar uma cidade de destino e selecionar aeroportos próximos. Após isso, é possível trocar a cidade de destino e selecionar outros aeroportos próximos. Por fim, selecionado data e preço, o sistema irá buscar voos para todos os aeroportos selecionados e mostrar os resultados em uma única tela.

## Instalação

Para instalar o projeto, basta ter o [Docker](https://www.docker.com/) instalado na máquina. Com o Docker instalado, basta executar o comando abaixo na raiz do projeto:

```bash
docker-compose up -d --build 
```

## Uso

O sistema está disponível publicamente. Para acessar, basta abrir o navegador e acessar o endereço [http://d2bet15sdpkqa9.cloudfront.net/](http://d2bet15sdpkqa9.cloudfront.net/).

Preste atenção que o link é http.

Usando o Docker, o projeto estará disponível na porta 3000. Para acessar, basta abrir o navegador e acessar o endereço [http://localhost:8080](http://localhost:8080).

Com isso, será possível acessar o sistema e fazer buscas de voos.

## Qualidade de Código

Foi usado o [SonarCloud](https://sonarcloud.io/organizations/luis-antonio-momm-duarte/projects) para avaliar a qualidade de código do projeto. 

## Monitoramento

Foi usado o CloudWatch para monitorar o projeto. O dashboard pode ser acessado [aqui](https://cloudwatch.amazonaws.com/dashboard.html?dashboard=monitoramento-search-flight&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTQ0MTc4NTc2ODI4NiIsIlUiOiJ1cy1lYXN0LTFfZlFDTlQzQUk2IiwiQyI6IjZlMGppZ2hpbjFjYWdkbmhxY29jYTNzZnF0IiwiSSI6InVzLWVhc3QtMTozMGQzMDIwNC1kODcyLTQ2M2YtYWE5Zi0zNzk2NmEyNTAwZmEiLCJNIjoiUHVibGljIn0=).

## Contribuição

Pull requests são bem-vindos. Para grandes mudanças, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autor

[Luis Antonio Momm Duarte](luismomm@gmail.com)

## Modelagem de Dados:

![Modelagem de dados](docs/er.png)

## Arquitetura do Projeto:

### Visão geral:

![Visao Geral](img_1.png)
### Visão dos containers:

![Visao containers](server/docs/img_1.png)

### Visão dos componentes:

![Visao componentes](server/docs/c4-componentes.png)

## Requisitos do projeto 

### Requisitos Funcionais: 

- [] sistema deve permitir que o usuário veja os voos da região cadastrada
- [] sistema deve permitir a adição de filtros como preço, passageiros e data
- [] sistema deve permitir que o agente de viagens crie, edite e exclua regiões.
- [] sistema deve permitir ordenação por distância da origem, preço e duração em horas
- [] sistema deve permitir login para o agente de viagem

### Requisitos Não Funcionais:

- [] O sistema deve ser responsivo
- [] O sistema deve ser de fácil uso 
- [] O sistema deve estar disponível sempre
- [] O sistema deve ter um tempo de resposta imediato ou rápido
- [] O sistema deve ser tolerante a falhas de usuário ou servidor
- [] O sistema deve ser maleável para mudanças de regras de negócio ou design
- [] O sistema deve manter as informações de forma segura e confidenciais.

## Casos de uso:

- [ ] O sistema deve permitir que o cliente final busque voos para determinadas regiões
- [ ] O sistema deve permitir que o agente de viagem crie regiões e salve-as
- [ ] O sistema deve permitir que o agente de viagem faça login para ver suas regiões criadas
- [ ] O sistema deve permitir que o cliente busque voos para determinados horários
- [ ] O sistema deve permitir que o cliente filtre por preço e número de passageiros
- [ ] O sistema deve permitir que o usuário que as buscas sejam compartilhadas


## Restrições do Projeto:

- [ ] O sistema não vai permitir compras de passagens
- [ ] O sistema não vai salvar histórico de buscas
- [ ] O sistema não vai permitir que o usuário crie uma conta
- [ ] O sistema não vai permitir que o usuário salve buscas
- [ ] O sistema não vai permitir que o usuário crie alertas de preços
- [ ] ## Casos de uso:

- [ ] O sistema deve permitir que o cliente final busque voos para determinadas regiões
- [ ] O sistema deve permitir que o agente de viagem crie regiões e salve-as
- [ ] O sistema deve permitir que o agente de viagem faça login para ver suas regiões criadas
- [ ] O sistema deve permitir que o cliente busque voos para determinados horários
- [ ] O sistema deve permitir que o cliente filtre por preço e número de passageiros
- [ ] O sistema deve permitir que o usuário que as buscas sejam compartilhadas


## Restrições do Projeto:

- [ ] O sistema não vai permitir compras de passagens
- [ ] O sistema não vai salvar histórico de buscas
- [ ] O sistema não vai permitir que o usuário crie uma conta
- [ ] O sistema não vai permitir que o usuário salve buscas
- [ ] O sistema não vai permitir que o usuário crie alertas de preços

## Ferramentas: 

As principais ferramentas utilizadas no projeto são:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Python](https://www.python.org/)
- [Pytest](https://docs.pytest.org/en/stable/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Amadeus](https://developers.amadeus.com/)

Não é necessário instalar as ferramentas acima, pois o Docker irá instalar tudo automaticamente.

## Infraestrutura:

- [AWS](https://aws.amazon.com/pt/)
- [EC2](https://aws.amazon.com/pt/ec2/)
- Github Actions

## Metolodogia de Desenvolvimento:

A metolodogia de desenvolvimento utilizada foi o [Kanban](https://pt.wikipedia.org/wiki/Kanban_(desenvolvimento_de_software)).
Para design de software foi utilizado o [C4 Model](https://c4model.com/), com arquitetura Clean Architecture e Domain Driven Design.


## Trade-offs

- O sistema não vai permitir compras de passagens pois não temos acesso a API de compra de passagens
- O sistema não terá aplicativo mobile por falta de tempo 
- O sistema não terá aviso de notificação por focar na arquitetura de busca e gerenciamento de regiões.


## Pacotes

- Pacote 1 - Definição da Arquitetura, Documentação e Infraestratura
- Pacote 2 - Criação de parte inicial dos casos de uso
- Pacote 3 - Criação da parte final dos casos de uso e deploy em Cloud
