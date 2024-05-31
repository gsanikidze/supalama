import ModelOptions from "@/components/ModelOptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function WorkflowBuilder() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Workflow Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="name">
            Name
          </Label>
          <Input id="name" className="my-2" />
          <Label htmlFor="description">
            Description
          </Label>
          <Textarea id="description" className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Model Options</CardTitle>
        </CardHeader>
        <CardContent>
          <ModelOptions />
        </CardContent>
      </Card>
    </div>
  )
}
