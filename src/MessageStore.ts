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
