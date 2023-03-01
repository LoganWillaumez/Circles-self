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
- Install the database with the initDB and change .env based on .env.example of the project
- Install the dependencies using pnpm: pnpm install
- Start server and client, both using ppm : pnpm run dev
- Enjoy !
```

Note that you need to have pnpm installed on your computer in order to use the above commands.