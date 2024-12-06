declare module 'three/examples/jsm/loaders/FontLoader' {
    import { Loader } from 'three';
    import { Font } from 'three/examples/jsm/loaders/FontLoader';
  
    export class FontLoader extends Loader {
      load(
        url: string,
        onLoad: (font: Font) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      parse(obj: any) : this;
    }
  }
  
  declare module 'three/examples/jsm/geometries/TextGeometry' {
    import { BufferGeometry } from 'three';
    import { Font } from 'three/examples/jsm/loaders/FontLoader';
  
    export class TextGeometry extends BufferGeometry {
      constructor(text: string, parameters: {
        font: Font;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      });
      center() : any;
    }
  }