import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewHomePage() { // Renamed to avoid conflict for now
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page!</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Shadcn UI Showcase</CardTitle>
          <CardDescription>Here are a few components:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <Button>Submit</Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">This is a simple card example.</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NewHomePage; // Exporting renamed component 