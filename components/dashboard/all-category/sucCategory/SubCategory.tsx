import { SquarePen } from "lucide-react";
import CategoryHeader from "../CategoryHeader";
import { SubCategoryEdit } from "./SubCategoryEdit";

const jobCategories = [
  {
    id: 1,
    title: "1. Construction",
    jobs: [
      "Bricklaying",
      "Carpentry & Joinery",
      "Electrical Work",
      "Plumbing & Heating",
      "General Labourer",
    ],
  },
  {
    id: 2,
    title: "2. Cleaning",
    jobs: [
      "Bricklaying",
      "Carpentry & Joinery",
      "Electrical Work",
      "Plumbing & Heating",
      "General Labourer",
    ],
  },
  {
    id: 3,
    title: "3. Events & Hospitality",
    jobs: [
      "Bricklaying",
      "Carpentry & Joinery",
      "Electrical Work",
      "Plumbing & Heating",
      "General Labourer",
    ],
  },
];

export default function SubCategory({}) {
  return (
    <section className="px-6">
      <CategoryHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-md bg-white shadow-xl py-5 px-6 ">
        {jobCategories.map((category, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-sm shadow bg-gray-100 h-80"
          >
            {/* Title with edit icon */}
            <div className="flex items-center justify-between p-2">
              <h2 className="font-semibold text-gray-800 2xl:text-lg">
                {category.title}
              </h2>
              <div>
                <SubCategoryEdit
                  title="Edit Category"
                  trigger={
                    <button className="btn-design p-2 cursor-pointer">
                      <SquarePen className="w-4 h-4" />
                    </button>
                  }
                />
              </div>
            </div>
            <hr className="border-gray-400" />

            {/* Job list */}
            <div className="p-5">
              <ul className="list-disc pl-4 space-y-1 text-md">
                {category.jobs.map((job, i) => (
                  <li
                    key={i}
                    className="text-gray-700 text-[12px] 2xl:text-[16px]"
                  >
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
