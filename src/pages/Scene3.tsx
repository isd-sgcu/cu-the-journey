import type { Component } from "solid-js";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";

const { TextBold } = TextComponent;

const Scene3S0: Component = () => (
  <>
    <TextBold text={["Hello! You are invited", "to sfsafsadasd", "Welcome", "YEAHHHHH"]} />
  </>
);

const Scene3S1: Component = () => (
  <>
    <ChoiceComponent
      question="วันนี้ของเธอเป็นวันแบบไหน"
      choices={[
        ["วันที่ฝนฟ้าคะนอง", "/1"],
        ["วันที่ฟ้าสดใส", "/2"],
        ["วันที่แดดจ้า", "/3-0"],
        ["วันที่ฝนเพิ่งหยุดตก"]
      ]}
    />
  </>
);

const Scene3 = {
  Scene3S0,
  Scene3S1
};

export default Scene3;
