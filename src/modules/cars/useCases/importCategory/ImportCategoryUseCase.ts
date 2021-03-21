import csvParse from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<Array<IImportCategory>> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      const categories: Array<IImportCategory> = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("end", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories: Array<IImportCategory> = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const categoryExists = this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
