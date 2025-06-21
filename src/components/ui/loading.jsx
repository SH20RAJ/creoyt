"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ size = "default", className, ...props }) {
    return (
        <div
            className={cn(
                "animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary",
                size === "sm" && "h-4 w-4",
                size === "default" && "h-6 w-6",
                size === "lg" && "h-8 w-8",
                className
            )}
            {...props}
        />
    );
}

export function LoadingCard({ className }) {
    return (
        <div className={cn("animate-pulse", className)}>
            <div className="bg-muted rounded-xl p-6 space-y-4">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
            </div>
        </div>
    );
}

export function LoadingDots({ className }) {
    return (
        <div className={cn("flex space-x-1", className)}>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
    );
}
