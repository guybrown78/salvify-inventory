'use client'

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
// import { useSession } from "next-auth/react";
import { SessionUser } from '../_types/types';


type SessionUserContextType = {
	sessionUser:SessionUser | null,
};

const SessionUserContextDefaultValues: SessionUserContextType = {
	sessionUser: null,
};

// Create a context
const SessionUserContext = createContext<SessionUserContextType>(SessionUserContextDefaultValues);

export function useSessionUserContext() {
	return useContext(SessionUserContext);
}

type Props = {
	children: ReactNode;
};

// Create a context provider component
export function SessionUserProvider({ children }: Props) {

  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me");
        const userData = await response.json();
        setSessionUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

	const value = {
		sessionUser
	}
  return (
    <SessionUserContext.Provider value={value}>
      {children}
    </SessionUserContext.Provider>
  );
};