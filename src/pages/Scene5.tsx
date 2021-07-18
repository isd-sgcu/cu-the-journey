import type { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Link, Route } from "solid-app-router";
import { NextScene, PrevScene, currentPage } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import Fallback from "./Fallback";

const { TextMiddle } = TextComponent;

const Scene5S0: Component = () => (
  <>
    <TextMiddle text={["เธอเริ่มเตรียมตัวสำหรับการเดินทาง", "ครั้งใหม่นี้"]} />
    <Link href="/4">
      <PrevScene pg="4-2" />
    </Link>
    <Route />
    <NextScene pg="5-1" />
  </>
);

const Scene5S1: Component = () => (
  <>
    <TextMiddle text={["เธอเตรียมของที่จำเป็นใส่กระเป๋า"]} />
    <PrevScene pg="5-0" />
    <NextScene pg="5-2" />
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
    <PrevScene pg="5-1" />
    <NextScene pg="5-3" />
  </>
);

const Scene5S3: Component = () => (
  <>
    <TextMiddle
      text={["ลองให้กาลเวลาพาเธอย้อนกลับไปดู", "การเดินทางที่ผ่านมา", "ของเธอกันสักหน่อยดีไหม"]}
    />
    <PrevScene pg="5-2" />
    <NextScene pg="5-4" />
  </>
);

const Scene5S4: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอพร้อมที่จะย้อนกลับไปแล้วใช่ไหม"
      choices={[
        ["พร้อม", "6-0"],
        ["ไม่พร้อม", "5-5-1"]
      ]}
    />
    <PrevScene pg="5-3" />
    <NextScene pg="6-0" />
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
    <PrevScene pg="5-4" />
    <NextScene pg="5-5-2" />
  </>
);

const Scene5S5S2: Component = () => (
  <>
    <TextMiddle
      text={["เพราะอดีตอาจทำให้เจ็บปวด", "แต่เธอสามารถเลือกได้ว่าจะวิ่งหนีหรือเรียนรู้จากมัน"]}
    />
    <PrevScene pg="5-5-1" />
    <NextScene pg="5-5-3" />
  </>
);

const Scene5S5S3: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอพร้อมที่จะให้โอกาสการเดินทางที่ผ่านมาแล้วหรือยัง"
      choices={[
        ["พร้อม", "6-0"],
        ["ไม่พร้อม", "8-0"]
      ]}
    />
    <PrevScene pg="5-3" />
    <NextScene pg="6-0" />
  </>
);

const referPage = {
  "0": Fallback,
  "5-0": Scene5S0,
  "5-1": Scene5S1,
  "5-2": Scene5S2,
  "5-3": Scene5S3,
  "5-4": Scene5S4,
  "5-5-1": Scene5S5S1,
  "5-5-2": Scene5S5S2,
  "5-5-3": Scene5S5S3
};

const Scene5 = () => <Dynamic component={referPage[currentPage()]} />;

export default Scene5;
