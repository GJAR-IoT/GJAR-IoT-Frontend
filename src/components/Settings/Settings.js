import React from "react";
import SideBar from "../../hoc/SideBar/SideBar";
import useResponsiveDesign from "../../hooks/useResponsiveDesign";
import classes from "./Settings.module.scss";
import Slider from "../UI/Slider/Slider";
import CustomTimePicker from "../UI/TimePicker/CustomTimePicker";
import CustomDatePicker from "../UI/DatePicker/CustomDatePicker";
import { useStore } from "../../store/store";
import Button from "../UI/Button/Button";
import { useLocation, matchPath } from "react-router-dom";
import moment from "moment";

export default function Settings() {
    const [store, dispatch] = useStore(true, ["settingsSidebarOpen", "downloadDrawerOpen", "activeDate", "interval"]);
    const { shouldDisplay, locationOnRoom } = useResponsiveDesign();
    const { pathname } = useLocation();

    const roomId =
        matchPath(pathname, {
            path: "/room/:id",
        }) &&
        matchPath(pathname, {
            path: "/room/:id",
        }).params &&
        matchPath(pathname, {
            path: "/room/:id",
        }).params.id;

    return (
        <SideBar position="right" black isVisible={(shouldDisplay && locationOnRoom) || store.settingsSidebarOpen}>
            <h1 className={classes.Header}>Nastavenia</h1>
            <Slider defaultvalue={12} change={(newValue) => dispatch("SET_INTERVAL", newValue)} />
            <CustomTimePicker />
            <CustomDatePicker />
            <div className={classes.ButtonWrapper}>
                <a href={`https://iot.gjar-po.sk/api/export/${roomId}/${moment(store.activeDate).format("YYYY-MM-DD")}`}>
                    <Button className="full-width">Stiahni dáta zo dňa {moment(store.activeDate).format("D.M")}</Button>
                </a>
            </div>
            <div className={classes.ButtonWrapper}>
                <a href={`https://iot.gjar-po.sk/api/export/${roomId}`}>
                    <Button className="full-width">Stiahni všetky dáta z miestnosti {roomId}</Button>
                </a>
            </div>
        </SideBar>
    );
}
