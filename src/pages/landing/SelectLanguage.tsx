import { useI18n } from "@amoutonbrady/solid-i18n";
import { Link } from "solid-app-router";
import { createSignal } from "solid-js";
import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";
import Button from "../../components/common/Button";

function SelectLanguage() {
  const [, { locale }] = useI18n();
  const [page, setPage] = createSignal<number>(0);
  const [t] = useTranslation("landing");

  const handleClick = (language: string) => {
    locale(language);
    localStorage.setItem("language", language);
    setPage(1);
  };

  return (
    <>
      {page() === 0 ? (
        <>
          <h5 class="mb-[15.5px]">Please choose a language</h5>
          <Button onClick={() => handleClick("th")}>ภาษาไทย</Button>
          <Button onClick={() => handleClick("en")}>ENGLISH</Button>
        </>
      ) : (
        <Link class="flex-grow w-full flex justify-center items-center" href="/landing">
          <Typography variant="h5">{t("sound")}</Typography>
        </Link>
      )}
    </>
  );
}

export default SelectLanguage;
