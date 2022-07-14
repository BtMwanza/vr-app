export const handleSceneResize = (camera, renderer, scene, composer) => {
  //Resize renderer
  if (renderer && window && camera && scene) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  if (composer && window && camera && scene) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    composer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
};

export const initEventListener = () => {
  //Add event listener to window object
  if (window) {
    window.addEventListener("resize", handleSceneResize, false);
  }
};
