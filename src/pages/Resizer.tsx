import { useWindow } from "../utils/Hooks.tsx";
import BasePage from "./Base.tsx";
import MobileBase from "./mobile/Base.tsx";

export default function ResizableBasePage(){
    const {width} = useWindow();

    return (width >= 1075) ? <BasePage /> : <MobileBase />
}