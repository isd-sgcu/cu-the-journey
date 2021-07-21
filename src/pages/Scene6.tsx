import { Component, createSignal, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { NextScene, PrevScene, currentPage } from "../components/JumpTo";
import TextComponent from "../components/Text";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";

const { TextMiddle } = TextComponent;

const Scene6S0: Component = () => (
  <>
    <TextMiddle text={["เธอเริ่มเปิดสมุดบันทึกการเดินทางเล่มนั้น"]} />
    <PrevScene pg="6-0" />
    <NextScene pg="6-1" />
  </>
);

const Scene6S1: Component = () => (
  <>
    <TextMiddle text={["เธอเปิดสมุดไปหน้าบันทึกการเดิน", "ครั้งล่าสุด"]} />
    <PrevScene pg="6-0" />
    <NextScene pg="6-2" />
  </>
);

const Scene6S2: Component = () => (
  <>
    <TextMiddle text={["เธอพบบันทึกการเดินทางช่วงก่อนเข้า", "มหาวิทยาลัยของเธอ"]} />
    <PrevScene pg="6-1" />
    <NextScene pg="6-3" />
  </>
);

const Scene6S3: Component = () => {
  console.log(currentPage());
  const placeHolder = "ลองเล่าให้ฟังได้ไหม...";
  const [text, setText] = createSignal("");

  const [isButtonShown, setIsButtonShown] = createSignal(true);

  const proceed = () => {
    setIsButtonShown(false);
    document.querySelector("body").onclick = () => {
      alert(`Going to the next scene with save text\n${text()}`);
    }; // TODO go to the next scene
  };

  return (
    <>
      <div class="flex h-screen justify-center items-center flex-col space-y-[25px]">
        <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
          <h5>
            การเดินทางในช่วงเวลานั้น
            <br />
            เป็นอย่างไรบ้าง
          </h5>
        </div>
        <InputBox placeHolder={placeHolder} signal={[text, setText]} />
        <Show when={isButtonShown()} fallback={() => <h5>{"<< แตะเพื่อไปต่อ >>"}</h5>}>
          <Button children="บันทึก" onClick={proceed} />
        </Show>
      </div>
      <PrevScene pg="6-2" />
      <NextScene pg="6-4" />
    </>
  );
};

const Scene6S4: Component = () => (
  <>
    <TextMiddle text={["เก่งมาก ๆ เลยนะ (name)", "ที่ผ่านเรื่องราวทุกอย่างมาได้"]} />
    <PrevScene pg="6-3" />
    <NextScene pg="7-0" />
  </>
);

const referPage = {
  "6-0": Scene6S0,
  "6-1": Scene6S1,
  "6-2": Scene6S2,
  "6-3": Scene6S3,
  "6-4": Scene6S4
};

const Scene6: Component = () => <Dynamic component={referPage["6-3"]} />;

export default Scene6;
