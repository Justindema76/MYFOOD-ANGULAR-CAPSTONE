export class Food {
  id!: number;
  name!: string;
  price!: number;
  tags: string[] = []; // Initialize as an empty array
 description!: string;
  imageUrl!: string;
  origins: string[] = [];
  cookTime!: string;
}
