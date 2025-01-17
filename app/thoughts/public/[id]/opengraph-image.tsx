import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Thought Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("id", Number(id))
    .eq("is_public", true)
    .single();

  if (!thought) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: "bold" }}>
            Thought not found
          </div>
        </div>
      )
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          padding: "60px",
        }}
      >
        {/* Header with author and website */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 32 }}></span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#666",
            }}
          >
            lcly.me
          </span>
        </div>

        {/* Title and Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              textAlign: "center",
              maxWidth: "900px",
              backgroundColor: "#f4f4f4",
              padding: "20px 40px",
              borderRadius: "10px",
            }}
          >
            {thought.title || "Untitled Thought"}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#666",
              fontWeight: 300,
              textAlign: "center",
              maxWidth: "800px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {format(new Date(thought.created_at), "MMMM d, yyyy")}
          </div>
        </div>
      </div>
    )
  );
}
