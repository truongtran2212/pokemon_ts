import {localhost} from "./server.js";
const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const manageAbilities = `${endpoint}/manage-abilities`;
    
export const managePlayer1 = `${endpoint}/manage-player1`;
