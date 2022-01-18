import express from "express";
import router from "./router";
import RabbitmqServer from "./rabbit-server";

const app = express();

app.use(express.json());

app.use("/api", router);

// Eu sei que deixar isso aqui vai criar nova conexão toda vez, deixei assim só para fim de estudos mesmo.
const initRabbitmq = async () => {
	const server = new RabbitmqServer("amqp://guest:guest@localhost:5672");
	await server.start();
	await server.consume("fila-api", (message) => {
		console.log(message.content.toString());
	});
};

app.listen(3002, () => {
	console.log("Aplicação 2 port 3002");
});

initRabbitmq(); // Executa a função initRabbitmq()
