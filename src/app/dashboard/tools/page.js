import ExternalToolList from "@/components/dashboard/ExternalToolList";
import ToolList1 from "@/components/dashboard/tools/ToolList1";

export default function ToolsPage() {
  return (
    <section className="w-full   min-h-[80vh] flex justify-center flex-col items-center mx-auto">
      <h1 className="text-4xl md:text-6xl mt-4 font-bold mb-8 text-center text-white tracking-tight">
        Creo<span className=" text-fuchsia-400">YT</span> <span className=" underline decoration-wavy decoration-fuchsia-400"> Tools</span>
      </h1>
      <ToolList1 />

      <ExternalToolList />
    </section>
  );
}
