import { fetchCategory } from "@/services/fetchCategory";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const categories = await fetchCategory();
export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search category..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" className="no-scrollbar">
          {categories.map((category: any) => (
            <CommandItem key={category.id}>{category}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
