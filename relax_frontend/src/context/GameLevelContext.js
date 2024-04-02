import React, { createContext } from 'react';

export const GameLevelContext = createContext();

export const GameLevelProvider = ({ children }) => {
	// TODO: fetch game levels from backend
	const gameLevels = ["Easy", "Medium", "Hard"];

	return (
		<GameLevelContext.Provider value={ gameLevels }>
			{children}
		</GameLevelContext.Provider>
	);
};