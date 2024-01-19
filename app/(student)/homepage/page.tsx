"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { SearchNav } from "./searchNav";
import { Navbar } from "@/components/app/students/navbar";
import { Tags, Lessons, Instructor, Suggestion, SearchDetail, FilterMenu } from "./sections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import axios from "axios";

export default function HomePage({ userId }: { userId: string }) {
  const [selectedSection, setSelectedSection] = useState("suggestions");
  const [searchKey, setSearchKey] = useState("");
  const [filterKey, setFilterKey] = useState<filterKeys>();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/api/current-user", fetcher);

  function resetState() {
    setSearchKey("");
    setSearchHistory([]);
    setFilterKey({});
  }
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpenSearch((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  console.log(["searchkey", filterKey]);
  
  return (
    <div className="pt-14 flex flex-col w-screen items-start gap-2 px-2">
      <Navbar />
      <div className="w-full h-fit flex flex-row items-center justify-between gap-2">
        <Input
          value={searchKey}
          onClick={() => {
            setIsOpenSearch(true);
          }}
          className="rounded-2xl"
          placeholder={"🔍 search"}
        />
        <SearchDetail 
        handleSetIsOpenSearch={setIsOpenSearch} 
        handleSetSearchHistory={setSearchHistory}
        handleSetSearchKey={setSearchKey}
        searchHistory={searchHistory}
        isOpenSearch={isOpenSearch}
        />

        {/* Sheet components */}
        <FilterMenu 
        selectedSections={selectedSection}
        filterKey={filterKey}
        handleSetFilterKey={setFilterKey}
         />
      </div>
      <div className="w-full flex flex-col justify-center">
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="px-3 w-full overflow-x-scroll no-scrollbar flex flex-row justify-start ">
            <TabsTrigger
              onClick={() => {
                setSelectedSection("suggestions");
                selectedSection != "suggestions" && resetState()
              }}
              value="suggestions"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSelectedSection("lessons");
                resetState()
              }}
              value="lessons"
            >
              Lessons
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSelectedSection("instructors");
                selectedSection != "instructors" && resetState()
              }}
              value="instructors"
            >
              Instructors
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSelectedSection("tags");
                resetState()
              }}
              value="tags"
            >
              Tags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <Lessons
              filterAble={selectedSection == "lessons" && filterKey?.lesson != undefined}
              filterKey={filterKey?.lesson}
              searchKey={searchKey}
              searchAble={selectedSection == "lessons"}
            />
          </TabsContent>
          <TabsContent value="suggestions">
            {isLoading && <p>Loading...</p>}
            {data && (
              <Suggestion
                userId={data.user.uid}
                searchKey={searchKey}
                searchAble={selectedSection == "suggestions"}
              />
            )}
          </TabsContent>
          <TabsContent value="instructors">
            <Instructor
              searchKey={searchKey}
              searchAble={selectedSection == "instructors"}
            />
          </TabsContent>
          <TabsContent value="tags">
            <Tags
              searchKey={searchKey}
              searchAble={selectedSection == "tags"}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


