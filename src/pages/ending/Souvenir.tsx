import { Link, useRouter } from "solid-app-router";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";

const headlineColor = ["#5F229F", "#0E8516", "#884BC1", "#B74AAB", "#0E8516", "#007E31", "#B74AAB"];
const bodyColor = ["#410C89", "#006706", "#5F229F", "#90168B", "#006706", "#006021", "#90168B"];
const QrColor = ["#EADBFB", "#9BE097", "#D0B6EF", "#F5A7EC", "#9BE097", "#BCE9C7", "#F5A7EC"];

function Souvenir() {
  const [t] = useTranslation("souvenir");
  const [router] = useRouter()!;
  let number = Number(router.query.number) || 0;
  if (number < 0 || number > 6) {
    number = 0;
  }

  const OpenQrImage = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.33333 3.33333V26.6667H26.6667V15H30V26.6667C30 28.5 28.5 30 26.6667 30H3.33333C1.48333 30 0 28.5 0 26.6667V3.33333C0 1.5 1.48333 0 3.33333 0H15V3.33333H3.33333ZM18.3333 3.33333V0H30V11.6667H26.6667V5.68333L10.2833 22.0667L7.93333 19.7167L24.3167 3.33333H18.3333Z"
        fill={QrColor[number]}
      />
    </svg>
  );

  return (
    <div
      class="flex flex-col flex-grow items-center w-full"
      style={`color:${headlineColor[number]}`}
    >
      <Typography variant="h2" class="mt-[19%] xs:text-[20px]">
        Your New Journey Begins
      </Typography>
      <Typography variant="h4" class="mt-2 mb-[18px] xs:text-[16px]">
        {number ? `${t("number", { number: String(number) })}` : t("notChoose")}
      </Typography>

      <div class="flex-grow mb-4 flex items-center">
        <Typography
          class="text-[14px] leading-[22px] xs:text-[12px]"
          style={`color:${bodyColor[number]}`}
        >
          {t(`choices.${number}`)}
        </Typography>
      </div>

      <div class="mb-[29px] w-full">
        <Typography variant="h6" class="text-sm leading-4 tracking-[0.4px]  xs:text-[12px]">
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
        <div class="flex mt-[68px] lg:hidden  xs:mt-[25px]">
          <Typography
            class="text-xs text-right self-end flex-grow xs:text-[10px]"
            style={`color:${bodyColor[number]}`}
          >
            {t("qrMobile")}
          </Typography>
          <Link href="https://line.me/R/ti/p/%40594hejnh">
            <div class="w-[30px] h-[30px] ml-[13px]">
              <OpenQrImage />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Souvenir;
