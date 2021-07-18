import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";

const { TextMiddle } = TextComponent;

const Scene5S0: Component = () => (
  <>
    <TextMiddle text={["เธอเริ่มเตรียมตัวสำหรับการเดินทาง", "ครั้งใหม่นี้"]} />
    <PrevScene page="/4-2" />
    <NextScene page="/5-1" />
  </>
);

const Scene5S1: Component = () => (
  <>
    <TextMiddle text={["เธอเตรียมของที่จำเป็นใส่กระเป๋า"]} />
    <PrevScene page="/5-0" />
    <NextScene page="/5-2" />
  </>
);

const Scene5S2: Component = () => (
  <>
    <TextMiddle
      text={[
        "เธอบังเอิญไปเจอสมุดบันทึก",
        "การเดินทางของเธอ",
        "",
        "บันทึกที่ถูกเก็บรักษาอย่างดี",
        "โดยกาลเวลา"
      ]}
    />
    <PrevScene page="/5-1" />
    <NextScene page="/5-3" />
  </>
);

const Scene5S3: Component = () => (
  <>
    <TextMiddle
      text={["ลองให้กาลเวลาพาเธอย้อนกลับไปดู", "การเดินทางที่ผ่านมา", "ของเธอกันสักหน่อยดีไหม"]}
    />
    <PrevScene page="/5-2" />
    <NextScene page="/5-4" />
  </>
);

const Scene5S4: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอพร้อมที่จะย้อนกลับไปแล้วใช่ไหม"
      choices={[
        ["พร้อม", "/6-0"],
        ["ไม่พร้อม", "/5-5-1"]
      ]}
    />
    <PrevScene page="/5-3" />
    <NextScene page="/6-0" />
  </>
);

const Scene5S5S1: Component = () => (
  <>
    <TextMiddle
      text={[
        "ท่ามกลางเรื่องราวไม่ดีในอดีต",
        "อาจจะมีสิ่งดีดีซ่อนอยู่ก็ได้",
        "กลับไปค้นหาสิ่งดีดีอีกสักครั้งไหม"
      ]}
    />
    <PrevScene page="/5-4" />
    <NextScene page="/5-5-2" />
  </>
);

const Scene5S5S2: Component = () => (
  <>
    <TextMiddle
      text={["เพราะอดีตอาจทำให้เจ็บปวด", "แต่เธอสามารถเลือกได้ว่าจะวิ่งหนีหรือเรียนรู้จากมัน"]}
    />
    <PrevScene page="/5-5-1" />
    <NextScene page="/5-5-3" />
  </>
);

const Scene5S5S3: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอพร้อมที่จะให้โอกาสการเดินทางที่ผ่านมาแล้วหรือยัง"
      choices={[
        ["พร้อม", "/6-0"],
        ["ไม่พร้อม", "/8-0"]
      ]}
    />
    <PrevScene page="/5-3" />
    <NextScene page="/6-0" />
  </>
);

const Scene5 = {
  Scene5S0,
  Scene5S1,
  Scene5S2,
  Scene5S3,
  Scene5S4,
  Scene5S5S1,
  Scene5S5S2,
  Scene5S5S3
};

export default Scene5;
