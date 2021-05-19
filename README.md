## Desafio Frontend Nuvem

### Como Rodar
 1. <b>Clone esse repositório</b>
 ```
 git clone https://github.com/carloscastrodev/desafio-nuvem-rn.git
 ```
 2. <b>Instale as dependências</b>
 ```
 npm install ou yarn
 ```
 3. a <b>Para rodar no Android</b>
 ```
 npm run android ou yarn android
 ```
 4. b <b>Para rodar no iOS</b>
 ``` 
 npm run ios ou yarn ios
 ``` 
 5. <b>Para executar os testes</b>
 ```
 npm run test ou yarn test
 ```
 6. <b>Para gerar um .apk instalável em dispositivos físicos</b>
 ```
 npm run android-apk ou yarn android-apk
 ```

### Em caso de problemas
 - Tente utilizar `npm run clean` ou `yarn clean` e rodar novamente
 - Tente apagar a pasta `node_modules` e instalar as dependências novamente utilizando `npm install` ou `yarn`
 - Caso o emulador não seja encontrado automaticamente, tente abrir o mesmo manualmente antes de rodar o aplicativo
 - Caso ocorra algum erro devido a não encontrar o SDK ao executar a versão para Android, adicione um arquivo "local.properties" na pasta android, contendo
 ```
 sdk.dir = /CAMINHO/PARA/O/SDK
 ```
 _No meu caso: sdk.dir = C:\\Users\\Carlos\\AppData\\Local\\Android\\sdk_ 

 ### Especificações do Desafio
 [Desafio](desafio.md)

 ### Observações
  - <b>Não foi testado no iOS, apenas Android.</b>

