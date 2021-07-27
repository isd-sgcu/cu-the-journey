import { useI18n } from "@amoutonbrady/solid-i18n";
import { createSignal, onCleanup, onMount } from "solid-js";
import Swal from "sweetalert2";
import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";
import Button from "../../components/common/Button";
import { TransitionFade, useTransitionContext } from "../../context/TransitionContext";
import { ENGLISH_SIGNATURE, isEnglish, THAI_SIGNATURE } from "../TextReplacer";
import { getMessage, clearSavedMessages, StorableKeys } from "../../MessageStore";

const wasNotFinished = () => {
  // If these are saved = was here before
  const wasHereIdentifierKeys = [
    StorableKeys.Nickname,
    StorableKeys.ID,
    StorableKeys.Email,
    StorableKeys.LanguageKey,
  ];
  if (wasHereIdentifierKeys.some(key => getMessage(key) === null)) return false;
  const lastSeenPath = getMessage(StorableKeys.LastSeenPath);
  if (lastSeenPath === null || lastSeenPath === "*all") return false;
  return lastSeenPath !== "/";
};

const resumeIfWantTo = () => {
  const { fadeOut } = useTransitionContext()!;

  Swal.fire({
    text: isEnglish()
      ? "It looks like you did not finish last time.\nDo you want to continue where you left off?"
      : "เหมือนว่าคุณยังเล่นไม่จบครั้งที่แล้วนะ\nอยากเริ่มต่อจากครั้งที่แล้วไหม?",
    icon: "question",
    showCancelButton: true,
    width: 325,
  }).then(result => {
    if (result.isConfirmed) {
      fadeOut(getMessage(StorableKeys.LastSeenPath) as string, true);
    } else clearSavedMessages();
  });
};

function SelectLanguage() {
  if (wasNotFinished()) resumeIfWantTo();

  const [, { locale }] = useI18n();
  const [page, setPage] = createSignal<number>(0);
  const [t] = useTranslation("landing");
  const { scheduleFrame, cancelPrevented, nextAnimationTrigger, resetAnimationFrame } =
    useTransitionContext(true);

  const handleClick = (language: string) => {
    locale(language);
    localStorage.setItem(StorableKeys.LanguageKey, language);
    setPage(1);
    nextAnimationTrigger();
    cancelPrevented();
  };

  onMount(() => scheduleFrame(1, 1));

  onCleanup(() => resetAnimationFrame());

  return (
    <>
      {page() === 0 ? (
        <TransitionFade order={0}>
          <h5 class="mb-[15.5px]">Please choose a language</h5>
          <Button onClick={() => handleClick(THAI_SIGNATURE)}>ภาษาไทย</Button>
          <Button onClick={() => handleClick(ENGLISH_SIGNATURE)}>ENGLISH</Button>
        </TransitionFade>
      ) : (
        <div class="flex-grow w-full flex justify-center items-center">
          <TransitionFade order={1}>
            <Typography variant="h5">{t("sound")}</Typography>
          </TransitionFade>
        </div>
      )}
    </>
  );
}

export default SelectLanguage;
