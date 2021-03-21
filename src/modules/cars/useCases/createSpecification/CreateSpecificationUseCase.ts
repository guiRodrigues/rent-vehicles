import { ICreateSpecificationDTO } from "../../repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO): void {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new Error("Specification already exists");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
