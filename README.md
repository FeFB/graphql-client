# graphql-client-rxjs

Simple GraphQL Client using http fetch and RxJS

## Install

```
npm i graphql-client-rxjs --save
```

## Usage

Note: gc.query(query) is using method GET

```
const GraphQLClient = require("graphql-client-rxjs");
const gc = new GraphQLClient("http://domain.com/graphql");

const query = `
{
  adm(id: "Vovz66F9dJ95gTR2lExk") {
    id
  }
}
`;

gc.query(query)
  .subscribe(body=> console.log(body), err => console.log(err));
```

```
gc.mutation(mutationQuery)
  .subscribe(body=> console.log(body), err => console.log(err));
```
