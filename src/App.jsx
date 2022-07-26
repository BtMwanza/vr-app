import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import MainScene from "./components/scenes/MainScene.component";
import MainScene2 from "./components/scenes/MainScene2";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <React.Fragment>
      <MainScene2 loading={true} />
    </React.Fragment>
  );
}

export default App;
