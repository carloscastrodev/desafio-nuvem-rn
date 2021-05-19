# Teste Nuvem Tecnologia

## O Problema

<br />

Uma compania de taxi de brasilia possui 6 veículos em funcionamento diário que percorre toda a cidade cobrando um valor por kilometro percorrido. Ao inicio de cada dia os táxis recebem indivudalmente um valor limite de kilometro permitido rodar no dia e o valor do seu kilometro de forma aleatória. Quando cada taxi atingir seu limite de kilometro ou faturamento acima de R$ 1000,00, deverá ser finalizado sua jornada, será retirado do mapa o veiculo e seu faturamento será computado para entrar no rank geral.

<br />

## Solução

Deve ser desenvolvido um aplicativo aonde simule as viagens de cada táxi escolhido no mapa e calcule os valores e salve no aplicativo em um banco local para gerar o rank geral de faturamento. 
<br />
Será fornecida um modelo de dados para ser usado.

<br />

## Critérios de aceite

1. Ao iniciar a jornada deverá ser gerado de forma aleatória um valor entre 1 e 10 reais que será o valor do kilometro

2. Ao iniciar a jornada deverá ser criado de forma aleatória um total entre 300 e 1000 kilometros como limite máximo permitidos para cada táxi

3. Ao abrir o app pela primeira vez ou clicar no botão de recarregar ilustrado no primeiro protótipo se inicia uma jornada e executa os critério 1 e 2

4. Deverá exibir no mapa todos os taxis seguindo a latitude e longitude informada no arquivo de mock

5. Ao clicar em um táxi deverá abrir uma janela com efeito de slide vindo de baixo para cima apresentando os dados do taxi e um campo para digitar a quantidade de kilometros para fazer a viagem

6. Ao informar a quantidade de kilometros da viagem deverá automaticamente calcular o valor total da corrida com base no valor do critério 1 multiplicado pelo total de kilometros informado

7. Ainda na mesma tela deverá apresentar a quantidade de kilometros ainda disponível pelo táxi considerando os kilometros da solicitação atual

8. Quando clicar em fazer viagem deverá computar tudo e salvar em um banco local e voltar para a tela inicial

9. Quando um táxi atingir o limite de kilometros ou o limite de faturamento (R$ 1000,00 por jornada) deverá ser retirado do mapa e automaticamente contado mais uma notificação

10. Ao clicar no icone de notificação deverá apresentar o rank atual dos veiculos ordenado pelo valor do maior para o menor faturamento





<br />

### Considerações finais

* O aplicativo deverá ter um readme.md com as instruções para executar
* É desejavel que tenha cobertura de testes
* Será avaliado organização de código, gerenciamento de estado e definições de responsabilidade dos componentes e regras de negócio
* Não é obrigatório, mas será um diferencial utilizar typescript

O resultado final deverá ser enviado no email roberto.giacomette@nuvem.net com o link do github do projeto

Link do prototipo https://xd.adobe.com/view/a3ef196a-a33d-48a7-939d-4eb0a8b37db1-f6bc

Não necessariamente precisa seguir fielmente cada detalhe do prototipo, porém deve manter um bom nivel de fidelidade.