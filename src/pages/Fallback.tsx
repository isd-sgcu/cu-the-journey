import type { Component } from "solid-js";
import { Link, Route } from "solid-app-router";
import { NextScene } from "../components/JumpTo";

const FallbackScene: Component = () => (
  <>
    <p>404 Not found</p>
    <p>
      temporary fallback, will be changed later
      <br /> please click next
    </p>
    <Link href="/3">
      <NextScene pg="3-0" />
    </Link>
    <Route />
  </>
);

export default FallbackScene;
