export interface Profile {
    id: number;
    name: string;
    image?: string;
    tasks: number[];
    points: number;
    pin: string; //TODO pin pour future login feature 
}

  