import { useRouter } from "solid-app-router";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";

const headlineColor = ["#5F229F", "#0E8516", "#884BC1", "#B74AAB", "#0E8516", "#007E31", "#B74AAB"];
const bodyColor = ["#410C89", "#006706", "#5F229F", "#90168B", "#006706", "#006021", "#90168B"];

function Souvenir() {
  const [t] = useTranslation("souvenir");
  const [router] = useRouter()!;
  let number = Number(router.query.number) || 0;
  if (number < 0 || number > 6) {
    number = 0;
  }

  return (
    <div class={`flex flex-col flex-grow items-center w-full text-[${headlineColor[number]}]`}>
      <Typography variant="h2" class="mt-[19%]">
        Your New Journey Begins
      </Typography>
      <Typography variant="h4" class="mt-2 mb-[18px]">
        {number ? `${t("number", { number: String(number) })}` : t("notChoose")}
      </Typography>

      <div class="flex-grow mb-4 flex items-center">
        <Typography class={`text-[14px]  text-[${bodyColor[number]}]`}>
          {t(`choices.${number}`)}
        </Typography>
      </div>

      <div class="mb-[29px] w-full">
        <Typography variant="h6" class="text-sm leading-4 tracking-[0.4px]">
          {t("p1")}
        </Typography>
        <div class="flex mr-5 mt-[22px]">
          <Typography class={`text-xs text-right self-end flex-grow text-[${bodyColor[number]}]`}>
            {t("qr")}
          </Typography>
          <div class="w-[74px] h-[74px] bg-gray-300 ml-[7px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Souvenir;
