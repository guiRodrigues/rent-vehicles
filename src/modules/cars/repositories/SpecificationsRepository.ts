import { Specification } from "../models/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "./interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly specifications: Array<Specification>;
  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  static getInstance(): SpecificationsRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository();
    }

    return this.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  list(): Array<Specification> {
    return this.specifications;
  }
}

export { SpecificationsRepository };
