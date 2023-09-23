const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const responsesJSON = require('./responses.json')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.post("/dialogflow-fulfillment", (request, response) =>
  dialogflowFulfilment(request, response)
);

app.get("/", (request, response) =>
  response.status(200).json({ Hello: "world!" })
);

const dialogflowFulfilment = (request, response) => {
  const agent = new WebhookClient({ request, response });

  const welcome = agent => agent.add(responsesJSON.welcome)
  const fallback = agent => agent.add(responsesJSON.fallback);
  
  const intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
};

app.listen(PORT, () => console.log(`escutando na porta: ${PORT}`));
