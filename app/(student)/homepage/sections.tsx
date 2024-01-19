import useSWR from "swr";
import axios from "axios";
import { LessonCard } from "@/components/app/students/lessonCard";
import InstructorPreviewCard from "@/components/app/instructors/instructorPreviewCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Instructor({
  searchKey,
  searchAble,
}: {
  searchKey?: string;
  searchAble: boolean;
}) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "https://877611c4-e472-4a13-a4b5-d8c6da9fbb45.mock.pstmn.io/api/instructors",
    fetcher
  );
  const isEmpty = !data && isLoading == true;

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-center">
      {isLoading && <p>Loading...</p>}
      {isEmpty && <p>No instructor finded</p>}
      {!isEmpty &&
        data.map((instructor) => (
          <InstructorPreviewCard
            imageUrl={instructor.image_url}
            name={instructor.name}
            location={
              "123 Jl. Raya Merdeka, 12345, Surabaya, wiyung, Jawa Timur"
            }
            rate={instructor.rate}
            reviewerCount={instructor.reviewerCount}
          />
        ))}
    </div>
  );
}

export function Lessons({
  searchKey,
  searchAble,
  filterKey,
  filterAble,
}: {
  searchKey?: string;
  searchAble: boolean;
  filterKey?: lessonFilterKeys;
  filterAble: boolean;
}) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  var endpointUrl =
    "https://877611c4-e472-4a13-a4b5-d8c6da9fbb45.mock.pstmn.io/api/lessons";
  if (searchAble && searchKey) {
    if (!endpointUrl.includes("lessons?")) {
      endpointUrl += "?";
    }
    endpointUrl += `?search=${searchKey}`;
  }
  if (filterAble) {
    if (!endpointUrl.includes("lessons?")) {
      endpointUrl += "?";
    }
    endpointUrl += filterKey;
  }
  const { data, error, isLoading } = useSWR(endpointUrl, fetcher);
  const isEmpty = !data && isLoading == true;
  console.log("lessons", data);

  return (
    <div className="w-full max-w-full flex flex-col gap-2 items-start justify-center flex-wrap">
      {isLoading && <p>Loading...</p>}
      {isEmpty && <p>No Lesson finded</p>}
      {data &&
        data.map((lesson) => (
          <LessonCard
            name={lesson.title}
            instructorName={lesson.instructor.name}
            imageUrl={lesson.image_url}
            price={lesson.price}
            methods={lesson.method}
          />
        ))}
    </div>
  );
}

export function Suggestion({
  searchKey,
  searchAble,
  userId,
}: {
  searchKey?: string;
  searchAble: boolean;
  userId: string;
}) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `https://877611c4-e472-4a13-a4b5-d8c6da9fbb45.mock.pstmn.io/api/students/${userId}/lessons/suggestion`,
    fetcher
  );
  const isEmpty = !data && isLoading == true;
  return (
    <div className="w-full max-w-full flex flex-col gap-2 items-start justify-center flex-wrap">
      {isLoading && <p>Loading...</p>}
      {isEmpty && <p>No Lesson finded</p>}
      {data &&
        data.map((lesson) => (
          <LessonCard
            name={lesson.title}
            instructorName={lesson.instructor.name}
            imageUrl={lesson.image_url}
            price={lesson.price}
            methods={lesson.method}
          />
        ))}
    </div>
  );
}

export function Tags({
  searchKey,
  searchAble,
}: {
  searchKey?: string;
  searchAble: boolean;
}) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "https://877611c4-e472-4a13-a4b5-d8c6da9fbb45.mock.pstmn.io/api/students/filter-options",
    fetcher
  );
  const isEmpty = !data && isLoading == true;

  return (
    <div className="w-full max-w-full flex flex-col gap-2 items-start justify-center flex-wrap pt-3">
      {isLoading && <p>Loading...</p>}
      {isEmpty && <p>No lessons finded</p>}
      {!isEmpty &&
        data.tags.map((tags) => (
          <>
            <p className="text-sm font-semibold">#{tags}</p>
            <Separator className="my-0.5" />
          </>
        ))}
    </div>
  );
}

