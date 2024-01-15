import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { YMaps, Placemark, Map as YMap } from "@pbe/react-yandex-maps";
import { AuthCheck } from "../config/AuthCheck";

function Map() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthCheck().catch((err) => {
      console.log("Error occured");
      console.log(err);
      navigate("/login");
    });
  }, [navigate]);

  return (
    <>
      <div className="map-container">
        <div className="default-container">
          <YMaps query={{ apikey: process.env.REACT_APP_YMAP_KEY }}>
            <YMap
              defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
              className="ymap"
            >
              <Placemark
                modules={["geoObject.addon.balloon"]}
                defaultGeometry={[55.751574, 37.573856]}
                properties={{ balloonContentBody: "Lets party started!" }}
              />
              <Placemark
                modules={["geoObject.addon.balloon"]}
                defaultGeometry={[55.751511, 36.570857]}
                properties={{ balloonContentBody: "Lets party started!" }}
              />
            </YMap>
          </YMaps>
        </div>
      </div>
    </>
  );
}

export { Map };
