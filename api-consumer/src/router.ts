import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	return res.json({
		message: "API 2",
	});
});

export default router;
