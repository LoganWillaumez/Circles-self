# Circles-self

This project is a monorepo that combines the server developed with Node.js/Express and the client developed with Sveltekit. The database is in PSQL and hosted on a virtual machine via Docker.

This application was initially developed with 4 other people as part of my academic program at O'clock. After completing this project, I wanted to improve and redo it from scratch to further develop my skills as a front-end and back-end developer.

I would like to warmly thank the members of the initial team for their valuable contribution to the previous project. You can find the old version of the application here: [https://github.com/LoganWillaumez/Circles].

This Github repository presents this refactored version of the application, which includes additional features and a different approach of the project.

## Used Technologies
- Front-end: Sveltekit with Tailwindcss and SCSS
- Design : Figma
- Back-end: Express
- Database: PostgreSql
- Infrastructure: Docker and a virtual machine

## How to start the application locally

```
- Update Docker: Make sure Docker is up-to-date on your system
- Install the dependencies using pnpm: pnpm install
- Execute the following command to initialize the database in a dedicated Docker container: pnpm -w run server:docker
- Add .env based on .env.example
- Start server and client, both using pnpm : pnpm run dev
- Enjoy !
```

Note: If you choose to use a different package manager, such as npm or yarn, you'll need to adjust the scripts accordingly.