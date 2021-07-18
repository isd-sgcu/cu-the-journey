import type { Component } from "solid-js";
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
  </>
);

const Scene3S1: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="วันนี้ของเธอเป็นวันแบบไหน"
      choices={[
        ["วันที่ฝนฟ้าคะนอง", "/1"],
        ["วันที่ฟ้าสดใส", "/2"],
        ["วันที่แดดจ้า"],
        ["วันที่ฝนเพิ่งหยุดตก"],
        ["Scene3 intro", "/3-0"],
        ["Scene3.2", "/3-2"]
      ]}
    />
  </>
);

const Scene3S2: Component = () => (
  <>
    <TextMiddle text={["เธอนึกขึ้นได้ว่ายังไม่ได้เปิดซองจดหมาย", "ที่รับมาเมื่อเช้า"]} />
  </>
);

const Scene3 = {
  Scene3S0,
  Scene3S1,
  Scene3S2
};

export default Scene3;
