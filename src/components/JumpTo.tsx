import type { Component } from "solid-js";
import { useRouter } from "solid-app-router";

interface JumpToProps {
  page: string;
}

const NextScene: Component<JumpToProps> = props => {
  const [router, { push }] = useRouter();
  return (
    <>
      <button class="text-green z-10" onClick={() => push(props.page)}>
        next <br /> {router.current[0].path}
      </button>
    </>
  );
};

const PrevScene: Component<JumpToProps> = props => {
  const [, { push }] = useRouter();
  return (
    <>
      <button class="text-green z-10" onClick={() => push(props.page)}>
        prev
      </button>
    </>
  );
};

export { NextScene, PrevScene };
