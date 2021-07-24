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

const MESSAGE_NOT_FOUND = "NOT FOUND";
const IGNORE_PATHS = [
  "/",
  "/landing",
  "/poc-transition",
  "/trigger-warning",
  "/inspired-by-DAE",
  "/2-0",
  "/27-0",
  "/28-0",
  "/29-0",
  "/pick-a-number",
  "/souvenir",
];

export const getMessage = (key: StorableKeys): string => {
  const value = localStorage.getItem(key.toString());
  if (value === null) return MESSAGE_NOT_FOUND;
  return value;
};

export const saveMessage = (key: StorableKeys, val: string): void => {
  localStorage.setItem(key.toString(), val);
};

export const clearSavedMessages = () => {
  localStorage.clear();
};

// tells if the user skips Scene 2
// Info from Scene 2 is necessary.
export const areScenesSkipped = () => {
  const necessaryKeys = [StorableKeys.Nickname, StorableKeys.ID, StorableKeys.Email];
  return necessaryKeys.some(key => getMessage(key) === MESSAGE_NOT_FOUND);
};

export const restartApp = () => {
  clearSavedMessages();
  location.href = "/landing"; // eslint-disable-line
};

export const preventScenesSkipping = (currentPath: string) => {
  if (IGNORE_PATHS.includes(currentPath)) return;
  if (areScenesSkipped()) restartApp();
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
