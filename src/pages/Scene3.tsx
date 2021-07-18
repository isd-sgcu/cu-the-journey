import { Component, createSignal, Switch, Match } from "solid-js";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";

const { TextMiddle } = TextComponent;

const [count, setCount] = createSignal(0);
const increment = () => setCount(count() + 1);
const decrement = () => setCount(count() - 1);

const NextScene = () => (
  <div class="w-4 inline-flex">
    <button onClick={() => increment()}>next{count()}</button>
  </div>
);

const PrevScene = () => (
  <div class="w-4 inline-flex">
    <button onClick={() => decrement()}>prev</button>
  </div>
);

const Scene3S0: Component = () => (
  <>
    <TextMiddle
      text={[
        "วันนี้เป็นวันพักผ่อนวันหนึ่งของ(name)",
        "ที่กำลังพักผ่อนจากการเดินทาง",
        "อันแสนเหน็ดเหนื่อยที่ผ่านมา"
      ]}
    />
    <PrevScene />
    <NextScene />
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
    <PrevScene />
    <NextScene />
  </>
);

const Scene3S2: Component = () => (
  <>
    <TextMiddle text={["เธอนึกขึ้นได้ว่ายังไม่ได้เปิดซองจดหมาย", "ที่รับมาเมื่อเช้า"]} />
    <PrevScene />
    <NextScene />
  </>
);

const Scene3S3: Component = () => (
  <>
    <ChoiceComponent
      isLong={false}
      question="เธอเก็บซองจดหมายไว้ที่ไหนกันนะ"
      choices={[
        ["บนโต๊ะทำงาน"],
        ["บนโต๊ะกินช้าว"],
        ["บนเตียงนอน"],
        ["ในลิ้นชัก"],
        ["อยู่ไหนก็ไม่รู้"]
      ]}
    />
    <PrevScene />
    <NextScene />
  </>
);

const Scene3S4: Component = () => (
  <>
    <TextMiddle text={["ลองหาดูใหม่สิ...", "นั่นไง! เธอเจอมันแล้ว!"]} />
    <PrevScene />
    <NextScene />
  </>
);

const Scene3S5: Component = () => (
  <>
    <TextMiddle text={["เธอเดินไปหยิบจดหมายมาเปิดอ่าน"]} />
    <PrevScene />
    <NextScene />
  </>
);

const Scene3: Component = () => (
  <Switch fallback={<Scene3S0 />}>
    <Match when={count() === 0}>
      <Scene3S0 />
    </Match>
    <Match when={count() === 1}>
      <Scene3S1 />
    </Match>
    <Match when={count() === 2}>
      <Scene3S2 />
    </Match>
    <Match when={count() === 3}>
      <Scene3S3 />
    </Match>
    <Match when={count() === 4}>
      <Scene3S4 />
    </Match>
    <Match when={count() === 5}>
      <Scene3S5 />
    </Match>
  </Switch>
);

export default Scene3;
