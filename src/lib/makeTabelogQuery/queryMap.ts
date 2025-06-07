export const QUERY_MAP: Record<string, string> = {
  // 料理のジャンル
  和食: "Cat=RC&LstCat=RC01&",
  洋食: "Cat=RC&LstCat=RC02&",
  中華: "Cat=RC&LstCat=RC03&",
  アジア・エスニック: "Cat=RC&LstCat=RC04&",
  居酒屋: "Cat=RC&LstCat=RC21&LstCatD=RC2101&",
  ダイニングバー: "Cat=RC&LstCat=RC21&LstCatD=RC2102&",
  焼肉・ホルモン: "Cat=RC&LstCat=RC13&",
  ラーメン: "Cat=MC&LstCat=MC01&",
  スイーツ: "Cat=SC&LstCat=SC02&",

  //利用目的
  知人・友人と: "LstSitu=1&",
  デート: "LstSitu=2&",
  大人数の宴会: "LstSitu=4&",
  家族と: "LstSitu=5&",
  一人で: "LstSitu=6&",
  女子会: "LstSitu=7&",
  合コン: "LstSitu=8&",

  //空間・設備
  おしゃれな空間: "ChkStylish=1&",
  落ち着いた空間: "ChkRelax=1&",
  カップルシート: "ChkCoupleSeat=1&",
  カウンター席: "ChkCounter=1&",
  ソファー席: "ChkSofa=1&",
  座敷: "ChkZashiki=1&",
  掘りごたつ: "ChkHorikotatsu=1&",

  //ロケーション
  景色が奇麗: "ChkFineView=1&",
  夜景が見える: "ChkNightView=1&",
  海が見える: "ChkOceanView=1&",
  ホテルのレストラン: "ChkHotel=1&",

  //のみ食べ放題
  飲み放題: "ChkNomihoudai=1&",
  食べ放題: "ChkTabehoudai=1&",

  //値段(上限)
  指定なし: "LstCosT=0&",
  "1,000円": "LstCosT=1&",
  "2,000円": "LstCosT=2&",
  "3,000円": "LstCosT=3&",
  "5,000円": "LstCosT=5&",
  "10,000円": "LstCosT=8&",
  "15,000円": "LstCosT=9&",
  "30,000円": "LstCosT=11&",
};
