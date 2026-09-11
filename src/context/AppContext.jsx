import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  /** The specification text currently being analyzed or last analyzed */
  specificationText: '',
  /** The full API result object, or null */
  result: null,
  /** Whether an analysis is in progress */
  isAnalyzing: false,
  /** Error message if the analysis failed */
  error: null,
  /** Array of past analysis sessions: { id, timestamp, specificationText, result } */
  history: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'START_ANALYSIS':
      return {
        ...state,
        specificationText: action.payload,
        result: null,
        isAnalyzing: true,
        error: null,
      };
    case 'ANALYSIS_SUCCESS':
      return {
        ...state,
        result: action.payload,
        isAnalyzing: false,
        error: null,
        history: [
          {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            specificationText: state.specificationText,
            result: action.payload,
          },
          ...state.history,
        ],
      };
    case 'ANALYSIS_ERROR':
      return {
        ...state,
        isAnalyzing: false,
        error: action.payload,
      };
    case 'LOAD_FROM_HISTORY':
      return {
        ...state,
        specificationText: action.payload.specificationText,
        result: action.payload.result,
        isAnalyzing: false,
        error: null,
      };
    case 'RESET':
      return {
        ...state,
        specificationText: '',
        result: null,
        isAnalyzing: false,
        error: null,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const startAnalysis = useCallback((text) => {
    dispatch({ type: 'START_ANALYSIS', payload: text });
  }, []);

  const setResult = useCallback((result) => {
    dispatch({ type: 'ANALYSIS_SUCCESS', payload: result });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'ANALYSIS_ERROR', payload: error });
  }, []);

  const loadFromHistory = useCallback((historyItem) => {
    dispatch({ type: 'LOAD_FROM_HISTORY', payload: historyItem });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        startAnalysis,
        setResult,
        setError,
        loadFromHistory,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
