import { ClientsList } from "../../_components/ClientsList";
import Header from "../../_components/Header";

const Clients = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header onSearchChange={() => {}} />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col">
          <ClientsList />
        </div>
      </div>
    </div>
  );
};

export default Clients;
