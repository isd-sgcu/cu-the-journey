import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";

const FallbackScene: Component = () => (
  <>
    <p>404 Not found</p>
    <p>
      temporary fallback, will be changed later
      <br /> please click next
    </p>
    <NextScene page="/3-0" />
  </>
);

export default FallbackScene;
