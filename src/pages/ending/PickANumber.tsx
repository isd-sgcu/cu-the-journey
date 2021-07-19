import { Link } from "solid-app-router";
import { Index } from "solid-js";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";

function Choice({ number }: { number: number }) {
  return (
    <Link href={`/souvenir?number=${number}`} class="m-2">
      <button
        class="w-[91px] h-[91px] flex items-center justify-center bg-white hover:bg-purple-light"
        style="box-shadow: 0px 4px 8px -2px #A984D4;"
      >
        <h1>{number}</h1>
      </button>
    </Link>
  );
}

function PickANumber() {
  const [t] = useTranslation("pickANumber");
  return (
    <>
      <div class="flex-grow flex flex-col items-center justify-center ">
        <Typography variant="h6">{t("p1")}</Typography>
        <Typography variant="h6" class="mt-3 mb-6">
          {t("p2")}
        </Typography>

        <div class="flex flex-wrap justify-center max-w-[375px]">
          <Index each={Array(6)}>{(_, idx) => <Choice number={idx + 1} />}</Index>
        </div>

        <Link href="/souvenir" class="mt-5">
          <Typography variant="h6" class="underline">
            {t("p3")}
          </Typography>
        </Link>
      </div>
      <Typography variant="p" class="mb-3 text-orange">
        {t("footer")}
      </Typography>
    </>
  );
}

export default PickANumber;
