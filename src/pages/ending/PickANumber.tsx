import { Index } from "solid-js";
import { Routing } from "../../context/TransitionContext";
import { useTranslation } from "../../config/i18n";
import Typography from "../../components/common/Typography";

function Choice({ number }: { number: number }) {
  return (
    <Routing href={`/souvenir?number=${number}`} class="m-2">
      <button
        class="w-[91px] h-[91px] flex items-center justify-center bg-white hover:bg-purple-light shadow-normal hover:shadow-hover"
        style=""
      >
        <h1>{number}</h1>
      </button>
    </Routing>
  );
}

function PickANumber() {
  const [t] = useTranslation("pickANumber");
  return (
    <>
      <div class="flex-grow flex flex-col items-center justify-center xs:mt-6">
        <Typography variant="h6" class="leading-[20px] mb-6">
          {t("p1")}
        </Typography>
        <div class="flex flex-wrap justify-center max-w-[375px]">
          <Index each={Array(6)}>{(_, idx) => <Choice number={idx + 1} />}</Index>
        </div>

        <Routing href="/souvenir" class="mt-5">
          <Typography variant="h6" class="underline text-[14px] cursor-pointer">
            {t("p2")}
          </Typography>
        </Routing>
      </div>
      <Typography class="mb-[28px] text-[#90168B] xs:mb-[20px]">{t("footer")}</Typography>
    </>
  );
}

export default PickANumber;
