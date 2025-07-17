"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const factors = [
  {
    name: "Funding Rate",
    description: "Funding < -0.05%",
    impact: "Short squeeze",
    api: "https://fapi.binance.com/fapi/v1/fundingRate?symbol=ETCUSDT&limit=1",
    extract: (data) => parseFloat(JSON.parse(data)[0].fundingRate) < -0.0005,
  },
  {
    name: "Hashrate ETC",
    description: "> 320TH/s",
    impact: "Miners tập trung",
    api: "https://etc.2miners.com/api/network/stats",
    extract: (data) => JSON.parse(data).hashrate > 320000000000000,
  },
  {
    name: "Volume 24h",
    description: "Tăng > 100%",
    impact: "Dòng tiền mạnh",
    api: "https://api.coingecko.com/api/v3/coins/ethereum-classic",
    extract: (data) => {
      const json = JSON.parse(data);
      return json.market_data.total_volume.usd / json.market_data.market_cap.usd > 0.1;
    },
  },
  {
    name: "ETH/BTC Ratio",
    description: "ETH yếu hơn BTC > 5%",
    impact: "Dòng tiền chuyển dịch",
    api: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd",
    extract: (data) => {
      const prices = JSON.parse(data);
      const eth = prices.ethereum.usd;
      const btc = prices.bitcoin.usd;
      const ratio = eth / btc;
      return ratio < 0.055;
    },
  },
];

export default function Page() {
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let count = 0;
    let completed = 0;
    const output = [];

    factors.forEach(async (factor) => {
      try {
        const res = await fetch(factor.api);
        const text = await res.text();
        const ok = factor.extract(text);
        output.push({ ...factor, ok });
        if (ok) count++;
      } catch (e) {
        output.push({ ...factor, ok: false });
      } finally {
        completed++;
        if (completed === factors.length) {
          setScore(count);
          setResults(output);
        }
      }
    });
  }, []);

  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">ETC Pump Dashboard</h2>
          <p className="text-muted-foreground">Điểm dự báo: {score}/4</p>
          <Progress value={(score / factors.length) * 100} className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {results.map((r, i) => (
              <Card key={i} className="p-3">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-muted-foreground">{r.description}</p>
                <p className="text-sm italic">Tác động: {r.impact}</p>
                <Badge variant={r.ok ? "success" : "destructive"} className="mt-2">
                  {r.ok ? "Tín hiệu tích cực" : "Chưa hội đủ"}
                </Badge>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}