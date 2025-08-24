import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  setFeature,
} from "../features/filters/filtersSlice";
import { resetAndFetchCampers } from "../features/campers/campersSlice";
import { CITIES, toLocation } from "../constants/cities";
import { FEATURE_ICON_BY_KEY } from "../constants/featureIcons";
const IconMap = FEATURE_ICON_BY_KEY.map;
import styles from "./FiltersPanel.module.css";

import Chip from "./Chip";

export default function FiltersPanel() {
  const dispatch = useDispatch();
  const f = useSelector((s) => s.filters);

  const initialCity = useMemo(() => {
    if (!f.location) return "";
    const parts = String(f.location).split(",");
    return parts.length > 1 ? parts[1].trim() : "";
  }, [f.location]);

  const [city, setCity] = useState(initialCity);
  const [form, setFrm] = useState(f.form || "");
  const [features, setFeatures] = useState({
    AC: !!f.AC,
    bathroom: !!f.bathroom,
    kitchen: !!f.kitchen,
    TV: !!f.TV,
    refrigerator: !!f.refrigerator,
    microwave: !!f.microwave,
    gas: !!f.gas,
    water: !!f.water,
    automatic: !!f.automatic || f.transmission === "automatic",
  });

  const EQUIPMENT = [
    { key: "AC", label: "AC", iconKey: "AC" },
    { key: "automatic", label: "Automatic", iconKey: "transmission" },
    { key: "kitchen", label: "Kitchen", iconKey: "kitchen" },
    { key: "TV", label: "TV", iconKey: "TV" },
    { key: "bathroom", label: "Bathroom", iconKey: "bathroom" },
  ];

  const VEHICLE_TYPES = [
    { value: "panelTruck", label: "Van" },
    { value: "fullyIntegrated", label: "Fully Integrated" },
    { value: "alcove", label: "Alcove" },
  ];

  const toggleFeature = (key) =>
    setFeatures((p) => ({ ...p, [key]: !p[key] }));

  const apply = () => {
    dispatch(setLocation(toLocation(city)));
    dispatch(setForm(form || ""));
    const BOOL_KEYS = [
      "AC",
      "bathroom",
      "kitchen",
      "TV",
      "refrigerator",
      "microwave",
      "gas",
      "water",
    ];
    BOOL_KEYS.forEach((k) =>
      dispatch(setFeature({ key: k, value: !!features[k] }))
    );
    dispatch(
      setFeature({
        key: "transmission",
        value: features.automatic ? "automatic" : "",
      })
    );
    dispatch(resetAndFetchCampers());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      apply();
    }
  };

  return (
    <div onKeyDown={onKeyDown} className={styles.panel}>
      <div className={styles.block}>
        <div className={styles.sectionHead}>Location</div>

        <div className={styles.selectField}>
          <IconMap
            className={styles.selectIcon}
            width={18}
            height={18}
            aria-hidden="true"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.select}
          >
            <option value="">Any</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.sectionHead}>Filters</div>

      <div className={`${styles.sectionSubTitle} ${styles.sectionUnderline}`}>
        Vehicle equipment
      </div>
      <div className={styles.chips}>
        {EQUIPMENT.map(({ key, label, iconKey }) => {
          const Icon = FEATURE_ICON_BY_KEY[iconKey];
          return (
            <Chip
              key={key}
              label={label}
              icon={Icon}
              variant="tile"
              active={!!features[key]}
              onClick={() => toggleFeature(key)}
            />
          );
        })}
      </div>

      <div className={`${styles.sectionSubTitle} ${styles.sectionUnderline}`}>
        Vehicle type
      </div>
      <div className={styles.chips}>
        {VEHICLE_TYPES.map(({ value, label }) => {
          const Icon = FEATURE_ICON_BY_KEY[value] || null;
          return (
            <Chip
              key={value}
              label={label}
              icon={Icon}
              variant="tile"
              active={form === value}
              onClick={() => setFrm(form === value ? "" : value)}
            />
          );
        })}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={apply} className={styles.searchBtn}>
          Search
        </button>
      </div>
    </div>
  );
}
