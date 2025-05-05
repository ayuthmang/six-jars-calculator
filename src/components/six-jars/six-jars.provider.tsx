import {
  useSixJarsReducer,
  type SixJarsActions,
  type SixJarsState,
} from "@/components/six-jars/six-jars.reducer";
import { createContext, useContext } from "react";

type SixJarContextType = {
  state: SixJarsState;
  dispatch: React.Dispatch<SixJarsActions>;
};
const SixJarsContext = createContext<SixJarContextType | null>(null);

function useSixJarsContext() {
  const context = useContext(SixJarsContext);
  if (!context) {
    throw new Error("useSixJarsContext must be used within a SixJarsProvider");
  }

  return context;
}

function SixJarsProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useSixJarsReducer();

  return (
    <SixJarsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SixJarsContext.Provider>
  );
}

export { useSixJarsContext, SixJarsProvider, SixJarsContext };
