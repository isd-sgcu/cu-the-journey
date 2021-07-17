import { Route } from "solid-app-router";
import type { Component } from "solid-js";

export const App: Component = () => (
  <div class="w-screen h-screen bg-[#262626] flex justify-center items-center">
    <div class="w-screen sm:max-w-[375px] h-screen sm:max-h-[667px] bg-white flex justify-center items-center flex-col">
      <Route />
    </div>
  </div>
);
