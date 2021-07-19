import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";

const { TextMiddle } = TextComponent;

const Scene3S0: Component = () => (
  <>
    <TextMiddle
      text={[
        "วันนี้เป็นวันพักผ่อนวันหนึ่งของ(name)",
        "ที่กำลังพักผ่อนจากการเดินทาง",
        "อันแสนเหน็ดเหนื่อยที่ผ่านมา"
      ]}
    />
    <PrevScene page="/3-0" />
    <NextScene page="/3-1" />
  </>
);

const Scene3S1: Component = () => (
  <>
    <ChoiceComponent
      question="วันนี้ของเธอเป็นวันแบบไหน"
      choices={[
        ["วันที่ฝนฟ้าคะนอง", "3-2"],
        ["วันที่ฟ้าสดใส", "3-2"],
        ["วันที่แดดจ้า", "3-2"],
        ["วันที่ฝนเพิ่งหยุดตก", "3-2"]
      ]}
    />
    <PrevScene page="/3-0" />
    <NextScene page="/3-2" />
  </>
);

const Scene3S2: Component = () => (
  <>
    <TextMiddle text={["เธอนึกขึ้นได้ว่ายังไม่ได้เปิดซองจดหมาย", "ที่รับมาเมื่อเช้า"]} />
    <PrevScene page="/3-1" />
    <NextScene page="/3-3" />
  </>
);

const Scene3S3: Component = () => (
  <>
    <ChoiceComponent
      question="เธอเก็บซองจดหมายไว้ที่ไหนกันนะ"
      choices={[
        ["บนโต๊ะทำงาน", "/3-4"],
        ["บนโต๊ะกินช้าว", "/3-4"],
        ["บนเตียงนอน", "/3-4"],
        ["ในลิ้นชัก", "/3-4"],
        ["อยู่ไหนก็ไม่รู้", "/3-3-1"]
      ]}
    />
    <PrevScene page="/3-2" />
    <NextScene page="/3-4" />
  </>
);

const Scene3S3S1: Component = () => (
  <>
    <TextMiddle text={["ลองหาดูใหม่สิ...", "นั่นไง! เธอเจอมันแล้ว!"]} />
    <PrevScene page="/3-3" />
    <NextScene page="/3-4" />
  </>
);

const Scene3S4: Component = () => (
  <>
    <TextMiddle text="เธอเดินไปหยิบจดหมายมาเปิดอ่าน" />
    <PrevScene page="/3-3" />
    <NextScene page="/4-1" />
  </>
);

const Scene3 = {
  Scene3S0,
  Scene3S1,
  Scene3S2,
  Scene3S3,
  Scene3S3S1,
  Scene3S4
};

export default Scene3;
