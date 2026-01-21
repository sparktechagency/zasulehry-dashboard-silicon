import CustomImage from "@/share/CustomImage";

export default function ImageDetailsShow({ images, data }: any) {
  return (
    <>
      <h1 className="text-xl font-medium mb-2 mt-5">Attachments</h1>
      <div className="grid grid-cols-[40%_40%_auto] gap-3">
        <div className="grid grid-cols-3 gap-3">
          {images?.map((image: string, index: number) => (
            <CustomImage
              key={index}
              src={image}
              title="name"
              width={220}
              height={220}
              className="rounded-md object-cover"
            />
          ))}
        </div>
        <div>
          <h1 className=" font-medium">Work Overview</h1>
          <p className="text-[#555555] text-[15px]">
            {data?.overview || "No data"}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-medium">
            Salary/{data?.experiences?.salaryType || "No Type"}
          </h1>
          <p className="font-semibold text-[#0288A6]">
            ${data?.experiences?.salaryAmount || "No Amount"}
          </p>
        </div>
      </div>
    </>
  );
}
