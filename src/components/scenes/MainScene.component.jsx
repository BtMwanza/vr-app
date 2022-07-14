import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import RoomView from "../threeD/RoomView.three";
import { OrbitControls } from "./../OrbitControls.js";
import Loading from "../Loading.component";
import { handleSceneResize, initEventListener } from "../utils/sceneResize";

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading ? true : false,
      fieldOfView: 95,
      aspectRatio: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000,
    };
    //3D Scene components
    this.divRef = React.createRef();
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.controls = null;
  }

  componentDidMount() {
    this.initScene();
  }

  initScene = () => {
    //init Loading Manager
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      this.setState({ loading: false });
    };

    //init Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0x000000, 0.0);

    this.divRef.current.appendChild(this.renderer.domElement);

    //init Scene
    this.scene = new THREE.Scene();

    //init Camera
    this.camera = new THREE.PerspectiveCamera(
      this.state.fieldOfView,
      this.state.aspectRatio,
      this.state.near,
      this.state.far
    );
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
    console.log("CAMERA: =======>", this.camera);

    // Adding orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;

    //Room View
    let room = new RoomView().create(loadingManager);
    this.scene.add(room);

    //init Handle Resize
    handleSceneResize(this.camera, this.renderer, this.scene);
    initEventListener();

    //Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  };

  render() {
    return (
      <React.Fragment>
        <div className="three-container" ref={this.divRef} />
        {this.state.loading && <Loading />}
      </React.Fragment>
    );
  }
}
