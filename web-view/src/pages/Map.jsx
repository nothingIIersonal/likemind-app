import React, { useState, useEffect } from "react";
import axios from "axios";
import { YMaps, Placemark, Map as YMap } from "@pbe/react-yandex-maps";
import { GetAccessToken } from "../config/AuthCheck";
import { RetrieveAllPlacemarksURL } from "../config/APIUrls";

function Map() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios({
        method: "post",
        url: RetrieveAllPlacemarksURL,
        headers: {
          Authorization: GetAccessToken(),
        },
      }).then((res) => {
        setMarks(res.data.marks);
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  let marksList = [];
  for (let i = 0; i < marks.length; i++) {
    marksList.push(
      <Placemark
        modules={["geoObject.addon.balloon"]}
        defaultGeometry={[marks[i].lat, marks[i].lon]}
        properties={{ balloonContentBody: marks[i].title }}
        key={i}
      />,
    );
  }

  return (
    <>
      <div className="map-container">
        <div className="default-container">
          <YMaps query={{ apikey: process.env.REACT_APP_YMAP_KEY }}>
            <YMap
              defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
              className="ymap"
            >
              {marksList}
            </YMap>
          </YMaps>
        </div>
      </div>
    </>
  );
}

export { Map };
