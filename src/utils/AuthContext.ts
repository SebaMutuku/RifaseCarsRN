import React from 'react';
import {SignInData} from "./AppInterfaces";

const AUTH_CONTEXT_ERROR = 'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

export const AuthContext = React.createContext<{
    retrieveToken: (...data: string[]) => void; signIn: (data: SignInData) => void; signUp: (...data: string[]) => void; signOut: () => void; home: ({data}: any) => void; toggleTheme: () => void;
}>({
    retrieveToken: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, signIn: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, signUp: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, signOut: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, home: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }, toggleTheme: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    },

});

