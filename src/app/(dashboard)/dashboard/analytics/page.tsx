"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Download, RefreshCw } from "lucide-react";
import { useYouTube } from "@/contexts/youtube-context";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

type AnalyticsRow = {
  id: string;
  channelId: string;
  date: string; // YYYY-MM-DD
  views: number;
  watchTimeMinutes: number;
  subscribersGained: number;
  subscribersLost: number;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  estimatedRevenue: number;
  impressions: number;
  clickThroughRate: number; // percentage * 100
  averageViewDuration: number; // seconds
};

const TIME_RANGES = [
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
  { value: "365d", label: "Last 12 months", days: 365 },
] as const;

const METRICS = [
  { value: "views", label: "Views" },
  { value: "watchTimeMinutes", label: "Watch time (min)" },
  { value: "impressions", label: "Impressions" },
  { value: "clickThroughRate", label: "CTR (%)" },
  { value: "averageViewDuration", label: "Avg view (s)" },
  { value: "likes", label: "Likes" },
  { value: "comments", label: "Comments" },
  { value: "subscribersNet", label: "Subscribers (net)" },
];

export default function AnalyticsPage() {
  const { selectedChannel, loading: loadingChannels } = useYouTube();
  const [range, setRange] = useState<(typeof TIME_RANGES)[number]["value"]>("30d");
  const [metric, setMetric] = useState<string>("views");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [fromCache, setFromCache] = useState<boolean>(true);

  const { startDate, endDate } = useMemo(() => {
    const def = TIME_RANGES.find((r) => r.value === range) ?? TIME_RANGES[1];
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - (def.days - 1));
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return { startDate: fmt(start), endDate: fmt(end) };
  }, [range]);

  const netSubs = (arr: AnalyticsRow[]) =>
    arr.reduce((s, r) => s + (r.subscribersGained - r.subscribersLost), 0);

  const totals = useMemo(
    () => ({
      views: rows.reduce((s, r) => s + r.views, 0),
      watchTimeMinutes: rows.reduce((s, r) => s + r.watchTimeMinutes, 0),
      impressions: rows.reduce((s, r) => s + r.impressions, 0),
      likes: rows.reduce((s, r) => s + r.likes, 0),
      comments: rows.reduce((s, r) => s + r.comments, 0),
      subscribersNet: netSubs(rows),
      avgCtr:
        rows.length
          ? Math.round(
              (rows.reduce((s, r) => s + r.clickThroughRate, 0) / rows.length) * 100
            ) / 100
          : 0,
      avgViewSec: rows.length
        ? Math.round(
            rows.reduce((s, r) => s + r.averageViewDuration, 0) / rows.length
          )
        : 0,
    }),
    [rows]
  );

  const chartData = useMemo(
    () =>
      rows.map((r) => ({
        date: r.date,
        views: r.views,
        watchTimeMinutes: r.watchTimeMinutes,
        impressions: r.impressions,
        clickThroughRate: Math.round(r.clickThroughRate) / 100, // as %
        averageViewDuration: r.averageViewDuration,
        likes: r.likes,
        comments: r.comments,
        subscribersNet: r.subscribersGained - r.subscribersLost,
      })),
    [rows]
  );

  const fetchAnalytics = async (refresh = false) => {
    if (!selectedChannel) return;
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        channelId: selectedChannel.id,
        startDate,
        endDate,
        ...(refresh ? { refresh: "true" } : {}),
      });
      const res = await fetch(`/api/youtube/analytics?${qs.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();
      setRows((data.analytics || []) as AnalyticsRow[]);
      setFromCache(Boolean(data.fromCache));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel?.id, startDate, endDate]);

  const number = (n: number) => n.toLocaleString();

  if (loadingChannels) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-64" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedChannel) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">Connect a YouTube channel to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Channel Analytics</h1>
            <p className="text-muted-foreground">
              {selectedChannel.channelName} • {startDate} → {endDate} {fromCache ? "(cached)" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={(v) => setRange(v as any)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              {TIME_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              {METRICS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => fetchAnalytics(true)} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{number(totals.views)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Watch time (min)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{number(totals.watchTimeMinutes)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Subscribers (net)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{number(totals.subscribersNet)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CTR (avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.avgCtr.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trend</CardTitle>
          <CardDescription>
            Daily {METRICS.find((m) => m.value === metric)?.label.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {metric === "likes" || metric === "comments" || metric === "subscribersNet" ? (
              <BarChart data={chartData} margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={metric} fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={chartData} margin={{ left: 8, right: 16 }}>
                <defs>
                  <linearGradient id="primary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#primary)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
            <CardDescription>Likes and comments</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discovery</CardTitle>
            <CardDescription>Impressions and CTR</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="impressions" stroke="#0ea5e9" fill="#0ea5e980" />
                <Area type="monotone" dataKey="clickThroughRate" stroke="#ef4444" fill="#ef444480" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention</CardTitle>
            <CardDescription>Average view duration</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="averageViewDuration" stroke="#8b5cf6" fill="#8b5cf680" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

