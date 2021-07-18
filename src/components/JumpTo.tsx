import type { Component } from "solid-js";
import { Link, Route } from "solid-app-router";

interface JumpTo {
  page: string;
}

const NextScene: Component<JumpTo> = props => (
  <>
    <Link href={props.page}>
      <button>
        next
        <br />
        {props.page}
      </button>
    </Link>
    <Route />
  </>
);

const PrevScene: Component<JumpTo> = props => (
  <>
    <Link href={props.page}>
      <button>prev</button>
    </Link>
    <Route />
  </>
);

export { NextScene, PrevScene };
