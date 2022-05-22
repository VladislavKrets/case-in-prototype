import {Navigate} from "react-router";

export default function RedirectJsRouter(props){
    let newLocation = "/";
    if (!window.location.pathname.startsWith("expendPlugins/chart/")
        && window.location.pathname.includes("expendPlugins/chart/")) {
        let navigated = window.location.pathname.split("/");
        let isStart = false;
        navigated.forEach((item, id) => {
            if (item === "expendPlugins") isStart = true;
            if (isStart) {
                newLocation += (item + "/")
            }
        })
        newLocation = newLocation.slice(0, newLocation.length - 1)
    }
    console.log(newLocation)
    return newLocation === "/" ? <></> : <Navigate to={newLocation} replace/>
}