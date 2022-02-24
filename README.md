# Currency Converter

## Project setup

- Clone the project and add the Environment variabel (.env) file in both Client and Server directories by reffering env.example files

#### Add the necessary Keys susch as API_KEY(fixer.io API Key) , JWT_SECRET(key/salt for genersting JWT tokens) and BASE_URL(Server/Backend/Graphql URL)

```
API_KEY=
JWT_SECRET=
```

---

## Installing dependencies

- Run the following commands in both Server and Client

```
# Inside Client
$ yarn install (or npm install)

# Inside Server
$ npm install

```

---

## Starting the project

- Run the following commands in both Server and Client

```
# Inside Client
$ yarn start (or npm start)

# Inside Server
$ npm start

```

---

## Development

- Run the following commands in both Server and Client

```
# Inside Client
$ yarn start
    # or
$ npm start

# Inside Server
$ npm run dev

```

---

## Tests

- Run the following commands in both Server to run unit tests

```
# Inside Server
$ npm run test
```

---

## Project Design Decissions

### Sever

- Use caching to keep the Countries and Selected Currencies
- Using a corn job to fetch currencies every 2 minutes
- Saving a user in memory for user authentication with JWT

#### Special Libraries used for Sever Implementation

- `axios` for data fetching
- `node-cache` for caching data
- `graphql-rate-limit` for limiting number of request per minute
- `node-cron` to run corn jobs to fetch currencies
- `nexus` to define queries and mutations
- `graphql-type-json` to convert to JSON data structure

---

### Client

- Higher Orfer Component for Protecting Routes
- Using Debounce for input events
- Using apollo-client context to set authorization header

#### Special Libraries used for Client Implementation

- `react-toast-notifications` for error notifications
- `lodash.debounce` for adding debounce for events
- `graphql-rate-limit` for limiting number of request per minute
- `@mui/material` for building components

---

### Test User Credentials

- username: "adam"
- password: "12345"
