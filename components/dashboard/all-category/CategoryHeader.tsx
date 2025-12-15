import { PlusCircle } from "lucide-react";
import { AddCategory } from "./category/AddCategory";
import { SubCategoryEdit } from "./sucCategory/SubCategoryEdit";

export default function CategoryHeader() {
  return (
    <>
      <div className="flex items-center justify-end my-4 gap-4">
        <SubCategoryEdit
          title="Sub Category"
          trigger={
            <button className="flex items-center gap-1 btn-design px-4 h-10 rounded-3xl text-xl  transition cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              <span className="text-[12px] 2xl:text-lg">Add Category</span>
            </button>
          }
        />
      </div>
    </>
  );
}
