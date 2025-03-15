"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  Download,
  QrCode,
  Users,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

// Mock data for the admin dashboard
const mockQrData = [
  {
    id: 1,
    url: "https://restaurant-example.com",
    type: "restaurant",
    created: "2023-05-15",
    scans: 245,
  },
  {
    id: 2,
    url: "https://retail-store.com",
    type: "retail",
    created: "2023-05-16",
    scans: 189,
  },
  {
    id: 3,
    url: "https://tech-company.com",
    type: "tech",
    created: "2023-05-17",
    scans: 321,
  },
  {
    id: 4,
    url: "https://healthcare-provider.com",
    type: "healthcare",
    created: "2023-05-18",
    scans: 142,
  },
  {
    id: 5,
    url: "https://education-platform.com",
    type: "education",
    created: "2023-05-19",
    scans: 276,
  },
];

const scanData = [
  { name: "Mon", scans: 120 },
  { name: "Tue", scans: 145 },
  { name: "Wed", scans: 210 },
  { name: "Thu", scans: 198 },
  { name: "Fri", scans: 276 },
  { name: "Sat", scans: 187 },
  { name: "Sun", scans: 156 },
];

const businessTypeData = [
  { name: "Restaurant", count: 24 },
  { name: "Retail", count: 18 },
  { name: "Tech", count: 32 },
  { name: "Healthcare", count: 14 },
  { name: "Education", count: 27 },
  { name: "Entertainment", count: 19 },
  { name: "Other", count: 8 },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check for a token or session
    // This is just a simple mock authentication check
    const checkAuth = () => {
      // For demo purposes, we're just setting it to true
      // In a real app, you would verify the user is logged in
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear the token or session
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/60 border-r border-purple-500/30 h-screen fixed">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              QrWeaver Admin
            </h2>
          </div>

          <nav className="mt-6">
            <div className="px-4 py-2 text-cyan-400 text-sm font-medium uppercase">
              Main
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-purple-900/30 hover:text-cyan-400 py-3 px-6"
            >
              <Activity className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-purple-900/30 hover:text-cyan-400 py-3 px-6"
            >
              <QrCode className="mr-2 h-5 w-5" />
              QR Codes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-purple-900/30 hover:text-cyan-400 py-3 px-6"
            >
              <Users className="mr-2 h-5 w-5" />
              Users
            </Button>

            <div className="px-4 py-2 mt-6 text-cyan-400 text-sm font-medium uppercase">
              Settings
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-purple-900/30 hover:text-cyan-400 py-3 px-6"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-purple-900/30 hover:text-cyan-400 py-3 px-6"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <Button
              variant="outline"
              asChild
              className="border-purple-500/50 text-purple-400 hover:bg-purple-950/30"
            >
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Generator
              </a>
            </Button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-cyan-400">
                  Total QR Codes
                </CardDescription>
                <CardTitle className="text-3xl text-white">142</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-400">
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-cyan-400">
                  Total Scans
                </CardDescription>
                <CardTitle className="text-3xl text-white">1,286</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-400">
                  +24% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-cyan-400">
                  Active Users
                </CardDescription>
                <CardTitle className="text-3xl text-white">38</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-400">
                  +8% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  QR Scans (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scanData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#9333ea",
                          color: "#fff",
                        }}
                      />
                      <Bar
                        dataKey="scans"
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#9333ea"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#06b6d4"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  QR Codes by Business Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={businessTypeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#ccc" />
                      <YAxis dataKey="name" type="category" stroke="#ccc" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#9333ea",
                          color: "#fff",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="url(#colorGradient2)"
                        radius={[0, 4, 4, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient2"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor="#06b6d4"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#9333ea"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent QR codes */}
          <Card className="bg-gray-900/60 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Recent QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase text-cyan-400 border-b border-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        URL
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Business Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Scans
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockQrData.map((qr) => (
                      <tr
                        key={qr.id}
                        className="border-b border-gray-700 hover:bg-gray-800/50"
                      >
                        <td className="px-6 py-4">{qr.id}</td>
                        <td className="px-6 py-4 font-mono text-xs truncate max-w-xs">
                          {qr.url}
                        </td>
                        <td className="px-6 py-4 capitalize">{qr.type}</td>
                        <td className="px-6 py-4">{qr.created}</td>
                        <td className="px-6 py-4">{qr.scans}</td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