export function SearchDetail({
  handleSetSearchKey,
  handleSetIsOpenSearch,
  handleSetSearchHistory,
  searchHistory,
  isOpenSearch,
}: {
  handleSetSearchKey: (searchKey: React.SetStateAction<string>) => void;
  handleSetIsOpenSearch: (isOpenSearch: React.SetStateAction<boolean>) => void;
  handleSetSearchHistory: (
    searchHistory: React.SetStateAction<string[]>
  ) => void;
  searchHistory: string[];
  isOpenSearch: boolean;
}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <CommandDialog open={isOpenSearch} onOpenChange={handleSetIsOpenSearch}>
      <CommandInput
        onChangeCapture={(e) => setSearchValue(e.currentTarget.value)}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty
          onClick={() => {
            handleSetSearchKey(searchValue);
            handleSetIsOpenSearch(false);
            const tempsearchHistory = searchHistory;
            tempsearchHistory.push(searchValue);
            handleSetSearchHistory(tempsearchHistory);
          }}
        >
          <div className="w-full h-fit flex justify-normal items-center">
            {searchValue.length > 0 && (
              <p className="bg-accent w-full mx-3  text-start rounded-sm px-2 py-3.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                {searchValue}
              </p>
            )}
          </div>
        </CommandEmpty>
        <CommandGroup heading="Recent ⏱️">
          {searchHistory.map((searchKey) => (
            <CommandItem>
              <p
                className="w-full"
                onClick={() => {
                  handleSetSearchKey(searchKey);
                  handleSetIsOpenSearch(false);
                }}
              >
                {searchKey}
              </p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function FilterMenu({
  selectedSections,
  filterKey,
  handleSetFilterKey,
}: {
  selectedSections: string;
  filterKey?: filterKeys;
  handleSetFilterKey: (
    setFilterKey: React.SetStateAction<filterKeys | undefined>
  ) => void;
}) {
  // TODO: Make change for filterKey functionality
  return (
    <>
      {(selectedSections == "lessons" || selectedSections == "instructors") && (
        <Sheet>
          <SheetTrigger>
            <Button
              variant="outline"
              size="icon"
              className="transition duration-300 ease-in-out"
            >
              <Image
                src="/filter_icon.svg"
                alt="apple Logo"
                className="dark:invert"
                width={16}
                height={16}
                priority
              />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="pt-4">
                {selectedSections} filter
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-3" />
            {selectedSections == "lessons" && (
              <LessonFilter
                filterKey={filterKey}
                handleSetFilterKey={handleSetFilterKey}
              />
            )}
            {selectedSections == "instructors" && (
              <InstructorFilter
                filterKey={filterKey}
                handleSetFilterKey={handleSetFilterKey}
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

function LessonFilter({
  filterKey,
  handleSetFilterKey,
}: {
  filterKey?: filterKeys;
  handleSetFilterKey: (
    setFilterKey: React.SetStateAction<filterKeys | undefined>
  ) => void;
}) {
  let previousFilterKey = filterKey?.lesson;
  const [currentFilterKey, setCurrentFilterKey] = useState(previousFilterKey)

  function handleUpdateFilterMethod(key: string) {
    if (!previousFilterKey) {
      previousFilterKey = {
        isInited: true,
        method: key,
      };
    }
    const isUncheck = previousFilterKey.method?.includes(key);
    if (isUncheck) {
      previousFilterKey.method = undefined;
    }

    previousFilterKey.method = key;
  }

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "https://877611c4-e472-4a13-a4b5-d8c6da9fbb45.mock.pstmn.io/api/students/filter-options",
    fetcher
  );

  console.log(data);

  return (
    <div className="w-full h-fit flex flex-col items-start justify-center gap-2">
      <h3 className="text-secondary text-base font-semibold">Methods</h3>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={currentFilterKey?.method == "online"} 
        onClick={() => 
          { currentFilterKey?.method 
          }} 
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Online
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Offline
        </label>
      </div>
      <Separator className="mb-2" />
      <h3 className="text-secondary text-base font-semibold">Tags</h3>
      {isLoading && <p className="mt-2 font-bold text-accent">Loading...</p>}
      {data && (
        <div className="flex flex-row items-start justify-start min-w-full flex-wrap gap-1">
          {data.tags.map((tag) => (
            <Toggle
              onClick={() => {}}
              variant="outline"
              className="text-xs p-1 py-1"
            >
              #{tag}
            </Toggle>
          ))}
        </div>
      )}
      <Separator className="mb-2" />

      <h3 className="text-secondary text-base font-semibold">Start price</h3>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="price">Lesson price start</Label>
        <Input
          type="number"
          id="email"
          placeholder="Start price of the lessons"
        />
      </div>
      <Separator className="mb-2" />

      <Button onClick={() => {}}>Set the fillter</Button>
    </div>
  );
}

function InstructorFilter({
  filterKey,
  handleSetFilterKey,
}: {
  filterKey?: filterKeys;
  handleSetFilterKey: (
    setFilterKey: React.SetStateAction<filterKeys | undefined>
  ) => void;
}) {
  var  currentFilterKey = filterKey?.instructor;

  const fitstInitAddress =
    filterKey?.instructor?.address == undefined
      ? ""
      : filterKey!.instructor!.address;
  const [currentAddressInput, setCurrentAddressInput] =
    useState(fitstInitAddress);

  function handleSetAddressFilter(address: string) {
    if (!currentFilterKey && address) {
      currentFilterKey = {
        isInited: true,
        address: address,
      };
    }

    const isUncheck = currentFilterKey?.address?.includes(address);

    if (isUncheck) {
      currentFilterKey = {
        isInited: false,
        address: "",
      };
    } else {
      currentFilterKey = {
        isInited: true,
        address: address,
      };
    }
  }

  return (
    <div className="w-full h-fit flex flex-col items-start justify-center gap-2">
      <h3 className="text-secondary text-base font-semibold">Address</h3>
      <Input
        placeholder="address"
        onChange={(e) => setCurrentAddressInput(e.currentTarget.value)}
        value={currentAddressInput}
      ></Input>
      <Separator className="mb-2" />
      <button
        onClick={() => {
          handleSetAddressFilter(currentAddressInput);
          const tempInitFilterKey = filterKey;
          tempInitFilterKey!.instructor = currentFilterKey;
          handleSetFilterKey({ ...tempInitFilterKey });
        }}
      >
        Set the fillter
      </button>
    </div>
  );
}
