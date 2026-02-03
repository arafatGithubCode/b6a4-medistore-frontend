import AddMedicineForm from "@/components/module/medicine/add-medicine";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) => {
  const { tab } = await searchParams;

  if (tab === "add-medicine") {
    return (
      <div className="container mx-auto py-8">
        <AddMedicineForm />
      </div>
    );
  }
};

export default Dashboard;
