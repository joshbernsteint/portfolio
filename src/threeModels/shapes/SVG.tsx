import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/Addons.js';
import defaultSVG from '../../assets/svg/bookmark.svg';
import { useEffect, useMemo, useRef, useState } from 'react';

export type ThreeSVGProps = {
    src?: string,
    color?: string, 
    scale?: number,
    center?: boolean,
    position?: [number, number, number],
};

export default function SVGThree(props: ThreeSVGProps){
    const {
        src = defaultSVG,
        color=undefined,
        scale=1,
        center=false,
        position=[0,0,0],
    } = props;

    const [svgData, setSVGData] = useState<any[]>([]);

    const getData = async () => {
        const loader = new SVGLoader();
        const meshList = [];
        const {paths} = await loader.loadAsync(src);
        
        for (const path of paths) {
            const fillColor = path.userData?.style.fill;
            if(fillColor && fillColor !== 'none'){
                const shapes = SVGLoader.createShapes(path);
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color().setStyle(color || fillColor),
                    transparent: true,
                    opacity: path.userData?.style.fillOpacity,
                });

                meshList.push(...shapes.map(e => 
                    [new THREE.ShapeGeometry(e), material]
                ));
            }

            const strokeColor = path.userData?.style.stroke;
            if(strokeColor && strokeColor !== 'none'){
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color().setStyle(color || strokeColor),
                    transparent: true,
                    opacity: path.userData?.style.strokeOpacity,
                });

                for (const subpath of path.subPaths) {
                    const geomentry = SVGLoader.pointsToStroke(subpath.getPoints(10), path.userData?.style);
                    if(geomentry){
                        meshList.push([geomentry, material]);
                    }
                }
            }

        }
        

        setSVGData(meshList);
    };

    useEffect(() => {
        getData();
    }, [src]);



    return (
        <group scale={scale} position={position}>
            {
                svgData.map(([geo, mat],i) => (
                    <mesh geometry={geo} material={mat} key={i}/>
                ))
            }
        </group>
    )
}