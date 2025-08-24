import {
    IconAc,
    IconShower,
    IconCupHot,
    IconTv,
    IconFridge,
    IconMicrowave,
    IconGas,
    IconWater,
    IconMap,
    IconTransmission,
    IconGrid1x2,
    IconGrid2x2,
    IconGrid3x3,
    IconFuel,
    IconRadio
} from "../assets/icons";

const RAW = {
    AC: IconAc,
    bathroom: IconShower,
    kitchen: IconCupHot,
    TV: IconTv,
    refrigerator: IconFridge,
    microwave: IconMicrowave,
    gas: IconGas,
    water: IconWater,
    map: IconMap,
    transmission: IconTransmission,
    panelTruck: IconGrid1x2,
    fullyIntegrated: IconGrid2x2,
    alcove: IconGrid3x3,
    engine: IconFuel,
    radio: IconRadio,
};


export const FEATURE_ICON_BY_KEY = Object.fromEntries(
    Object.entries(RAW).map(([k, V]) => {
        const isComponent = typeof V === "function" || (V && typeof V === "object");
        return [k, isComponent ? V : null];
    })
);
