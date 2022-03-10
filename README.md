<div id="top"></div>

<br />
<div align="center">
  <h3 align="center">QUIZ</h3>

  <p align="center">
    A web api that allows users to create and take quiz
    <br />
  </p>
</div>
<br />
<br />

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br />
<br />

<!-- ABOUT THE SERVICE -->

## About The Service

A web api that allows users to create and take quiz

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/atlas/database)
- [Docker](https://www.docker.com)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

\_Below is an instruction on how to install and set up your app.

#### Docker

1. Clone the repo

   ```sh
   git clone https://github.com/soguazu/quiz.git
   ```

2. Cd into the directory

   ```sh
   cd quiz
   ```

3. Create an .env

   ```sh
   touch .env
   ```

4. Copy the value inside .env.sample into the .env and fill the values for the necessary config

5. Run the application
  

   ```sh
   make
   ```

## Usage

For documentation, please refer to the [API Documentation](http://localhost:8080/rest-docs)

<p align="right">(<a href="#top">back to top</a>)</p>

## Scripts

- `yarn build` - Compiles src code into dist
- `yarn start` - Starts the app in production mode
- `yarn run dev` - Starts the app in development mode
- `yarn run lint`: Lint code using ESLint
- `yarn run docs:api` - generates API docs

<p align="right">(<a href="#top">back to top</a>)</p>

Visit [http://localhost:8080/rest-docs](http://localhost:8080/rest-docs) for API documentation

## Contact

Your Name - info@evea.africa

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

# The Project is Structured with Clean Architecture

To learn more about clean architecture, please read this article https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

:warning: DISCLAIMER: This is an opinionated implementation of Clean Architecture. Please feel free to modify it to meet your preference.

## What you get

- Project Structure (adopted from Clean Architecture)
- Dependency Injection
- API Documentation using https://apidocjs.com/
- MongoDB setup
- Configured Express server
- Compliance with [12 factor app](https://12factor.net/)
- Process manager

## Project structure

- **app**: App contains the use cases of the system. A use case can contain business logic for accomplishig a specific goal. Similar usecases can be grouped together in directories e.g RegisterUser, VerifyUser can be grouped under "users".
  :warning: NOTE: use-cases should NEVER communicate with any external service such as a database directly. Instead, they should call an interface.
- **config**: Environment specific configurations for the application e.g Database connection options, payment providers, etc. All files created in `config` directory are automatically loaded and exported to
  different application modules.
- **domain**: Domain contains the core business logic. A domain here is the real-world context in which you're attempting to solve a problem using software i.e the business thee app will be used for. An entity can be an object with methods, or it can be a set of data structures and functions that mirror their real life counterparts. Example of entities in the e-commerce domain might be Customer, Product, Cart, etc.
  :warning: NOTE: entities should NEVER communicate with any external service such as a database directly.
- **infastructure**: Infastructure contains the logics to commuicate with all third party assisting application
- **interfaces**: Interfaces are delivery mechanisms for your app i.e how users access your app. For example, through a REST API, gRPC server, GraphQL. In this example, we are delivering our application using Express web framework for Nodejs.
- **scripts**: One time scripts go here. Read https://12factor.net/admin-processes to learn more

## Dependency Injection

Dependency injection has been setup by default. Read https://stackify.com/dependency-injection/ to learn more about DI (Dependency Injection). [awilix](https://www.npmjs.com/package/awilix) is the package used for implementing DI. Read [this article](https://medium.com/@Jeffijoe/dependency-injection-in-node-js-2016-edition-f2a88efdd427) to get familiar with Awilix. All models, use cases, entities you create are loaded automatically into the container.
