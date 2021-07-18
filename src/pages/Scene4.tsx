import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";

const { TextMiddle } = TextComponent;

const Scene4S1: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอรู้สึกอย่างไรกับการเดินทางครั้งใหม่ที่กำลังจะเริ่มขึ้น"
      choices={[
        ["ตื่นเต้น", "/4-1-1"],
        ["กังวลใจ", "/4-1-2"],
        ["เฉย ๆ", "/4-2"],
        ["สับสนวุ่นวายใจ", "/4-1-2"]
      ]}
    />
    <PrevScene page="/3-4" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S1S1: Component = () => (
  <>
    <TextMiddle text={["เป็นเรื่องปกติที่เราจะต้องรู้สึกตื่นเต้น", "กับการเดินทางครั้งใหม่"]} />
    <PrevScene page="/4-1" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S1S2: Component = () => (
  <>
    <TextMiddle text={["อย่าพึ่งคิดมากไปเลยนะ", "เธอผ่านมันไปได้อยู่แล้วแหละ"]} />
    <PrevScene page="/4-1" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S2: Component = () => (
  <>
    <TextMiddle
      text={["แต่ไม่ว่าเธอจะรู้สึกอย่างไร", "การเดินทางครั้งใหม่นี้ก็ได้เริ่มขึ้นแล้ว"]}
    />
    <PrevScene page="/4-1" />
    <NextScene page="/5-0" />
  </>
);

const Scene4 = {
  Scene4S1,
  Scene4S1S1,
  Scene4S1S2,
  Scene4S2
};

export default Scene4;
