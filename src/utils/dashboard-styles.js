// Dashboard utility classes for consistent styling
export const cardStyles = {
    base: "bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200",
    interactive: "cursor-pointer hover:border-primary/20 hover:bg-accent/5",
    gradient: "bg-gradient-to-br from-card to-accent/5"
};

export const buttonStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200",
    ghost: "hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
};

export const textStyles = {
    heading: "font-semibold tracking-tight",
    muted: "text-muted-foreground text-sm",
    body: "text-foreground"
};

export const animationStyles = {
    fadeIn: "animate-in fade-in-0 duration-300",
    slideIn: "animate-in slide-in-from-bottom-4 duration-300",
    scaleIn: "animate-in zoom-in-95 duration-200"
};
