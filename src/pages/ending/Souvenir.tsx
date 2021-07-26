import { useRouter } from "solid-app-router";
import firebase from "firebase/app";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";
import { clearSavedMessages, getMessage, StorableKeys, saveMessage } from "../../MessageStore";
import Title from "../../components/souvenir/Title";
import OpenQrButton from "../../components/souvenir/OpenQrButton";

const headlineColor = ["#884BC1", "#A8249D", "#884BC1", "#B74AAB", "#A8249D", "#008E3C", "#B74AAB"];
const bodyColor = ["#410C89", "#58026F", "#410C89", "#FFFFFF", "#58026F", "#DEF5E4", "#FFFFFF"];
const QrColor = ["#410C89", "#71067B", "#410C89", "#71067B", "#71067B", "#008E3C", "#71067B"];
const QrBorderColor = ["#410C89", "#58026F", "#410C89", "#58026F", "#58026F", "#DEF5E4", "#58026F"];

function Souvenir() {
  // clear all saved messages here
  const lang = getMessage(StorableKeys.LanguageKey) as string;
  clearSavedMessages();
  saveMessage(StorableKeys.LanguageKey, lang);
  firebase.analytics().logEvent("screen_view");

  const [t] = useTranslation("souvenir");
  const [router] = useRouter()!;
  let number = Number(router.query.number) || 0;
  if (number < 0 || number > 6) {
    number = 0;
  }

  return (
    <div
      class="flex flex-col flex-grow items-center w-full max-w-[327px]"
      style={`background: linear-gradient(180deg, rgba(245, 167, 236, 0.8) 0%, rgba(245, 170, 143, 0.8) 74.48%, rgba(249, 210, 134, 0.8) 100%);`}
    >
      {/* Title and logo */}
      <img
        src="images/ftj-logo.svg"
        class="w-[55px] h-[55px] self-start mr-5 mt-[25px] mb-[5px]"
        alt="ftj-logo"
      />
      <Title number={number} fill={headlineColor[number]} language={lang} />

      {/* Content */}
      <div class="flex-grow mb-4 flex items-center relative w-full justify-center">
        <Typography
          class="text-[14px] leading-[22px] xs:text-[12px]"
          style={`color:${bodyColor[number]}`}
        >
          {t(`choices.${number}`)}
        </Typography>

        <div class="text-white">
          <h1 class="absolute left-[5px] top-[10px]">“</h1>
          <h1 class="absolute right-[5px] bottom-[0px]">”</h1>
        </div>
      </div>

      {/* Footer */}
      <div class="mb-[20px] w-full">
        <Typography
          variant="h6"
          class="text-sm leading-4 tracking-[0.4px] xs:text-[12px]"
          style={`color:${bodyColor[number]}`}
        >
          {t("p1")}
        </Typography>

        {/* Desktop */}
        <div class=" mt-[22px] hidden lg:flex">
          <Typography
            class="text-xs text-right self-end flex-grow mb-[4px]"
            style={`color:${bodyColor[number]}`}
          >
            {t("qr")}
          </Typography>
          <img src="images/line-qr.png" class="w-[80px] h-[80px] ml-[7px]" />
        </div>

        {/* Mobile */}
        <div class="flex mt-[41px] lg:hidden xs:mt-[25px] items-center">
          <Typography
            class="text-xs text-right flex-grow xs:text-[10px]"
            style={`color:${QrBorderColor[number]}`}
          >
            {t("qrMobile")}
          </Typography>
          <a href="https://line.me/R/ti/p/%40594hejnh" class="ml-[9px]">
            <OpenQrButton qrColor={QrColor[number]} borderColor={QrBorderColor[number]} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Souvenir;
