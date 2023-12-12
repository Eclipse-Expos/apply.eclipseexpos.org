# apply.eclipseexpos.org

<img width="1127" alt="Screenshot 2023-12-12 at 3 25 34 PM" src="https://github.com/Eclipse-Expos/apply.eclipseexpos.org/assets/75189508/eb365e10-6c13-4449-9ff1-4cd5d5a6c6de">

## Preview

https://apply.eclipseexpos.org/

## Contributing

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Eclipse-Expos/apply.eclipseexpos.org.git
   ```

2. Install NPM packages

   ```sh
    npm install
   ```

3. Run the database container

   ```sh
   docker compose up application -d
   ```

4. Run prisma migrations

   ```sh
   npx prisma migrate dev
   ```

5. Run the development server

   ```sh
   npm run dev
   ```

_Note: You will have to create a .env file from the template_

### Committing

1. Create a new feature branch

   ```sh
   git checkout -b feature/AmazingFeature
   ```

2. Commit your changes

   ```sh
    git commit -m 'feat: add some AmazingFeature'
   ```

   _Remember to use [semantic commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)_

3. Push to the branch

   ```sh
   git push origin feature/AmazingFeature
   ```

4. Open a pull request to the `dev` branch

5. Associate the pull request with the relevant issue (if applicable)
