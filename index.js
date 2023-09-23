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
  const localization = agent => agent.add(responsesJSON.localization);
  const products = agent => agent.add(responsesJSON.products);
  const services = agent => agent.add(responsesJSON.services);
  const contact = agent => agent.add(responsesJSON.contact);
  
  const intentMap = new Map();
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Localização Intent", localization);
  intentMap.set("Produtos Intent", products);
  intentMap.set("Serviços Intent", services);
  intentMap.set("Contato Intent", contact);
  agent.handleRequest(intentMap);
};

app.listen(PORT, () => console.log(`escutando na porta: ${PORT}`));
