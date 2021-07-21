import { useRouter } from "solid-app-router";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";

function Souvenir() {
  const [t] = useTranslation("souvenir");
  const [router] = useRouter();
  let number = Number(router.query.number) || 0;
  if (number < 0 || number > 6) {
    number = 0;
  }

  return (
    <>
      <div class="flex-grow mt-[23%] mb-4">
        <Typography variant="h2">Your New Journey Begins</Typography>
        <Typography variant="h4" class="mt-2 mb-[18px]">
          {number ? `${t("number", { number: String(number) })}` : t("notChoose")}
        </Typography>

        <Typography>{t(`choices.${number}`)}</Typography>
      </div>

      <div class="mb-[29px] w-full">
        <Typography variant="h6" class="text-sm leading-4 tracking-[0.4px]">
          {t("p1")}
        </Typography>
        <div class="flex mr-5 mt-[22px]">
          <Typography class="text-xs text-[#410C89] text-right self-end flex-grow">
            {t("qr")}
          </Typography>
          <div class="w-[74px] h-[74px] bg-gray-300 ml-[7px]"></div>
        </div>
      </div>
    </>
  );
}

export default Souvenir;
