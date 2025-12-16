import { SquarePen } from "lucide-react";
import CategoryHeader from "../CategoryHeader";
import { SubCategoryEdit } from "./SubCategoryEdit";
import { myFetch } from "@/utils/myFetch";
import DeleteCategory from "./DeleteCategory";

export default async function SubCategory({}) {
  const res = await myFetch("/categories", {
    tags: ["categories"],
  });
  return (
    <section className="px-6">
      <CategoryHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-md bg-white shadow-xl py-5 px-6 ">
        {res?.data?.map((category: any, index: number) => (
          <div
            key={index}
            className="border border-gray-400 rounded-sm shadow bg-gray-100 h-80"
          >
            {/* Title with edit icon */}
            <div className="flex items-center justify-between p-2">
              <h2 className="font-semibold text-gray-800 2xl:text-lg">
                {category.name}
              </h2>
              <div className="flex items-center gap-4">
                <DeleteCategory id={category?._id} />
                <SubCategoryEdit
                  title="Edit Category"
                  category={category}
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
                {category?.subCategories?.map((job: any, i: number) => (
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
