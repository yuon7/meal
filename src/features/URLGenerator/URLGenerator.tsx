"use client";

import { useState } from "react";
import { useGenerateTabelogURL } from "./data/hooks/useGenerateTabelogURL";

export default function URLGenerator() {
  const [url, setUrl] = useState<string>("");
  const [lat, setLat] = useState<number>(35.41);
  const [lng, setLng] = useState<number>(139.45);

  const generateUrl = async (latitude: number, longitude: number) => {
    try {
      const resultURL = await useGenerateTabelogURL(longitude, latitude);
      setUrl(resultURL);
    } catch (err) {
      console.error(err);
      setUrl("");
    }
  };
  return (
    <div style={{ padding: "1rem" }}>
      <h2>食べログのURL生成</h2>

      <div>
        <label>
          緯度：
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            step="0.000001"
          />
        </label>
      </div>
      <div>
        <label>
          経度：
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            step="0.000001"
          />
        </label>
      </div>

      <button
        onClick={() => generateUrl(lat, lng)}
        style={{ marginTop: "1rem" }}
      >
        URLを生成する
      </button>

      {url && (
        <div style={{ marginTop: "1rem" }}>
          <strong>生成されたURL：</strong>
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
