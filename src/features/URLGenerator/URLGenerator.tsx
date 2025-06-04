"use client";

import { useState } from "react";

type GenerateTabelogURLResponse = {
  tabelogURL: string;
};

export default function URLGenerator() {
  const [url, setUrl] = useState<string>("");
  const [lat, setLat] = useState<number>(35.774601);
  const [lng, setLng] = useState<number>(139.707837);
  const [keyword, setKeyword] = useState<string>("");

  const generateUrl = async (
    latitude: number,
    longitude: number,
    keyword: string
  ) => {
    try {
      const fetchRes = await fetch("api/generateTabelogURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat: latitude, lng: longitude, keyword }),
      });

      if (!fetchRes.ok) {
        throw new Error("Failed to generate URL");
      }

      const data: GenerateTabelogURLResponse = await fetchRes.json();
      const tabelogURL = data.tabelogURL;

      setUrl(tabelogURL);
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
      <div>
        <label>キーワード</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="駅名など（例: 赤羽駅）"
        />
      </div>

      <button
        onClick={() => generateUrl(lat, lng, keyword)}
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
