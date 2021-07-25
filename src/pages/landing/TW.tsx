import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";

function tw() {
  const [t] = useTranslation("landing.tw");
  return (
    <>
      <h3 class="mt-6">{t("title")}</h3>
      <Typography class="mt-[22px] xs:text-[14px]">{t("p1")}</Typography>
      <div class="bg-white max-w-[333px] rounded-[20px] w-[95%] mt-8 mb-6">
        <Typography class="font-bold text-[14px] leading-[17.5px] tracking-[0.5px] my-3 mx-1 xs:text-[12px] ">
          {t("p2")}
        </Typography>
      </div>
    </>
  );
}

export default tw;
