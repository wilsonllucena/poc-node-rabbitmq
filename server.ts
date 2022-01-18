import express from "express";
import router from "./router";

const app = express();

app.use(express.json());

app.use("/api1", router);

app.listen(3001, () => {
	console.log("Aplicação 1 port 3001");
});
