import { X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

const Popup = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 z-50 overflow-hidden">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-black rounded-lg shadow-lg relative">
        {children}
        <Button
          variant="outline"
          className="absolute top-4 right-4 rounded-full w-8 h-8 p-0 flex items-center justify-center"
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default Popup;
