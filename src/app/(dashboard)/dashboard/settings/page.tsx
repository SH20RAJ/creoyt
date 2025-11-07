"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  Users,
  Zap,
  Youtube,
  Save,
  RefreshCw
} from "lucide-react";
import { useUser } from "@stackframe/stack";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  
  const [settings, setSettings] = useState({
    // Profile Settings
    displayName: user?.displayName || "",
    email: user?.primaryEmail || "",
    bio: "",
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
    aiSuggestions: true,
    
    // YouTube Settings
    youtubeChannels: [] as any[],
    defaultChannel: "",
    autoPublish: false,
    scheduleOptimization: true
  });

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "ai", label: "AI Settings", icon: Zap },
    { id: "advanced", label: "Advanced", icon: Settings }
  ];

  // Load user data and YouTube channels
  useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        displayName: user.displayName || "",
        email: user.primaryEmail || ""
      }));
      
      // Load YouTube channels
      loadYouTubeChannels();
    }
  }, [user]);

  const loadYouTubeChannels = async () => {
    try {
      const response = await fetch('/api/youtube-channels');
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({
          ...prev,
          youtubeChannels: data.channels || [],
          defaultChannel: data.channels?.[0]?.channelId || ""
        }));
      }
    } catch (error) {
      console.error('Failed to load YouTube channels:', error);
    }
  };

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: `Your ${section} settings have been updated successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-3">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-md transition-colors text-sm ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your profile information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed here</p>
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
                        <SelectItem value="UTC+5:30">India Standard Time (UTC+5:30)</SelectItem>
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
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSave('profile')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* YouTube Settings */}
          {activeTab === "youtube" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5" />
                  YouTube Integration
                </CardTitle>
                <CardDescription>
                  Manage your connected YouTube channels and publishing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Connected Channels</Label>
                      <p className="text-sm text-muted-foreground">
                        {settings.youtubeChannels.length} channel(s) connected
                      </p>
                    </div>
                    <Button variant="outline">
                      <Youtube className="w-4 h-4 mr-2" />
                      Connect Channel
                    </Button>
                  </div>

                  {settings.youtubeChannels.length > 0 && (
                    <div className="space-y-3">
                      {settings.youtubeChannels.map((channel, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                              <Youtube className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">{channel.channelName || `Channel ${index + 1}`}</p>
                              <p className="text-sm text-muted-foreground">
                                {channel.subscriberCount ? `${channel.subscriberCount} subscribers` : 'Connected'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Active</Badge>
                            <Button variant="ghost" size="sm">Disconnect</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-publish to YouTube</Label>
                        <p className="text-sm text-muted-foreground">Automatically publish content to your default channel</p>
                      </div>
                      <Switch
                        checked={settings.autoPublish}
                        onCheckedChange={(checked) => updateSetting("autoPublish", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Schedule Optimization</Label>
                        <p className="text-sm text-muted-foreground">Optimize posting times based on audience activity</p>
                      </div>
                      <Switch
                        checked={settings.scheduleOptimization}
                        onCheckedChange={(checked) => updateSetting("scheduleOptimization", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={loading}>Reset</Button>
                  <Button onClick={() => handleSave('youtube')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save YouTube Settings
                  </Button>
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
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and tips</p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => updateSetting("marketingEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Get a summary of your weekly activity</p>
                    </div>
                    <Switch
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => updateSetting("weeklyDigest", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Project Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about project milestones</p>
                    </div>
                    <Switch
                      checked={settings.projectUpdates}
                      onCheckedChange={(checked) => updateSetting("projectUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Content Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders to create and publish content</p>
                    </div>
                    <Switch
                      checked={settings.contentReminders}
                      onCheckedChange={(checked) => updateSetting("contentReminders", checked)}
                    />
                  </div>
                </div>

                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={loading}>Reset to Default</Button>
                  <Button onClick={() => handleSave('notifications')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Preferences
                  </Button>
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
                      <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve the service</p>
                    </div>
                    <Switch
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) => updateSetting("dataCollection", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analytics Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track your usage for analytics and insights</p>
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
                  <Button variant="outline" disabled={loading}>Cancel</Button>
                  <Button onClick={() => handleSave('privacy')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Settings
                  </Button>
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
                  Customize how Creaovate looks and feels
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
                          settings.theme === "light" ? "border-primary bg-primary/10" : "border-border hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="w-4 h-4" />
                          <span className="font-medium">Light</span>
                        </div>
                        <div className="w-full h-8 bg-background border rounded" />
                      </div>
                      <div
                        onClick={() => updateSetting("theme", "dark")}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          settings.theme === "dark" ? "border-primary bg-primary/10" : "border-border hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="w-4 h-4" />
                          <span className="font-medium">Dark</span>
                        </div>
                        <div className="w-full h-8 bg-slate-900 border rounded" />
                      </div>
                      <div
                        onClick={() => updateSetting("theme", "system")}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          settings.theme === "system" ? "border-primary bg-primary/10" : "border-border hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Monitor className="w-4 h-4" />
                          <span className="font-medium">System</span>
                        </div>
                        <div className="w-full h-8 bg-gradient-to-r from-background to-slate-900 border rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={loading}>Reset to Default</Button>
                  <Button onClick={() => handleSave('appearance')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Apply Theme
                  </Button>
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
                        <SelectItem value="gemini">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Choose the AI model for content generation</p>
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
                      <p className="text-sm text-muted-foreground">Automatically save AI-generated content</p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSetting("autoSave", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>AI Suggestions</Label>
                      <p className="text-sm text-muted-foreground">Show AI suggestions while typing</p>
                    </div>
                    <Switch
                      checked={settings.aiSuggestions}
                      onCheckedChange={(checked) => updateSetting("aiSuggestions", checked)}
                    />
                  </div>
                </div>

                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={loading}>Reset to Default</Button>
                  <Button onClick={() => handleSave('ai')} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save AI Settings
                  </Button>
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
                  <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                  <div className="border-2 border-destructive/20 rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground mb-3">
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
  );
}
