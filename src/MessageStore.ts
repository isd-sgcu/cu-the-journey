/* eslint-disable no-shadow */

export const StorableKeys = {
  Nickname: "Nickname",
  ID: "ID",
  Email: "Email",
  Scene6S3: "Scene6S3",
  Scene8S2: "Scene8S2",
  Scene14S1: "Scene14S1",
  Scene16S0: "Scene16S0",
  Scene19S1: "Scene19S1",
  TimeCapsule: "TimeCapsule",
  CurrentPath: "CurrentPath",
  LastSeenPath: "LastSeenPath",
  LanguageKey: "LanguageKey",
};

export const getMessage = (key: string): string | null => localStorage.getItem(key.toString());

export const saveMessage = (key: string, val: string): void => {
  localStorage.setItem(key.toString(), val);
};

export const clearSavedMessages = () => {
  localStorage.clear();
};

// Fancier context below breaks when the page is refreshed so 😒😒😒
// type useMessageStoreType = {
//   getMessage: (key: StorableKeys) => string;
//   setMessage: (key: StorableKeys, val: string) => void;
// };

// import { createSignal, createContext, useContext } from "solid-js";

// const StoreContext = createContext();

// export const MessageStoreProvider = props => {
//   const [texts, setTexts] = createSignal({}),
//     store: useMessageStoreType = {
//       getMessage(key) {
//         const val = texts()[key.toString()];
//         if (val === undefined) return "The value of this key is not yet set.";
//         return val;
//       },
//       setMessage(key, val) {
//         setTexts((prev: Object) => {
//           prev[key.toString()] = val;
//           return prev;
//         });
//       },
//     };
//   return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
// };

// export const useMessageStore = () => useContext(StoreContext) as useMessageStoreType;
