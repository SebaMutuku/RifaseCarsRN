import React from 'react';

const AUTH_CONTEXT_ERROR = 'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

export const AuthContext = React.createContext<{
    retrieveToken: (...data: string[]) => void; signIn: (token: string) => void; signOut: () => void; toggleTheme: () => void;
}>({
    retrieveToken: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, signIn: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, signOut: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, toggleTheme: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    },

});

