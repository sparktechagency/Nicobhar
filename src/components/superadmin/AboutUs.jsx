import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS
import {
  useCreateSettingMutation,
  useGetSettingQuery,
} from "../../redux/features/settings/settingsApi";

const AboutUs = () => {
  const [text, setText] = useState("");
  const {
    data: aboutUs,
    isLoading,
    refetch,
  } = useGetSettingQuery({ type: "About Us" });
  const [createSetting] = useCreateSettingMutation();
  useEffect(() => {
    if (!isLoading) {
      setText(aboutUs?.message?.description);
    }
  }, []);
  if (isLoading) {
    return <>Loading...</>;
  }
  console.log(aboutUs);

  // Save button click handler
  const handleSave = async () => {
    try {
      const response = await createSetting({
        type: "About Us",
        description: text,
      });
      console.log(response);
      refetch();
    } catch (error) {
      console.error(error);
      return;
    }
    alert("Text saved successfully!");
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">About Us updated</h1>
        <Editor
          placeholder="Type here..."
          value={text}
          onTextChange={(e) => setText(e.htmlValue)}
          style={{ height: "320px" }}
        />
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-secondary text-[16px] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-semibold mt-4 border-b pb-4">
          About Us Details
        </h1>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: aboutUs?.message?.description || "",
          }}
        ></div>
      </div>
    </>
  );
};

export default AboutUs;
