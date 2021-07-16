import { createSignal } from "solid-js";
import { Link } from "solid-app-router";

const [count, setCount] = createSignal(0);
const increment = (by = 1) => setCount(count() + by);

const ChoiceButton = props => (
  <div>
    <Link href={props.ref ? props.ref : "/"}>
      <button
        onClick={() => increment(props.by)}
        class="w-[10rem] h-[2rem] mt-[8px] rounded-full cursor-pointer
                  text-md text-purple font-medium font-ChulaC border-[2px] border-purple
                  hover:text-white hover:bg-purple
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1"
      >
        {props.text} {count()}
      </button>
    </Link>
  </div>
);

const ChoiceComponent = props => (
  <>
    <div class="flex h-screen justify-center items-center">
      <div class="flex flex-col items-center min-w-[20rem]">
        <div class="font-Mitr text-center text-xl font-medium text-purple selection:bg-purple selection:text-yellow">
          <h1>วันนี้ของเธอเป็นวันแบบไหน</h1>
        </div>
        <ChoiceButton by={1} text="สวัสดี" ref="/1" />
        <ChoiceButton by={2} text="ชาวไทย" ref="/2" />
        <ChoiceButton by={3} text="เป็นอย่างไรบ้าง Test" />
      </div>
    </div>
  </>
);

export default ChoiceComponent;
