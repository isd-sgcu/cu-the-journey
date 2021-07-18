import { Component, createSignal } from "solid-js";

const [currentPage, setPage] = createSignal("3-0");
const goToPage = (pg = "3-0") => setPage(pg);

interface JumpTo {
  pg: string;
}

const NextScene: Component<JumpTo> = props => (
  <div class="flex">
    <button onClick={() => goToPage(props.pg)}>
      next
      <br />
      {currentPage()}
    </button>
  </div>
);

const PrevScene: Component<JumpTo> = props => (
  <div class="flex">
    <button onClick={() => goToPage(props.pg)}>prev</button>
  </div>
);

export { NextScene, PrevScene, goToPage, currentPage };
