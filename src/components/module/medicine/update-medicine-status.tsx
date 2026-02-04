import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicineStatus } from "@/types/medicine-type";

const UpdateMedicineStatus = ({ status }: { status: MedicineStatus }) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-45">
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UpdateMedicineStatus;
