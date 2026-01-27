export interface GameDefinition {
  title: string;
  definition: {
    suspects: string[];
    items: string[];
    rooms: string[];
  }
}
