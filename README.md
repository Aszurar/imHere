# imHere

O projeto **imHere** é um aplicativo mobile que lista os participantes de um evento e detalhes desse evento como nome e data.

- Baixe e instale em seus dispositivo Android pela Google Play Store: [**imHere**](https://play.google.com/store/apps/details?id=com.aszurar.imhere)

  - O aplicativo foi enviando para produção com todo seu ciclo de CI/CD automatizado para o Android:
    <div align="center" >
        <a href="https://play.google.com/store/apps/details?id=com.aszurar.imhere" >
        <img src="https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png" width="200">
        </a>
     </div>

      <h3 align="center">
        <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
        <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;
        <a href="#art-design">Design</a>&nbsp;|&nbsp;
        <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
        <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
        <a href="#truck-continuous-delivery-and-distribution">CI/CD</a>|&nbsp;&nbsp;
        <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;
      </h3>

---

<div align="center" >
    <img src="https://i.imgur.com/jBsiTXa.gif" width="200">____<img src="https://i.imgur.com/EekAVnU.gif" width=200>
</div>

- [**Link do vídeo completo sobre o projeto**]()

---

## :information_source: Sobre

- A ideia desse aplicativo é poder listar todos os participaentes de um evento, além de poder adicioná-los, removê-los e também cadastrar o nome e a data do evento. Ou seja, é basicamente uma aplicação CRUD básica, onde temos uma listagem, cadastro, remoção e edição de dados.
  - Para a construção da interface desse projeto foi usado **React Native** com **TypeScript**.
  - Usamos o **AsyncStorage** para armazenar os dados localmente.
  - Usamos as libs react-native-svg e react-native-svg-transformer para a utilização de SVGs no projeto.
  - Usamos o Expo para auxiliar no desenvolvimento do projeto.
  - A estilização é feita com StyleSheet já que a ideia é entender o básico do React Native.
- Na sessão de tecnologias temos linkado as referências para cada uma <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a> estará mais detalhado.
  - Funcionalidadedes:
    - Adicionar um novo participante.
    - Remover participante.
    - Lista todos participantes cadastrados.
    - Cadastrar Nome e data do evento
    - Deletar Nome e data do evento
    - Remover todos dados cadastrados
    - Persistência de dados com AsyncStorage.

1. **Cadastro do nome e data do evento**
   <div align="center" >
      <img src="https://i.imgur.com/KA6rh1O.png" width="1000">
   </div>

   - **Validação do formulário de cadastro do evento**
   <div align="center" >
     <img src="https://i.imgur.com/1mRnSdj.png" ali  width="700">
   </div>

2. **Remoção do nome e data do evento**
<div align="center" >
   <img src="https://i.imgur.com/wkF7vrv.png" width="700">
</div>

3. **Cadastro de um novo participante**
   <div align="center" >
      <img src="https://i.imgur.com/VrhpULU.png" width="500">
   </div>

   - **Validação do campo de participante**
   <div align="center" >
     <img src="https://i.imgur.com/D2NGS1z.jpg" ali  width="200">
   </div>

4. **Remoção de participante**
<div align="center" >
   <img src="https://i.imgur.com/QNUd6Wr.png" width="700">
</div>

5. **Remoção de todos os dados cadastrados**
   <img src="https://i.imgur.com/wzgBELT.png" width="1000">

---

## :interrobang: Motivo

Esse projeto tem o objetivo de praticar os conceitos básicos do React Native e seus componentes, além de praticar o uso de TypeScript e também de algumas libs como o AsyncStorage.
É um projeto simples, mas que trata da base de um aplicativo mobile, onde temos uma listagem, cadastro, remoção e edição de dados.
Além disso **é um projeto que tem sua base desenvolvida no primeiro módulo do bootcamp Ignite de React Native da (Rocketseat)[https://www.rocketseat.com.br/]**.

Nesse primeiro módulos focamos na interface e nos conceitos básicos do React Native.
Com isso, **toda essa parte de persistência de dados com Async-Storage, modificação do nome do evento, data do evento, formatação de datas, tudo isso foram melhorados e adicionados por mim.**

---

## :art: Design

[<h2 align="center">imHere</h2>](https://www.figma.com/file/dKgBKYu2CNU1yazm38RTOe/ImHere?node-id=0%3A1&t=rCIBiTQvrLQaibpd-0)

<div align="center">
<a href="https://www.figma.com/file/dKgBKYu2CNU1yazm38RTOe/ImHere?node-id=0%3A1&t=rCIBiTQvrLQaibpd-0">
<img src="https://i.imgur.com/JzVwCXs.png" width="1000">
</a>
</div>

---

## :seedling: Requisitos Mínimos

- Android Studio
- Celular(Opcional)
- Node.js
- React
- React-Native
- Expo
- TypeScript
- Yarn(ou NPM)

---

## :rocket: Principais Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Android Studio](https://developer.android.com/studio)
- [Async Storage](https://react-native-async-storage.github.io/async-storage/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [NodeJS](https://nodejs.org/en/)
- [Expo](https://docs.expo.dev/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [React Native SVG](https://github.com/react-native-svg/react-native-svg)
- [React Native SVG Transformer](https://github.com/kristerkari/react-native-svg-transformer)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://classic.yarnpkg.com/blog/2017/05/12/introducing-yarn/)

---

## 🚚 CI/CD

- Para a publicação do aplicativo, primeiro foi gerada a build manualmente com o comando <code>**./gradlew bundleRelease**</code>, utilizando o build.gradle dentro da pasta android, que foi configurado com enableProguardInReleaseBuilds e enableHermes como true.
- Essa build foi enviada para o Google Play Console, onde todas as configurações do projeto Android foram personalizadas, incluindo a descrição, nome e imagens do aplicativo.

- Em seguida, foi integrado o repositório remoto do projeto, que está no GitHub, com a plataforma App Center da Microsoft para gerar o CI/CD. O App Center observa a branch main, que é a de produção, e automaticamente gera uma nova build do aplicativo e envia para a Google Play Store sempre que há um push na branch.

- Antes de usar o App Center, foi realizada toda a configuração necessária para que a plataforma possa realizar esse processo de forma automática.

<div align="center">
<img src="https://i.imgur.com/29M1Y6R.png" width="1000">
</div>

---

## :package: Como baixar e executar o projeto

- Clonar o projeto:
  ```bash
   git clone https://github.com/Aszurar/imHere
  ```
  - É necessário a instalação do **yarn** de acordo com seu sistema operacional, para isso veja como no site do [Yarn](https://yarnpkg.com/)
  - Instalação das dependências:
  - Execute o comando abaixo dentro da pasta do projeto
  ```bash
    yarn
  ```
  - É possível executar o projeto em um dispositivo físico caso não queira usar o emulador. Caso queira usar o emulador, faça instalação sua instalação por aqui: [Android Studios](https://developer.android.com/studio) e das tecnologias requesitadas acima no:seedling: <a href="#seedling-requisitos-mínimos">**Requisitos**</a>
  - Também é necessário a instalação/configuração de outras tecnologias, para isso siga os passos indicados nessa página de acordo com seu sistema operacional: [Executando uma Aplicação React-Native emulando Windows/Linux/MacOS ou direto no dispositivo mobile Android/IOS](https://react-native.rocketseat.dev/android/linux)
- Execução -
  - Com o emulador android aberto ou o dispositivo móvel físico conecatdo via USB:
  - **Abra a pasta do projeto com alguma IDE(Vscode) ou simplesmente abra o terminal na pasta do projeto e execute o comando abaixo:**
  ```bash
     yarn android
  ```
- Caso o metro-bundle não funcione, execute como abaixo:
  1. Executando o metro-bundle:
     ```bash
         yarn start
     ```
  2. Executando no android:
     ```bash
         yarn android
     ```
- Caso esteja no IOS, após as configurações faladas anteriormente até no link mencionado acima, então execute o comando abaixo:
  ```bash
      yarn ios
  ```

---

Desenvolvido por :star2: Lucas de Lima Martins de Souza.
