import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRouter = Router();

specificationsRouter.post("/", (req, res) => {
  createSpecificationController.handle(req, res);
});

specificationsRouter.get("/", (req, res) => {
  listSpecificationsController.handler(req, res);
});

export { specificationsRouter };
