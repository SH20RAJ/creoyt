"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Key,
  Database,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Monitor,
  CreditCard,
  Users,
  Zap
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    displayName: "John Doe",
    email: "john@example.com",
    bio: "Content creator and digital marketer passionate about AI-powered tools.",
    timezone: "UTC-8",
    language: "en",
    theme: "system",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    projectUpdates: true,
    contentReminders: true,
    
    // Privacy Settings
    profileVisibility: "private",
    dataCollection: true,
    analyticsTracking: true,
    
    // AI Settings
    aiModel: "gpt-4",
    creativityLevel: "balanced",
    autoSave: true,
    aiSuggestions: true
  });

  const settingsTabs = [
    { id: "general", label: "General", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "ai", label: "AI Settings", icon: Zap },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "advanced", label: "Advanced", icon: Settings }
  ];

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {settingsTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Update your basic account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={settings.displayName}
                        onChange={(e) => updateSetting("displayName", e.target.value)}
                        placeholder="Your display name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => updateSetting("bio", e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Receive updates about new features and tips</p>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => updateSetting("marketingEmails", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-gray-500">Get a summary of your weekly activity</p>
                      </div>
                      <Switch
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => updateSetting("weeklyDigest", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about project milestones</p>
                      </div>
                      <Switch
                        checked={settings.projectUpdates}
                        onCheckedChange={(checked) => updateSetting("projectUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Content Reminders</Label>
                        <p className="text-sm text-gray-500">Reminders to create and publish content</p>
                      </div>
                      <Switch
                        checked={settings.contentReminders}
                        onCheckedChange={(checked) => updateSetting("contentReminders", checked)}
                      />
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select value={settings.profileVisibility} onValueChange={(value) => updateSetting("profileVisibility", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                          <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                          <SelectItem value="team">Team - Only team members can see</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Collection</Label>
                        <p className="text-sm text-gray-500">Allow us to collect usage data to improve the service</p>
                      </div>
                      <Switch
                        checked={settings.dataCollection}
                        onCheckedChange={(checked) => updateSetting("dataCollection", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics Tracking</Label>
                        <p className="text-sm text-gray-500">Track your usage for analytics and insights</p>
                      </div>
                      <Switch
                        checked={settings.analyticsTracking}
                        onCheckedChange={(checked) => updateSetting("analyticsTracking", checked)}
                      />
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Security Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Two-Factor Auth
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Data
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Connected Apps
                      </Button>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize how YT Copilot looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          onClick={() => updateSetting("theme", "light")}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            settings.theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sun className="w-4 h-4" />
                            <span className="font-medium">Light</span>
                          </div>
                          <div className="w-full h-8 bg-white border rounded" />
                        </div>
                        <div
                          onClick={() => updateSetting("theme", "dark")}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            settings.theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Moon className="w-4 h-4" />
                            <span className="font-medium">Dark</span>
                          </div>
                          <div className="w-full h-8 bg-gray-900 border rounded" />
                        </div>
                        <div
                          onClick={() => updateSetting("theme", "system")}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            settings.theme === "system" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Monitor className="w-4 h-4" />
                            <span className="font-medium">System</span>
                          </div>
                          <div className="w-full h-8 bg-gradient-to-r from-white to-gray-900 border rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Apply Theme</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Settings */}
            {activeTab === "ai" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your AI assistant preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>AI Model</Label>
                      <Select value={settings.aiModel} onValueChange={(value) => updateSetting("aiModel", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">Choose the AI model for content generation</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Creativity Level</Label>
                      <Select value={settings.creativityLevel} onValueChange={(value) => updateSetting("creativityLevel", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative - Safe and predictable</SelectItem>
                          <SelectItem value="balanced">Balanced - Good mix of creativity and safety</SelectItem>
                          <SelectItem value="creative">Creative - More experimental and unique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save Content</Label>
                        <p className="text-sm text-gray-500">Automatically save AI-generated content</p>
                      </div>
                      <Switch
                        checked={settings.autoSave}
                        onCheckedChange={(checked) => updateSetting("autoSave", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Suggestions</Label>
                        <p className="text-sm text-gray-500">Show AI suggestions while typing</p>
                      </div>
                      <Switch
                        checked={settings.aiSuggestions}
                        onCheckedChange={(checked) => updateSetting("aiSuggestions", checked)}
                      />
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save AI Settings</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Billing & Subscription
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Pro Plan</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">$29/month • Next billing: Jan 15, 2025</p>
                      </div>
                      <Button variant="outline" size="sm">Manage Plan</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/27</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Billing Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Invoices
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Team Billing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Advanced Settings */}
            {activeTab === "advanced" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Advanced configuration options and danger zone
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export All Data
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Import Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                    <div className="border-2 border-red-200 rounded-lg p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-red-800">Delete Account</h4>
                        <p className="text-sm text-red-600 mb-3">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
