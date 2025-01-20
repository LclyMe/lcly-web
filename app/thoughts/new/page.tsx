"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThoughts } from "@/hooks/use-thoughts";
import { ThoughtEditor } from "@/components/thoughts/editor";
import { createClient } from "@/lib/supabase/client";

export default function NewThoughtPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { addThought, isAddingThought } = useThoughts();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isStoryMode, setIsStoryMode] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const uploadImages = async (files: File[]) => {
    const uploadedUrls = [];

    for (const file of files) {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase storage
      const { error } = await supabase.storage
        .from("user-images")
        .upload(filePath, file);

      if (error) throw error;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("user-images").getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSave = async (localImages: File[]) => {
    if (!content.trim()) return;

    try {
      // First, upload any local images
      const uploadedUrls =
        localImages.length > 0 ? await uploadImages(localImages) : [];

      // Get all non-local images (already uploaded ones)
      const existingImages = images.filter((url) => !url.startsWith("blob:"));

      await addThought({
        title,
        content,
        isPublic,
        images: [...existingImages, ...uploadedUrls],
        isStoryMode,
        location,
      });
      router.push("/thoughts");
    } catch (error) {
      console.error("Failed to create thought:", error);
    }
  };

  return (
    <ThoughtEditor
      title={title}
      content={content}
      isPublic={isPublic}
      isLoading={isAddingThought}
      images={images}
      isStoryMode={isStoryMode}
      location={location}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onPublicChange={setIsPublic}
      onImagesChange={setImages}
      onLocationChange={setLocation}
      onStoryModeChange={setIsStoryMode}
      onSave={handleSave}
    />
  );
}
