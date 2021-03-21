import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handler(request: Request, response: Response) {
    const specifications = this.listSpecificationsUseCase.execute();

    return response.json(specifications);
  }
}

export { ListSpecificationsController };
