"use client";

import geoConverter from "@/lib/geoConverter/geoConverter";
import makeTabelogQuery from "@/lib/makeTabelogQuery/makeTabelogQuery";
import { useState } from "react";

type GenerateTabelogURLResponse = {
  tabelogURL: string;
};

const demoString: string[][] = [
  ["和食"],
  ["おしゃれな空間", "落ち着いた空間"],
  ["5,000円"],
];

export default function URLGenerator() {
  const [url, setUrl] = useState<string>("");
  const [lat, setLat] = useState<number>(35.774601);
  const [lng, setLng] = useState<number>(139.707837);
  const [endUrl, setEndUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [geoLat, setGeoLat] = useState<number>(0);
  const [geoLng, setGeoLng] = useState<number>(0);

  // 緯度経度から阿部ログの町コード入りURLを生成する関数
  const generateUrl = async (latitude: number, longitude: number) => {
    try {
      const fetchRes = await fetch("api/generateTabelogURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
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

  // ユーザーの回答から、クエリを含んだ食べログのURLを生成する関数
  const handleMakeURL = (params: string[][]) => {
    const queryParams = makeTabelogQuery(params);
    setEndUrl(`${url}${queryParams}`);
  };

  // 入力された場所から緯度経度を生成する関数
  const handleGeocode = async (location: string) => {
    const result = await geoConverter(location);
    if (result) {
      setGeoLat(parseFloat(result.latitude));
      setGeoLng(parseFloat(result.longitude));
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
        <div>
          <div style={{ marginTop: "1rem" }}>
            <strong>生成されたURL：</strong>
            <br />
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
          <div>詳しいリンクを作成</div>
          <button onClick={() => handleMakeURL(demoString)}>作る</button>
          <a href={endUrl} target="_blank" rel="noopener noreferrer">
            {endUrl}
          </a>
        </div>
      )}

      <div>
        <label>
          経度：
          <input
            type="string"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button onClick={() => handleGeocode(location)}>緯度経度を生成</button>
        {geoLat !== 0 && geoLng !== 0 && (
          <div>
            <p>緯度: {geoLat}</p>
            <p>経度: {geoLng}</p>
          </div>
        )}
      </div>
    </div>
  );
}
