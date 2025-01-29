import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const communityTypes = [
  { value: "all", label: "All" },
  { value: "county", label: "Counties" },
  { value: "city", label: "Cities" },
  { value: "town", label: "Towns" },
  { value: "village", label: "Villages" },
] as const;

type CommunityType = (typeof communityTypes)[number]["value"];

interface CommunityFiltersProps {
  onSearch: (search: string) => void;
  onTypeChange: (type: CommunityType) => void;
}

export function CommunityFilters({
  onSearch,
  onTypeChange,
}: CommunityFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        defaultValue="all"
        className="w-full sm:w-auto"
        onValueChange={(value) => onTypeChange(value as CommunityType)}
      >
        <TabsList className="grid w-full grid-cols-5">
          {communityTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
