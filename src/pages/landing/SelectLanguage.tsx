import { useI18n } from "@amoutonbrady/solid-i18n";
import { createSignal } from "solid-js";
import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";
import Button from "../../components/common/Button";
import { TransitionFade, useTransitionContext } from "../../context/TransitionContext";

export const LANGUAGE_KEY = "language";
export const ENGLISH_SIGNATURE = "en";
export const THAI_SIGNATURE = "th";

function SelectLanguage() {
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
