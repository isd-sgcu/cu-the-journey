import { useI18n } from "@amoutonbrady/solid-i18n";
import Button from "../components/common/Button";

function SelectLanguage() {
  const [, { locale }] = useI18n();

  return (
    <>
      <h5 class="mb-[15.5px]">Please choose a language</h5>
      <Button
        onClick={() => {
          locale("th");
          localStorage.setItem("language", "th");
        }}
        href="/i18n"
      >
        ภาษาไทย
      </Button>
      <Button
        onClick={() => {
          locale("en");
          localStorage.setItem("language", "en");
        }}
        href="/i18n"
      >
        ENGLISH
      </Button>
    </>
  );
}

export default SelectLanguage;