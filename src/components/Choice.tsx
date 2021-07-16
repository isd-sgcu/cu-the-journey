import { Component, createSignal } from "solid-js";

const [count, setCount] = createSignal(0);
const increment = (by = 1) => setCount(count() + by);
const decrement = (by = 1) => setCount(count() - by);
class ChoiceButton {
  private _button: any;
  constructor(by: number, text: string = "") {
    this._button = (
      <button
        onClick={() => increment(by)}
        class="w-[10rem] h-[2rem] m-[8px] rounded-full cursor-pointer
              text-md text-purple font-medium font-Mitr border-[2px] border-purple
              hover:text-white hover:bg-purple
              focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1"
      >
        {text} {count()}
      </button>
    );
  }

  get button() {
    return this._button;
  }
}

export const Choice: Component = () => {
  const button1 = new ChoiceButton(1, "consectetur");
  const button2 = new ChoiceButton(2, "adipiscing");
  const button3 = new ChoiceButton(3, "elit");

  return (
    <>
      <div class="flex justify-center bg-green">
        <div class="flex flex-col w-[15rem]">
          <div class="font-Mitr text-center text-xl font-medium selection:bg-purple selection:text-yellow">
            <h1>Lorem ipsum dolor sit amet,</h1>
          </div>
          {button1.button}
          {button2.button}
          {button3.button}
        </div>
      </div>
    </>
  );
};
