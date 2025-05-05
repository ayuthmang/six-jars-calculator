import { toFixed } from "@/utils/number";
import { useReducer } from "react";

/*
const MAX_CONFIG_VALUE = 1;
const MIN_CONFIG_VALUE = 0;
 */

export type SixJarsActions =
  | { type: "SET_INCOME"; value: number }
  | { type: "SET_NECESSITIES"; value: number }
  | { type: "SET_EDUCATION"; value: number }
  | { type: "SET_LONGTERMSAVINGS"; value: number }
  | { type: "SET_FINANCIALFREEDOM"; value: number }
  | { type: "SET_PLAY"; value: number }
  | { type: "SET_GIVE"; value: number }
  | { type: "RESET" }
  | { type: "CALC_SUMMARY" };

export type SixJarsState = {
  config: {
    income: number;
    necessities: number;
    education: number;
    longTermSavings: number;
    financialFreedom: number;
    play: number;
    give: number;
  };
  summary: {
    necessities: number;
    education: number;
    longTermSavings: number;
    financialFreedom: number;
    play: number;
    give: number;
    total: number;
  };
};

export const defaultJarsState: SixJarsState = {
  config: {
    income: 0,
    necessities: 0.55,
    education: 0.1,
    longTermSavings: 0.1,
    financialFreedom: 0.1,
    play: 0.1,
    give: 0.05,
  },
  summary: {
    necessities: 0,
    education: 0,
    longTermSavings: 0,
    financialFreedom: 0,
    play: 0,
    give: 0,
    total: 0,
  },
};

export const defaultConfig = {};

export const sixJarsReducer = (
  state: typeof defaultJarsState,
  action: SixJarsActions
): SixJarsState => {
  switch (action.type) {
    case "SET_INCOME":
      return { ...state, config: { ...state.config, income: action.value } };
    case "SET_NECESSITIES":
      return {
        ...state,
        config: { ...state.config, necessities: action.value },
      };
    case "SET_EDUCATION":
      return { ...state, config: { ...state.config, education: action.value } };
    case "SET_LONGTERMSAVINGS":
      return {
        ...state,
        config: { ...state.config, longTermSavings: action.value },
      };
    case "SET_FINANCIALFREEDOM":
      return {
        ...state,
        config: { ...state.config, financialFreedom: action.value },
      };
    case "SET_PLAY":
      return { ...state, config: { ...state.config, play: action.value } };
    case "SET_GIVE":
      return { ...state, config: { ...state.config, give: action.value } };
    case "RESET":
      return {
        config: {
          ...defaultJarsState.config,
          income: state.config.income,
        },
        summary: { ...defaultJarsState.summary },
      };
    case "CALC_SUMMARY":
      const {
        income,
        necessities,
        education,
        longTermSavings,
        financialFreedom,
        play,
        give,
      } = state.config;

      const nextNecessities = toFixed(necessities * income);
      const nextEducation = toFixed(education * income);
      const nextLongTermSavings = toFixed(longTermSavings * income);
      const nextFinancialFreedom = toFixed(financialFreedom * income);
      const nextPlay = toFixed(play * income);
      const nextGive = toFixed(give * income);
      const nextTotal = toFixed(
        nextNecessities +
          nextEducation +
          nextLongTermSavings +
          nextFinancialFreedom +
          nextPlay +
          nextGive
      );

      return {
        ...state,
        summary: {
          necessities: nextNecessities,
          education: nextEducation,
          longTermSavings: nextLongTermSavings,
          financialFreedom: nextFinancialFreedom,
          play: nextPlay,
          give: nextGive,
          total: nextTotal,
        },
      };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export function useSixJarsReducer(
  initialState: SixJarsState = defaultJarsState
) {
  const [state, dispatch] = useReducer(sixJarsReducer, initialState);
  return { state, dispatch };
}
