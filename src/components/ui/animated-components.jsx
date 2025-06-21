"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedCard({
    children,
    className,
    hover = true,
    gradient = false,
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "bg-card border border-border rounded-xl p-6 shadow-sm transition-all duration-300",
                gradient && "bg-gradient-to-br from-card to-accent/5",
                hover && "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
                isHovered && "scale-[1.02]",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {children}
        </div>
    );
}

export function AnimatedButton({
    children,
    variant = "default",
    size = "default",
    className,
    ...props
}) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "active:scale-95",
                variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
                variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
                size === "default" && "h-10 px-4 py-2",
                size === "sm" && "h-8 px-3 text-sm",
                size === "lg" && "h-12 px-8",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export function StatCard({ title, value, change, icon: Icon, trend = "up" }) {
    return (
        <AnimatedCard className="relative overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {change && (
                        <p className={cn(
                            "text-xs flex items-center gap-1",
                            trend === "up" ? "text-green-600" : "text-red-600"
                        )}>
                            <span className={cn(
                                "inline-block w-2 h-2 rounded-full",
                                trend === "up" ? "bg-green-500" : "bg-red-500"
                            )} />
                            {change}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                )}
            </div>
        </AnimatedCard>
    );
}
