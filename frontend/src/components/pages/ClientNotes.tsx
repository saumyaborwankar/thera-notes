import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { PageContent } from "../atoms/PageContent";
import { useParams } from "react-router-dom";
import { Note } from "@saumyaborwankar/thera-notes-api";
import { Button, theme, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FileTextOutlined } from "@ant-design/icons";
import { NoteCard } from "../atoms/NoteCard";

export const ClientNotes = () => {
  const { clientId } = useParams();

  const notes = useAppSelector((state) => state.notes);
  const clients = useAppSelector((state) => state.clients);
  const currentClient = clients.find((p) => p.id === clientId);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [currentNote, setCurrentNote] = useState<Note>();
  useEffect(() => {
    const noteExist = notes.find((p) => p.clientId === clientId);

    if (noteExist) {
      setCurrentNote(noteExist);
    }
  }, [notes]);
  return (
    <div className="flex min-h-[40vh]">
      {/* ------------------- NOTES -------------------- */}
      <div
        style={{
          padding: 24,
          width: "50vw",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginRight: "20px",
        }}
      >
        <Typography.Title level={4}>Notes</Typography.Title>
        <NoteCard />
      </div>

      {/* ------------------- PROFILE -------------------- */}
      <div
        style={{
          padding: 24,
          width: "30vw",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="flex-column">
          <div>
            {" "}
            <Typography.Title level={4} style={{ marginBottom: "20px" }}>
              Client Information
            </Typography.Title>
            <div className="bg-white overflow-auto shadow rounded-lg border">
              {/* <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Client Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
            </p>
          </div> */}
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentClient?.firstName} {currentClient?.lastName}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentClient?.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentClient?.phoneNumber}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentClient?.address}
                      {/* <br />
                  Anytown, USA 12345 */}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* <div>
            <Typography.Title level={5} style={{ marginTop: "20px" }}>
              Additional notes
            </Typography.Title>
            <TextArea rows={4} />
          </div> */}
        </div>
      </div>
    </div>
  );
};
