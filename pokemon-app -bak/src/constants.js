import {localhost} from "./server.js";
const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const manageAbilities = `${endpoint}/manage-abilities`;
    
export const managePlayer1 = `${endpoint}/manage-player1`;

export const managePlayer2 = `${endpoint}/manage-player2`;

export const manageRoom = `${endpoint}/manage-room`;

export const allRoom = `${endpoint}/all-room`;

export const chooseP2 = `${endpoint}/choose-p2`;

export const managePokemon = `${endpoint}/manage-pokemon`;

export const getIP = `${endpoint}/get-ip`;

