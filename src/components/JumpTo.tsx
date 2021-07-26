import type { Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { Link } from "solid-app-router";

interface JumpToProps {
  page: string;
  children?: JSX.Element;
}

const NextScene: Component<JumpToProps> = props => (
  <>
    <Link href={props.page}>{props.children}</Link>
  </>
);

const PrevScene: Component<JumpToProps> = props => (
  <>
    <Link href={props.page}>{props.children}</Link>
  </>
);

export { NextScene, PrevScene };
