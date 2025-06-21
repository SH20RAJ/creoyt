'use client'
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Bell, Moon, Settings as SettingsIcon, Save, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedCard } from "../ui/animated-components";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../ui/dialog";

export default function Settings({ name = "Settings" }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [channelUrl, setChannelUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // Save settings logic here
    setIsOpen(false);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-primary" />
          {name}
        </h2>
      </div>

      <AnimatedCard className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Quick Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your preferences and channel configuration
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Channel URL */}
            <div className="space-y-2">
              <label htmlFor="channel" className="text-sm font-medium">
                Channel URL
              </label>
              <Input
                id="channel"
                placeholder="Enter your YouTube channel URL"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* Settings Toggles */}
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-accent/10 hover:bg-accent/20 transition-colors">
                <label htmlFor="dark-mode" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  Dark Mode
                </label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-accent/10 hover:bg-accent/20 transition-colors">
                <label htmlFor="notifications" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  Notifications
                </label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Advanced Settings
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Advanced Settings</DialogTitle>
                  <DialogDescription>
                    Configure advanced preferences and integrations
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Keys</label>
                    <Input placeholder="Enter your API key" type="password" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input placeholder="https://your-webhook.com" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">Auto-save drafts</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </AnimatedCard>
    </section>
  );
}
