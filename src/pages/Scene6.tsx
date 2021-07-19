import type { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { NextScene, PrevScene, currentPage } from "../components/JumpTo";
import TextComponent from "../components/Text";

const { TextMiddle, TextBold } = TextComponent;

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
  return (
    <>
      <TextBold text={["การเดินทางในช่วงเวลานั้น", "เป็นอย่างไรบ้าง"]} />
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

const Scene6: Component = () => <Dynamic component={referPage["6-0"]} />;

export default Scene6;
