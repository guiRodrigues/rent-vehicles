import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute() {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
