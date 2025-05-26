import { useEffect, useRef, useState } from "react";
import "./FileInput.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type PreviewFile = File & { preview: string };

interface FileInputProps {
  onChange?: (files: PreviewFile[]) => void;
  limit: number;
  addButtonPadding?: string;
}

const FileInput = ({ onChange, limit, addButtonPadding }: FileInputProps) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const previewedFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    }) as PreviewFile;
    setFiles((prev) => [...prev, previewedFile]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFileDelete = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  return (
    <div className="file-input-wrapper">
      <input
        className="file-input-hidden"
        onChange={handleFileChange}
        type="file"
        ref={fileRef}
      />

      {files?.map((f, i) => (
        <div className="file-preview" key={i}>
          <div className="file-delete" onClick={() => handleFileDelete(i)}>
            <span>-</span>
          </div>
          <img className="file-image" src={f.preview} alt={`preview-${i}`} />
        </div>
      ))}

      {files?.length < limit && (
        <div
          className="file-add-button"
          style={addButtonPadding ? { padding: addButtonPadding } : undefined}
          onClick={() => fileRef.current?.click()}
        >
          <span>
            <AddPhotoAlternateIcon fontSize={"large"} />
          </span>
        </div>
      )}
    </div>
  );
};

export default FileInput;
