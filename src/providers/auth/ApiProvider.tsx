import React, { createContext, FC, useMemo, useState } from 'react';

export interface ApiContextValue {
  accessToken?: string;

  setAccessToken(nextAccessToken: string | undefined): void;
}

export const ApiContext = createContext<ApiContextValue>({
  setAccessToken() {},
});

export const ApiProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  const contextValue = useMemo(() => {
    return {
      accessToken,
      setAccessToken,
    };
  }, [accessToken]);

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
