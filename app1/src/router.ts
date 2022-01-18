import { Router } from "express";
import RabbitmqServer from "./rabbit-server";

const router = Router();

router.get("/", (req, res) => {
	return res.json({
		message: "API 1",
	});
});

router.post("/app1", async (req, res) => {
	const server = new RabbitmqServer("amqp://guest:guest@localhost:5672");
	await server.start();
	await server.publishInQueue("fila-api", JSON.stringify(req.body));
	res.json(req.body);
});

export default router;
