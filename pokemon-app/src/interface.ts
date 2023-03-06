export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      back_default: string;
      front_shiny: string;
    };
  }

export interface IPokemonDetail extends Pokemon {
  abilities?: {
    ability:string;
    name:string;
  }[];
}  

export interface ILocation {
    id: number;
    name: string;
    region?: {
      name:string;
    }
    areas?: {
      name: string;
    }[];
}

export interface VersionDetail extends ILocation {
  rate: number;
  version?: {
    name: string;
    url: string;
  }[];
}