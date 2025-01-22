import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/Addons.js';
import defaultSVG from '../../assets/svg/bookmark.svg';
import { useEffect, useState } from 'react';

export type ThreeSVGProps = {
    src?: string,
    color?: string, 
    scale?: number,
    center?: boolean,
    position?: [number, number, number],
    rotation?: [number, number, number],
};

export default function SVGThree(props: ThreeSVGProps){
    const {
        src = defaultSVG,
        color=undefined,
        scale=1,
        position=[0,0,0],
        rotation=[0,0,0],
    } = props;

    const [svgData, setSVGData] = useState<any>(undefined);

    useEffect(() => {
        async function loadSVG(){
            const loader = new SVGLoader();
            const group = new THREE.Group();

            group.position.set(...position);
            group.scale.set(scale, scale, scale);
            group.rotation.set(...rotation);

            const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
            const {paths} = await loader.loadAsync(src);

            for (const path of paths) {
                path.toShapes(true).map((shape) => 
                    group.add(new THREE.Mesh(new THREE.ShapeGeometry(shape), material)));
            }

            const box = new THREE.Box3().setFromObject(group);
            const center = box.getCenter(new THREE.Vector3());

            group.position.x = -center.x;
            group.position.y = -center.y;

            setSVGData(group);
        }
        loadSVG();
    }, [src]);



    return (
        // <group scale={scale} position={position}>
        //     {
        //         svgData.map(([geo, mat],i) => (
        //             <mesh geometry={geo} material={mat} key={i}/>
        //         ))
        //     }
        // </group>
        svgData && <primitive object={svgData} />
    )
}