exports["default"] = {
  routes: api => {
    return {
      /* ---------------------
      routes.js

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/#routes
      */

      get: [
        { path: "/getplayer/:empId", action: "getplayer" } // (GET) /api/getplayer
      ],

      post: [
        { path: "/createplayer", action: "createplayer" },
        { path: "/playerSignIn", action: "playerSignIn" },
        { path: "/updateplayer", action: "updateplayer" },
        { path: "/createSession", action: "createSession" },
        { path: "/rollDice", action: "rollDice" },
        { path: "/joinGame", action: "joinGame" }
      ]
    };
  }
};
