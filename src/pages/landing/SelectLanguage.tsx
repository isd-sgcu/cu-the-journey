import { useI18n } from "@amoutonbrady/solid-i18n";
import { createSignal } from "solid-js";
import swal from "sweetalert";
import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";
import Button from "../../components/common/Button";
import { TransitionFade, useTransitionContext } from "../../context/TransitionContext";
import { StorableKeys } from "../AllScenes";
import { getMessage, isEnglish, clearSavedMessages } from "../TextReplacer";

export const LANGUAGE_KEY = "language";
export const ENGLISH_SIGNATURE = "en";
export const THAI_SIGNATURE = "th";

const wasNotFinished = () => {
  // If these are saved = was here before
  const wasHereIdentifierKeys = [
    StorableKeys.Nickname,
    StorableKeys.ID,
    StorableKeys.Email,
    LANGUAGE_KEY as unknown as StorableKeys, // so that it can be passed into the function
  ];
  if (wasHereIdentifierKeys.some(key => getMessage(key) === null)) return false;
  const lastSeenPath = getMessage(StorableKeys.LastSeenPath);
  if (lastSeenPath === null) return false;
  return lastSeenPath !== "/";
};

const resumeIfWantTo = () => {
  const { fadeOut } = useTransitionContext()!;

  swal({
    title: "",
    text: isEnglish()
      ? "It looks like you did not finish last time.\nDo you want to continue where you left off?"
      : "เหมือนว่าคุณยังเล่นไม่จบครั้งที่แล้วนะ\nอยากเริ่มต่อจากครั้งที่แล้วไหม?",
    icon: "warning",
    buttons: true as unknown as [boolean], // this can actually be a boolean
    dangerMode: true,
  }).then(willDelete => {
    if (willDelete) {
      // eslint-disable-next-line
      console.log(
        "🤷‍♂️👍👍👍 | getMessage(StorableKeys.LastSeenPath)",
        getMessage(StorableKeys.LastSeenPath),
      );
      // TODO wrong path!!!
      fadeOut(getMessage(StorableKeys.LastSeenPath) as string);
    } else clearSavedMessages();
  });
};

function SelectLanguage() {
  if (wasNotFinished()) resumeIfWantTo();

  const [, { locale }] = useI18n();
  const [page, setPage] = createSignal<number>(0);
  const [t] = useTranslation("landing");
  const { fadeOut, nextAnimationTrigger } = useTransitionContext();

  const handleClick = (language: string) => {
    locale(language);
    localStorage.setItem(LANGUAGE_KEY, language);
    setPage(1);
    nextAnimationTrigger();
    setTimeout(() => fadeOut("/door-open"), 2000);
  };

  return (
    <>
      {page() === 0 ? (
        <TransitionFade order={0}>
          <h5 class="mb-[15.5px]">Please choose a language</h5>
          <Button onClick={() => handleClick(THAI_SIGNATURE)}>ภาษาไทย</Button>
          <Button onClick={() => handleClick(ENGLISH_SIGNATURE)}>ENGLISH</Button>
        </TransitionFade>
      ) : (
        <div
          class="flex-grow w-full flex justify-center items-center"
          onClick={() => fadeOut("/door-open")}
        >
          <TransitionFade order={1}>
            <Typography variant="h5">{t("sound")}</Typography>
          </TransitionFade>
        </div>
      )}
    </>
  );
}

export default SelectLanguage;
