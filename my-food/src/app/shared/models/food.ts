export class Food {
  id!: number;
  name!: string;
  price!: number;
  tags: string[] = []; // Initialize as an empty array
  stars!: number;
  imageUrl!: string;
  origins: string[] = [];
  cookTime!: string;
}
