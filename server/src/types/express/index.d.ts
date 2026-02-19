export type {};

declare global {
  namespace Express {
    export interface Request {
      // On définit ce qu'est un utilisateur pour Express
      user?: {
        id: number;
        email: string;
        firstname: string;
        lastname: string;
      };
    }
  }
}