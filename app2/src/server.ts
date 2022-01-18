import express from "express";
import router from "./router";
import RabbitmqServer from "./rabbit-server";

const app = express();
const server = new RabbitmqServer("amqp://guest:guest@localhost:5672");

app.use(express.json());

app.use("/api", router);

const initRabbitmq = async () => {
	await server.start();
	await server.consume("fila-api", (message) => {
		console.log(message.content.toString());
	});
};

app.listen(3002, () => {
	console.log("Aplicação 2 port 3002");
});

initRabbitmq();
