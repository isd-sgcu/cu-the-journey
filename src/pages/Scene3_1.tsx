import type { Component } from "solid-js";
import ChoiceComponent from "../components/Choice.jsx";

const Scene3_1: Component = () => (
  <>
    <div>
      <ChoiceComponent
        question="วันนี้ของเธอเป็นวันแบบไหน"
        choices={[
          ["วันที่ฝนฟ้าคะนอง", "/1"],
          ["วันที่ฟ้าสดใส", "/2"],
          ["วันที่แดดจ้า"],
          ["วันที่ฝนเพิ่งหยุดตก"]
        ]}
      />
    </div>
  </>
);

export default Scene3_1;
