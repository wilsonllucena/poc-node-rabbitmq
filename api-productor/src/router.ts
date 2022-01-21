import { Router } from "express";
import RabbitmqServer from "./rabbit-server";

const router = Router();

router.get("/", (req, res) => {
	return res.json({
		message: "API 1",
	});
});

router.post("/publisher/pedido", async (req, res) => {
	const server = new RabbitmqServer("amqp://guest:guest@localhost:5673");
	await server.start();

	//await server.publishInQueue("fila-api", JSON.stringify(req.body));

	await server.publishInExchange(
		"exchange-pedido",
		"rota-pedido",
		JSON.stringify(req.body)
	);

	return res.json({ message: "Pedido enviado com sucesso" });
});

export default router;
