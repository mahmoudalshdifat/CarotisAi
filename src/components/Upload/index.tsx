// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – Image Upload Component with Drag & Drop
// ──────────────────────────────────────────────────────────────────────────────

import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { Upload, ImagePlus, X, AlertCircle } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Button, Alert } from '../UI';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ACCEPTED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png':  ['.png'],
  'image/webp': ['.webp'],
  'image/bmp':  ['.bmp'],
};

interface Props {
  onImageSelected: (file: File, previewUrl: string) => void;
  selectedFile:    File | null;
  previewUrl:      string | null;
  onClear:         () => void;
  disabled?:       boolean;
}

export default function ImageUpload({ onImageSelected, selectedFile, previewUrl, onClear, disabled = false }: Props) {
  const { t } = useApp();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const code = rejectedFiles[0].errors[0].code;
      if (code === 'file-too-large')   setError(`File too large. Maximum size is 20 MB.`);
      else if (code === 'file-invalid-type') setError('Invalid file type. Please upload JPEG, PNG, WebP, or BMP.');
      else setError('Could not upload file. Please try again.');
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const url  = URL.createObjectURL(file);
    onImageSelected(file, url);
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled,
  });

  // ── Preview Mode ─────────────────────────────────────────────────────────────
  if (selectedFile && previewUrl) {
    return (
      <div className="space-y-3">
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group">
          <img
            src={previewUrl}
            alt="Carotid ultrasound preview"
            className="w-full object-contain max-h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={onClear}
            disabled={disabled}
            className="absolute top-3 right-3 bg-slate-800/90 hover:bg-red-800 text-slate-200 rounded-full p-1.5 transition-colors disabled:opacity-50"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-slate-300 truncate">{selectedFile.name}</p>
            <p className="text-[10px] text-slate-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · {selectedFile.type}
            </p>
          </div>
        </div>

        <button
          onClick={onClear}
          disabled={disabled}
          className="text-xs text-slate-400 hover:text-sky-400 underline underline-offset-2 transition-colors disabled:opacity-50"
        >
          {t('upload_change')}
        </button>
      </div>
    );
  }

  // ── Drop Zone ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center gap-4
          border-2 border-dashed rounded-2xl p-10 text-center
          transition-all duration-200 cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isDragActive
            ? 'border-sky-500 bg-sky-950/30 scale-[1.01]'
            : 'border-slate-700 bg-slate-900/50 hover:border-sky-600/60 hover:bg-slate-900'
          }
        `}
      >
        <input {...getInputProps()} />

        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragActive ? 'bg-sky-600' : 'bg-slate-800'}`}>
          {isDragActive ? (
            <Upload className="w-8 h-8 text-white" />
          ) : (
            <ImagePlus className="w-8 h-8 text-slate-400" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-200">
            {isDragActive ? 'Drop image here…' : t('upload_subtitle')}
          </p>
          <p className="text-xs text-slate-500 mt-1">{t('upload_hint')}</p>
        </div>

        <Button variant="outline" size="sm" disabled={disabled}>
          Browse file
        </Button>
      </div>

      {error && (
        <Alert variant="danger">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        </Alert>
      )}
    </div>
  );
}
