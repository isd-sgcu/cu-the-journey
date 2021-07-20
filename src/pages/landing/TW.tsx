import { Link } from "solid-app-router";
import Typography from "../../components/common/Typography";
import { useTranslation } from "../../config/i18n";

function tw() {
  const [t] = useTranslation("landing.tw");
  return (
    <Link
      href="/inspired-by-DAE"
      class="flex flex-col flex-grow w-full justify-center items-center"
    >
      <h3>{t("title")}</h3>
      <Typography class="mt-[22px]">{t("p1")}</Typography>
      <div class="bg-white max-w-[333px] rounded-[20px] w-[95%] mt-8">
        <Typography class="font-bold text-[14px] leading-[17.5px] tracking-[0.5px] my-3 mx-1">
          {t("p2")}
        </Typography>
      </div>
    </Link>
  );
}

export default tw;
