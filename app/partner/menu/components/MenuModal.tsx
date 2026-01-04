"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { MenuModalProps } from "./types";

export default function MenuModal({
  showModal,
  editingId,
  formData,
  onClose,
  onSave,
  onFormChange,
}: MenuModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!showModal) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreviewImage(base64);
      onFormChange("image", file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onFormChange("image", "");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTriggerFileInput = () => fileInputRef.current?.click();

  const imageSrc =
    typeof formData.image === "string"
      ? formData.image
      : previewImage || "/placeholder.svg";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            {editingId ? "Ubah Item Menu" : "Tambah Item Menu"}
          </h2>

          {/* Upload Section */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-foreground mb-2 sm:mb-3">
              Foto Item
            </label>

            {previewImage || formData.image ? (
              <div className="relative">
                <div className="relative w-full h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleTriggerFileInput}
                  className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition text-sm sm:text-base"
                >
                  Ganti Foto
                </button>
              </div>
            ) : (
              <div
                onClick={handleTriggerFileInput}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-primary transition"
              >
                <Upload size={24} className="mx-auto text-gray-400 mb-2 sm:mb-3" />
                <p className="font-medium text-foreground mb-1 text-sm sm:text-base">
                  Upload Foto Item
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Klik untuk memilih file
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                Nama Item
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormChange("description", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  onFormChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => onFormChange("category", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="makanan">Makanan</option>
                <option value="snack">Snack</option>
                <option value="minuman">Minuman</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 sm:gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-foreground py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Batal
            </button>
            <button
              onClick={onSave}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base"
            >
              {editingId ? "Perbarui" : "Tambah"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}