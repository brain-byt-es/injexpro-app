import { IconBook, IconBrain, IconShieldHalf, IconTrendingUp } from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// The component now accepts a 'stats' prop
export function SectionCards({ stats }: { stats: { title: string, value: number, trend: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs">
          <CardHeader>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">{stat.trend}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}