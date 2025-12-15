"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/share/Button";

type JobCategory = {
  id: number;
  title: string;
  jobs: string[];
};

const jobCategoriesInitial: JobCategory[] = [
  // {
  //   id: 1,
  //   title: "1. Construction",
  //   jobs: [
  //     "Bricklaying",
  //     "Carpentry & Joinery",
  //     "Electrical Work",
  //     "Plumbing & Heating",
  //     "General Labourer",
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "2. Cleaning",
  //   jobs: [
  //     "Bricklaying",
  //     "Carpentry & Joinery",
  //     "Electrical Work",
  //     "Plumbing & Heating",
  //     "General Labourer",
  //   ],
  // },
  {
    id: 3,
    title: "Sub Category",
    jobs: [
      "Bricklaying",
      "Carpentry & Joinery",
      "Electrical Work",
      "Plumbing & Heating",
      "General Labourer",
    ],
  },
];

export function SubCategoryEdit({
  title,
  trigger,
}: {
  title?: string;
  trigger: React.ReactNode;
}) {
  const [inputFields, setInputFields] =
    useState<JobCategory[]>(jobCategoriesInitial);

  // Handle job name change in a given category and job index
  const handleJobChange = (
    categoryIndex: number,
    jobIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...inputFields];
    updatedFields[categoryIndex].jobs[jobIndex] = event.target.value;
    setInputFields(updatedFields);
  };

  // Add new job to a given category
  const handleAddJob = (categoryIndex: number) => {
    const updatedFields = [...inputFields];
    updatedFields[categoryIndex].jobs.push(""); // add empty job
    setInputFields(updatedFields);
  };

  // Remove a job from a given category
  const handleRemoveJob = (categoryIndex: number, jobIndex: number) => {
    const updatedFields = [...inputFields];
    updatedFields[categoryIndex].jobs.splice(jobIndex, 1);
    setInputFields(updatedFields);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="2xl:text-lg" htmlFor="name-1">
                Category Name
              </Label>
              <Input
                name="name"
                className="bg-white xl:!text-[14px]"
                defaultValue="Construction"
              />
            </div>
            {title && (
              <div className="grid gap-3">
                {inputFields.map((category, categoryIndex) => (
                  <div key={category.id}>
                    <section className="flex justify-between items-center">
                      <Label className="2xl:text-lg">{category.title}</Label>
                      <button
                        type="button"
                        onClick={() => handleAddJob(categoryIndex)}
                        className="text-green-500 hover:text-green-700"
                        aria-label={`Add job to ${category.title}`}
                      >
                        <Plus />
                      </button>
                    </section>

                    <section className="flex flex-col gap-2 mt-2">
                      {category.jobs.map((job, jobIndex) => (
                        <section
                          className="flex items-center gap-2"
                          key={jobIndex}
                        >
                          <Input
                            type="text"
                            value={job}
                            onChange={(e) =>
                              handleJobChange(categoryIndex, jobIndex, e)
                            }
                            className="flex-1 bg-white xl:!text-[14px]"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveJob(categoryIndex, jobIndex)
                            }
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            aria-label={`Remove job ${job}`}
                          >
                            <Minus />
                          </button>
                        </section>
                      ))}
                    </section>
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="mt-6">
            <DialogFooter className="mt-1">
              <Button
                className="btn-design px-6 w-full 2xl:text-lg"
                type="submit"
              >
                Publish
              </Button>
            </DialogFooter>
          </section>
        </DialogContent>
      </form>
    </Dialog>
  );
}
