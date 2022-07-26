import React from "react";
import * as THREE from "three";
import RoomView from "../threeD/RoomView.three";
import { OrbitControls } from "../OrbitControls.js";
import Loading from "../Loading.component";
import { handleSceneResize, initEventListener } from "../utils/sceneResize";

const MainScene2 = (props) => {
  const [state, setState] = React.useState({
    loading: props.loading ? true : false,
    fieldOfView: 45,
    aspectRatio: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
  });

  var divRef = React.createRef();
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  var camera = new THREE.PerspectiveCamera(
    state.fieldOfView,
    state.aspectRatio,
    state.near,
    state.far
  );
  var scene = new THREE.Scene();

  // control scene
  var controls = new OrbitControls(camera, renderer.domElement);

  // mount when screen loads
  React.useEffect(() => {
    initScene();
    return () => {};
  }, []);

  // initiate function
  function initScene() {
    //init Loading Manager
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      setState({ ...state, loading: false });
    };

    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    divRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 4, 6);
    scene.add(camera);
    console.log("CAMERA_STATE: =======>", camera);

    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.keys = {
      LEFT: "ArrowLeft", //left arrow
      UP: "ArrowUp", // up arrow
      RIGHT: "ArrowRight", // right arrow
      BOTTOM: "ArrowDown", // down arrow
    };

    //Room View
    let room = new RoomView().create(loadingManager);
    scene.add(room);

    //Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    //init Handle Resize
    handleSceneResize(camera, renderer, scene);
    initEventListener();
  }

  return (
    <React.Fragment>
      <div className="three-container" ref={divRef} />
      {state.loading && <Loading />}
    </React.Fragment>
  );
};

export default MainScene2;
