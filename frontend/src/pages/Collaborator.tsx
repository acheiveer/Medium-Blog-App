import { useParams } from "react-router-dom";
import { useFetchCollaborators } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { Button } from "../components/Button";

function Collaborator() {
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const { loading, collaborator } = useFetchCollaborators({
    id: id || "",
  });
  if (loading || !collaborator) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-lg pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">Collaborator Manage</div>
            













          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Current Collaborators</div>
            <div className="flex flex-col">
              {collaborator.length > 0 ? (
                <ul className="space-y-2">
                  {collaborator.map((collab) => (
                    <li
                      key={collab.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:shadow-md"
                    >
                      <span className="text-gray-800">
                        {collab.user.name} ({collab.role})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No collaborators available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborator;
