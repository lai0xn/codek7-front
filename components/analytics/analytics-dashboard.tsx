"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Users, Play, Download, HardDrive } from "lucide-react"

const viewsData = [
  { month: "Jan", views: 12000, downloads: 3200 },
  { month: "Feb", views: 15000, downloads: 4100 },
  { month: "Mar", views: 18000, downloads: 4800 },
  { month: "Apr", views: 22000, downloads: 5500 },
  { month: "May", views: 25000, downloads: 6200 },
  { month: "Jun", views: 28000, downloads: 7100 },
]

const contentTypeData = [
  { name: "Movies", value: 45, color: "hsl(var(--chart-1))" },
  { name: "TV Shows", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Documentaries", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Music Videos", value: 10, color: "hsl(var(--chart-4))" },
]

const topContentData = [
  { title: "Avengers: Endgame", views: 15420, duration: "3h 1m" },
  { title: "The Office S01E01", views: 12350, duration: "22m" },
  { title: "Planet Earth II", views: 9870, duration: "59m" },
  { title: "Stranger Things S04E01", views: 8640, duration: "1h 18m" },
  { title: "The Dark Knight", views: 7520, duration: "2h 32m" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">Monitor your streaming service performance and usage</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89,432</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 TB</div>
            <div className="text-xs text-muted-foreground">42% of 5 TB capacity</div>
            <Progress value={42} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views and Downloads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Views & Downloads</CardTitle>
            <CardDescription>Monthly views and download statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-1))",
                },
                downloads: {
                  label: "Downloads",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" />
                  <Bar dataKey="downloads" fill="var(--color-downloads)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Content Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                movies: { label: "Movies", color: "hsl(var(--chart-1))" },
                tvshows: { label: "TV Shows", color: "hsl(var(--chart-2))" },
                documentaries: { label: "Documentaries", color: "hsl(var(--chart-3))" },
                music: { label: "Music Videos", color: "hsl(var(--chart-4))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {contentTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Most viewed content this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContentData.map((content, index) => (
              <div key={content.title} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{content.title}</p>
                    <p className="text-sm text-muted-foreground">Duration: {content.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{content.views.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">views</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Viewers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">1,247</div>
            <p className="text-sm text-muted-foreground">Currently watching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8-10 PM</div>
            <p className="text-sm text-muted-foreground">Highest activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45m</div>
            <p className="text-sm text-muted-foreground">Per user session</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
