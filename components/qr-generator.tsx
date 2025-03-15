"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Upload, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const businessTypes = [
  { id: "restaurant", name: "Restaurant" },
  { id: "retail", name: "Retail Store" },
  { id: "service", name: "Service Business" },
  { id: "tech", name: "Technology" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "entertainment", name: "Entertainment" },
  { id: "other", name: "Other" },
];

const colorPresets = {
  restaurant: { primary: "#FF00FF", secondary: "#00FFFF" },
  retail: { primary: "#00FF00", secondary: "#FF00FF" },
  service: { primary: "#FFFF00", secondary: "#00FFFF" },
  tech: { primary: "#00FFFF", secondary: "#FF00FF" },
  healthcare: { primary: "#FF00FF", secondary: "#00FF00" },
  education: { primary: "#00FFFF", secondary: "#FFFF00" },
  entertainment: { primary: "#FF00FF", secondary: "#FFFF00" },
  other: { primary: "#00FFFF", secondary: "#FF00FF" },
};

export default function QRGenerator() {
  const [url, setUrl] = useState("https://example.com");
  const [businessType, setBusinessType] = useState("tech");
  const [primaryColor, setPrimaryColor] = useState("#00FFFF");
  const [secondaryColor, setSecondaryColor] = useState("#FF00FF");
  const [size, setSize] = useState(200);
  const [logoSize, setLogoSize] = useState(50);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [activeTab, setActiveTab] = useState("generate");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [useRedirect, setUseRedirect] = useState(true);
  const [businessInitials, setBusinessInitials] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate the actual URL that will be encoded in the QR code
  const getQrUrl = () => {
    if (!useRedirect) return url;

    // Create a URL that points to our redirect handler with the target URL as a parameter
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/redirect?url=${encodeURIComponent(url)}`;
  };

  useEffect(() => {
    if (businessType && colorPresets[businessType]) {
      setPrimaryColor(colorPresets[businessType].primary);
      setSecondaryColor(colorPresets[businessType].secondary);
    }
  }, [businessType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadQRCode = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const qrCodeContainer = document.getElementById("qr-code-container");
      if (qrCodeContainer) {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous";

        // Get the SVG element
        const svg = qrCodeContainer.querySelector("svg");
        if (!svg) {
          setIsGenerating(false);
          return;
        }

        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        image.onload = () => {
          canvas.width = size;
          canvas.height = size;

          // Draw background
          ctx.fillStyle = "transparent";
          ctx.fillRect(0, 0, size, size);

          // Draw QR code
          ctx.drawImage(image, 0, 0, size, size);

          // Draw business initials if provided
          if (businessInitials && !customLogo) {
            ctx.font = `bold ${size * 0.15}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = secondaryColor;
            ctx.fillText(businessInitials, size / 2, size / 2);
          }

          URL.revokeObjectURL(svgUrl);

          // Convert canvas to PNG
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = `neon-qr-${businessType}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          setIsGenerating(false);
        };

        image.src = svgUrl;
      } else {
        setIsGenerating(false);
      }
    }, 500);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Create Your Custom QR Code
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Design a unique QR code that matches your brand and drives engagement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <Card className="lg:col-span-3 bg-gray-900/80 border border-gray-800 shadow-xl">
          <CardContent className="p-6">
            <Tabs
              defaultValue="generate"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8 bg-gray-800/50 p-1 rounded-lg">
                <TabsTrigger
                  value="generate"
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/90 data-[state=active]:to-cyan-600/90 data-[state=active]:text-white"
                >
                  <div className="flex items-center">
                    <span className="mr-2">1.</span> Content
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="customize"
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/90 data-[state=active]:to-cyan-600/90 data-[state=active]:text-white"
                >
                  <div className="flex items-center">
                    <span className="mr-2">2.</span> Style
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="branding"
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/90 data-[state=active]:to-cyan-600/90 data-[state=active]:text-white"
                >
                  <div className="flex items-center">
                    <span className="mr-2">3.</span> Branding
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6 mt-2">
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="url"
                      className="text-gray-200 text-base font-medium mb-1.5 block"
                    >
                      Destination URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-website.com"
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                    />
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-cyan-400" />
                        <Label
                          htmlFor="redirect-mode"
                          className="text-gray-200 font-medium cursor-pointer"
                        >
                          Secure Redirect & Analytics
                        </Label>
                      </div>
                      {/* <Switch id="redirect-mode" checked={useRedirect} onCheckedChange={setUseRedirect} /> */}
                    </div>
                    {useRedirect && (
                      <div className="text-sm text-gray-400 mt-2">
                        QR code will point to our secure server first, then
                        redirect to your URL. This enables scan tracking,
                        analytics, and enhanced security.
                      </div>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="business-type"
                      className="text-gray-200 text-base font-medium mb-1.5 block"
                    >
                      Business Type
                    </Label>
                    <Select
                      value={businessType}
                      onValueChange={setBusinessType}
                    >
                      <SelectTrigger
                        id="business-type"
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                      >
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {businessTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => setActiveTab("customize")}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-2.5 rounded-md shadow-lg shadow-purple-900/20 transition-all duration-300"
                  >
                    Continue to Style <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="space-y-6 mt-2">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label
                        htmlFor="primary-color"
                        className="text-gray-200 text-base font-medium mb-1.5 block"
                      >
                        Primary Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Input
                            id="primary-color"
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-10 p-1 bg-transparent border-none rounded-md overflow-hidden"
                          />
                          <div className="absolute inset-0 pointer-events-none rounded-md border border-gray-700"></div>
                        </div>
                        <Input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="secondary-color"
                        className="text-gray-200 text-base font-medium mb-1.5 block"
                      >
                        Secondary Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Input
                            id="secondary-color"
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-12 h-10 p-1 bg-transparent border-none rounded-md overflow-hidden"
                          />
                          <div className="absolute inset-0 pointer-events-none rounded-md border border-gray-700"></div>
                        </div>
                        <Input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label
                        htmlFor="size"
                        className="text-gray-200 text-base font-medium"
                      >
                        QR Code Size
                      </Label>
                      <span className="text-gray-400 text-sm">{size}px</span>
                    </div>
                    <Slider
                      id="size"
                      min={150}
                      max={400}
                      step={10}
                      value={[size]}
                      onValueChange={(value) => setSize(value[0])}
                      className="my-4"
                    />
                  </div>

                  <div className="flex items-center space-x-2 bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <input
                      type="checkbox"
                      id="include-margin"
                      checked={includeMargin}
                      onChange={(e) => setIncludeMargin(e.target.checked)}
                      className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
                    />
                    <Label
                      htmlFor="include-margin"
                      className="text-gray-200 font-medium cursor-pointer"
                    >
                      Include Margin Around QR Code
                    </Label>
                  </div>

                  <div className="flex justify-between gap-4 pt-2">
                    <Button
                      onClick={() => setActiveTab("generate")}
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setActiveTab("branding")}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                      Continue to Branding{" "}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="branding" className="space-y-6 mt-2">
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="business-initials"
                      className="text-gray-200 text-base font-medium mb-1.5 block"
                    >
                      Business Initials
                    </Label>
                    <Input
                      id="business-initials"
                      type="text"
                      value={businessInitials}
                      onChange={(e) =>
                        setBusinessInitials(
                          e.target.value.substring(0, 2).toUpperCase()
                        )
                      }
                      placeholder="AB"
                      maxLength={2}
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                    />
                    <p className="text-sm text-gray-400 mt-1.5">
                      Enter up to 2 characters to display in the center of your
                      QR code
                    </p>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <Label className="text-gray-200 text-base font-medium mb-3 block">
                      Custom Logo (Optional)
                    </Label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex items-center gap-4">
                      <Button
                        onClick={triggerFileInput}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {customLogo ? "Change Logo" : "Upload Logo"}
                      </Button>

                      {customLogo && (
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-md border border-gray-700 flex items-center justify-center overflow-hidden bg-black">
                            <img
                              src={customLogo || "/placeholder.svg"}
                              alt="Custom logo"
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCustomLogo(null)}
                            className="h-8 text-gray-400 hover:text-white"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 mt-3">
                      Your logo will be placed in the center of the QR code. For
                      best results, use a simple logo with transparent
                      background.
                    </p>
                  </div>

                  <div className="flex justify-between gap-4 pt-2">
                    <Button
                      onClick={() => setActiveTab("customize")}
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={downloadQRCode}
                      disabled={isGenerating}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                      {isGenerating ? (
                        <>Generating...</>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" /> Download QR Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-gray-900/80 border border-gray-800 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white">Preview</h3>
              <p className="text-sm text-gray-400">
                See how your QR code will look
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative p-6 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-800 shadow-lg flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10 animate-pulse"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600/30 to-cyan-600/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div
                      className="relative p-6 bg-black rounded-lg"
                      id="qr-code-container"
                    >
                      <div className="relative">
                        <QRCodeSVG
                          value={getQrUrl()}
                          size={size}
                          fgColor={primaryColor}
                          bgColor="transparent"
                          level="H"
                          includeMargin={includeMargin}
                          imageSettings={
                            customLogo
                              ? {
                                  src: customLogo,
                                  height: Math.min(size * 0.25, 100),
                                  width: Math.min(size * 0.25, 100),
                                  excavate: true,
                                }
                              : undefined
                          }
                        />
                        {businessInitials && !customLogo && (
                          <div
                            className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
                            style={{ color: secondaryColor }}
                          >
                            {businessInitials}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-1">Scan to visit:</p>
                <p className="text-white font-mono text-sm truncate max-w-xs">
                  {url}
                </p>
                {useRedirect && (
                  <div className="mt-2 flex items-center justify-center text-xs text-cyan-400">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Protected by secure redirect</span>
                  </div>
                )}
              </div>

              <div className="mt-8 w-full">
                <Button
                  onClick={downloadQRCode}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" /> Download QR Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="link"
          asChild
          className="text-gray-400 hover:text-cyan-400"
        >
          <a href="/admin">Admin Login</a>
        </Button>
      </div>
    </div>
  );
}
