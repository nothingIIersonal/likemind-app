import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ProfileURL } from "../config/APIUrls";

function Map() {
  const navigate = useNavigate();

  useEffect(() => {
    async function CheckToken() {
      const accessToken = Cookies.get("access_token");

      const headers = {
        Authorization: accessToken,
      };

      await axios({ method: "post", url: ProfileURL, headers: headers }).catch(
        (err) => {
          console.log("Error occured");
          console.log(err);
          navigate("/login");
        },
      );
    }

    CheckToken();
  }, [navigate]);

  return (
    <>
      <div className="map-container">
        <div className="default-container">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.621055%2C55.757930&z=14.8"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export { Map };
