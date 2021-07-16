import type { Component } from "solid-js";
import ChoiceComponent from "../components/Choice.jsx";

const Scene3_1: Component = () => (
  <>
    <div>
      <ChoiceComponent
        text1="วันที่ฝนฟ้าคะนอง"
        ref1="/1"
        text2="วันที่ฟ้าสดใส"
        ref2="/2"
        text3="วันที่แดดจ้า"
        text4="วันที่ฝนเพิ่งหยุดตก"
      />
    </div>
  </>
);

export default Scene3_1;
