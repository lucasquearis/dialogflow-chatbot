const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");

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

  function statusPedido(agent) {
    const idPedido = Math.floor(Math.random() * (1000 - 1) + 1);
    agent.add("Olá, seu pedido " + idPedido + " já foi enviado!");
  }

  const intentMap = new Map();
  intentMap.set("Status Pedido Intent", statusPedido);
  agent.handleRequest(intentMap);
};

app.listen(PORT, () => console.log(`escutando na porta: ${PORT}`));
