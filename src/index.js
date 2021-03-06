const { Observable } = require("rxjs");
const Util = require("./Util");
const fetch = require("node-fetch");

class GraphQLClient {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  query(query, variables = null) {
    let endPoint = this.endPoint + "?query=" + query;
    if (variables) {
      endPoint = endPoint + "&variables=" + variables;
    }

    const promiseFetch = fetch(endPoint).then(res => res.text());

    return Observable.fromPromise(promiseFetch).map(bodyString => {
      const body = JSON.parse(bodyString);
      const { errors } = body;
      if (errors) {
        throw errors;
      }
      return body;
    });
  }

  mutation(query, variables = null) {
    let body = {
      query
    };

    if (variables) {
      body.variablesValues = variables;
    }

    const promiseFetch = fetch(this.endPoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.text());

    return Observable.fromPromise(promiseFetch).map(bodyString => {
      const body = JSON.parse(bodyString);
      const { errors } = body;

      if (errors) {
        throw errors;
      }
      return body;
    });
  }

  get(queryName, params = "", fields) {
    const paramsString = Util.paramsToString(params);
    console.log(paramsString);

    const source = `query {
      ${queryName} (${paramsString}) {
        ${fields}
      }
    }`;
    return this.query(source);
  }

  set(queryName, params = "", fields) {
    const paramsString = Util.paramsToString(params);
    console.log(paramsString);

    const source = `mutation {
      ${queryName} (${paramsString}) {
        ${fields}
      }
    }`;

    console.log("=========");
    console.log(source);
    return this.mutation(source);
  }
}

module.exports = GraphQLClient;
