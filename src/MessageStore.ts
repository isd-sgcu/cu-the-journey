/* eslint-disable no-shadow */

export enum StorableKeys {
  // keys are used to identify the texts
  Nickname,
  ID,
  Email,
  Scene6S3,
  Scene8S2,
  Scene14S1,
  Scene16S0,
  Scene19S1,
  TimeCapsule,
}

export const getMessage = (key: StorableKeys): string => {
  const value = localStorage.getItem(key.toString());
  if (value === null) return "The value of this key is not yet set.";
  return value;
};

export const saveMessage = (key: StorableKeys, val: string): void => {
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
