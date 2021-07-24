import { useTranslation } from "../../config/i18n";
import { Routing } from "../../context/TransitionContext";

function index() {
  const [t] = useTranslation("landing");

  return (
    <>
      <img
        src="images/ftj-logo.svg"
        class="w-[79px] h-[79px] self-end mr-5 mb-[29px]"
        alt="ftj-logo"
      />

      <h6 class="text-white" style="text-shadow: 2px 2px #F46C2A;">
        Freshy the Journey เปิดประตูสู่จุฬา
      </h6>
      <h1 class="text-white mt-[35px]" style="text-shadow: 4px 4px #90168B;">
        บันทึกการเดินทาง
      </h1>

      <div class="text-white" style="text-shadow: 4px 4px #5F229F;">
        <h1 class="font-bold text-[144px] mt-[50px]">CU</h1>
        <h1 class="mt-11">The</h1>
        <h1 class="text-[48px]">Journey</h1>
      </div>

      <div class="text-[#F5A7EC] flex justify-center items-center mt-[55px] relative">
        <div class="text-right">
          <h6 class="text-[12px] font-normal leading-[18px]">Free Your Mind,</h6>
          <h6 class="text-[14px] font-semibold">Find Your Ways</h6>
        </div>
        <div class="h-[25px] w-[2px] bg-[#DD7ED2] mx-[11px]" />
        <div class="text-left">
          <h6 class="text-[12px] font-normal leading-[18px]">อิสระทางความคิด</h6>
          <h6 class="text-[14px] font-semibold">สู่ชีวิตในแบบของเรา</h6>
        </div>
        <div class="text-[#F4AE23] font-semibold text-[48px]">
          <p class="absolute left-[-33px] top-[-5px]">“</p>
          <p class="absolute right-[-28px] bottom-[-20px]">”</p>
        </div>
      </div>
      <Routing href="/trigger-warning" class="mt-12 mb-10 text-white">
        <button>{t("tapToContinue")}</button>
      </Routing>
    </>
  );
}

export default index;
