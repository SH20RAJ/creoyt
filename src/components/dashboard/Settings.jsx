'use client'
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Bell, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
  DrawerDescription,
} from "../ui/drawer";

export default function Settings({ name = "Settings" }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [channelUrl, setChannelUrl] = useState("");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>
              Adjust your preferences and channel settings
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-6">
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
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-sm font-medium flex items-center gap-2">
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
            <div className="flex items-center justify-between">
              <label htmlFor="notifications" className="text-sm font-medium flex items-center gap-2">
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

          <DrawerFooter>
            <Button>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
