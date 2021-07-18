import { Link } from "solid-app-router";
import { Index } from "solid-js";

function Choice({ number }: { number: number }) {
  return (
    <Link href={`/souvenir?number=${number}`} class="m-2">
      <button
        class="w-[91px] h-[91px] flex items-center justify-center"
        style="box-shadow: 0px 4px 8px -2px #A984D4;"
      >
        <h1>{number}</h1>
      </button>
    </Link>
  );
}

function PickANumber() {
  return (
    <>
      <div class="flex-grow flex flex-col items-center justify-center ">
        <h6>ก่อนเริ่มต้นการเดินทางครั้งใหม่เพื่อสีสัน</h6>
        <h6>ของการเดินทางครั้งนี้</h6>
        <h6 class="mt-3 mb-6">เธอลองเลือกมาสักหมายเลขสิ</h6>

        <div class="flex flex-wrap justify-center max-w-[375px]">
          <Index each={Array(6)}>{(_, idx) => <Choice number={idx + 1} />}</Index>
        </div>

        <Link href="/souvenir" class="mt-20 xs:mt-5">
          <h6 class="underline">เพื่อความตื่นเต้นขอไม่เลือกดีกว่า</h6>
        </Link>
      </div>
      <p class="mb-3 text-orange">*อย่าลืม Capture หน้าถัดไป เพื่อ.....</p>
    </>
  );
}

export default PickANumber;
