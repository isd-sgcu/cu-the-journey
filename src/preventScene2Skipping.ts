import { useRouter } from "solid-app-router";
import { StorableKeys, getMessage, clearSavedMessages } from "./MessageStore";

const PREVENT_SKIPPING_IGNORE_PATHS = [
  "/",
  "/door-open",
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

// tells if the user skips Scene 2
// Info from Scene 2 is necessary.
export const areScenesSkipped = () => {
  const necessaryKeys = [
    StorableKeys.Nickname,
    StorableKeys.ID,
    StorableKeys.Email,
    StorableKeys.LanguageKey,
  ];
  return necessaryKeys.some(key => getMessage(key) === null);
};

export const restartApp = () => {
  const [, { replace }] = useRouter()!;
  clearSavedMessages();
  replace("/");
};

export const preventScenesSkipping = (currentPath: string) => {
  if (PREVENT_SKIPPING_IGNORE_PATHS.includes(currentPath)) return;
  if (areScenesSkipped()) restartApp();
};
