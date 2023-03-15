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

export interface Detail {
  id: number;
  isOpened: boolean;
}

export interface Abilities {
    name: string;
    image: string;
    damage?: number;
    mana?: number;
}

