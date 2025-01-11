import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import AddNewFlghtForm from "./add-flight-form";

type FlightFormProps = {
  onClose: () => void;
};

function AddFlightFormModal({ onClose }: FlightFormProps) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-2xl h-[90vh]  bg-white rounded-lg shadow-xl p-8 relative overflow-y-auto'>
        {/* Close Button */}
        <div
          className='absolute top-6 right-6 w-10 h-10 rounded-full flex justify-center items-center bg-white text-gray-800 shadow-lg hover:bg-gray-200 cursor-pointer'
          onClick={onClose}
        >
          <X size={20} />
        </div>

        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Add New Flight</CardTitle>
            <CardDescription>
              Fill up the right information to create a new flight
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddNewFlghtForm onClose={onClose} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddFlightFormModal;
