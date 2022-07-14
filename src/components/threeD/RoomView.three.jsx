import * as THREE from "three";
import front_texture from "../model/vasa/front.jpg";
import back_texture from "../model/vasa/back.jpg";
import top_texture from "../model/vasa/top.jpg";
import bottom_texture from "../model/vasa/bottom.jpg";
import right_texture from "../model/vasa/right.jpg";
import left_texture from "../model/vasa/left.jpg";

export default class RoomView {
  create = (loadingManager) => {
    let loader = new THREE.TextureLoader(loadingManager);

    // array for holding all texutre
    let textureArray = [];

    // all texture
    let frontTexture = loader.load(front_texture);
    let backTexture = loader.load(back_texture);
    let topTexture = loader.load(top_texture);
    let bottomTexture = loader.load(bottom_texture);
    let leftTexture = loader.load(left_texture);
    let rightTexture = loader.load(right_texture);

    textureArray.push(new THREE.MeshBasicMaterial({ map: frontTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: backTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: topTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: bottomTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: leftTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: rightTexture }));

    for (let i = 0; i < textureArray.length; i++) {
      textureArray[i].side = THREE.BackSide;
    }

    // making cube
    let cubeGeometry = new THREE.BoxGeometry(100, 100, 100);

    //Assign cube geometry and texture to the mesh
    let mesh = new THREE.Mesh(cubeGeometry, textureArray);

    //Return the mesh
    return mesh;
  };
}
