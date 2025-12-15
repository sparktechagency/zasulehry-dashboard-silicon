import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filter({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <div className="mt-10">
            <Select>
              <SelectTrigger className="w-full xl:!h-10">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Invoice</SelectItem>
                  <SelectItem value="banana">Refund</SelectItem>
                  <SelectItem value="blueberry">Cancellation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              placeholder="Name"
              className="bg-white placeholder:text-black"
            />
          </div>

          <div>
            <Input type="date" className="bg-white" />
          </div>

          <button className="btn-design py-3 2xl:text-lg xl:py-2">Apply</button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
