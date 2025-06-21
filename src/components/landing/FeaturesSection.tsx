import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FEATURES, FEATURE_CATEGORIES } from '@/constants/landing';
import { 
  Lightbulb, 
  BarChart3, 
  PenTool, 
  Search, 
  FolderOpen, 
  Zap,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  BarChart3,
  PenTool,
  Search,
  FolderOpen,
  Zap,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Everything you need to create
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {' '}amazing content
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From AI-powered ideation to intelligent content creation, we&apos;ve got all the tools 
            you need to scale your content creation workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={feature.id} className="relative group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {FEATURE_CATEGORIES[feature.category as keyof typeof FEATURE_CATEGORIES]}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
