# README

Five part series on building a graphql server with node and express

- [x] https://youtu.be/PEcJxkylcRM
- [x] https://youtu.be/qqzIA1BQ_ys
- [ ] in progress https://youtu.be/e9Zxzr7sy60
- [ ] https://youtu.be/BqfZZ0wDeMU
- [ ] https://youtu.be/ay81Q5JhkEw

## setup

* fork, clone, npm install
* consider `npm install -g nodemon` to restart server on change, and:
  * `nodemon start` (OR `npm start`)
* open browser and navigate to [localhost:3000/graphql](http://localhost:3000/graphql)
* enter a variant of this data structure to query the static "database":

    ```
    {
      customer(id:"1"){
        name,
        email,
        age
      }
    }
    ```

* click on `< Docs` and play with the documentation explorer
