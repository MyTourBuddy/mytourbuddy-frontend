import { TbSearch } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchPackages } from "@/hooks/usePackageQueries";
import { Spinner } from "../ui/spinner";

const SearchDialogBox = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading } = useSearchPackages(debouncedQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
      setOpen(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = () => {
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-xl">
          <TbSearch />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0">
        <DialogTitle className="text-lg font-semibold">
          Search Packages
        </DialogTitle>
        <DialogDescription className="sr-only">
          Search for tour packages by title or location
        </DialogDescription>

        <div className="flex flex-col gap-4">
          <InputGroup className="rounded-full shadow-md">
            <InputGroupInput
              name="search"
              placeholder="Find the best package..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="default"
                className="rounded-full"
                onClick={handleSearchSubmit}
                disabled={!searchQuery.trim()}
              >
                <TbSearch />
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {debouncedQuery && (
            <div className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-gray-500">
                  <Spinner className="size-4" />
                  Searching...
                </div>
              ) : searchResults?.length ? (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500 mb-2">
                    Found {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""}
                  </p>
                  {searchResults.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/packages/${pkg.id}`}
                      onClick={handleResultClick}
                      className="block p-3 hover:bg-gray-50 border rounded-md"
                    >
                      <div className="font-medium">{pkg.title}</div>
                      <div className="text-sm text-gray-500">
                        {pkg.location}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No packages found for &quot;{debouncedQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialogBox;
