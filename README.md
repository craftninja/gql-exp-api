## todos:

- [x] add eslint
- [ ] add testing

# README

Five part series on building a graphql server with node and express

- [x] https://youtu.be/PEcJxkylcRM
- [x] https://youtu.be/qqzIA1BQ_ys
- [x] https://youtu.be/e9Zxzr7sy60
- [x] https://youtu.be/BqfZZ0wDeMU
- [ ] https://youtu.be/ay81Q5JhkEw

## setup

* fork, clone, npm install
* `$ createdb gql_exp_api_development`
* `$ npm run db:migrate`
* `$ npm run db:seed` to seed the database
* consider `$ npm install -g nodemon` to restart server on change, and:
  * `$ nodemon start` (OR `$ npm start`)
* open browser and navigate to [localhost:3000/graphql](http://localhost:3000/graphql)
* enter a variant of these sample data structures to query the PostgreSQL database:

    ```
    {
      customer(id:"1"){
        name,
        email,
        age
      }
    }
    ```

    ```
    {
      customers{
        name,
        email,
        age
      }
    }
    ```

    ```
    mutation{
      addCustomer(
        name: "Winona Laduke",
        email: "winona@example.com",
        age: 59
      ){
        id,
        name,
        email,
        age
      }
    }
    ```

    ```
    mutation{
      deleteCustomer(
        id: "1",
      ){
        id,
        name,
        email,
        age
      }
    }
    ```

* click on `< Docs` and play with the documentation explorer

## linting

* `$ npm run lint`

## create migration

Sometimes creating a migration is a little fussy. I made a lil script to help you out!

```sh
node run db:createMigration NameOfMigration
```
