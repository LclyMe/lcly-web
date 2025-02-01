import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Mock data - in a real app this would come from an API/database
const mockPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    title: "New Coffee Shop Opening Downtown",
    content:
      "Excited to announce that 'Bean There' will be opening next week on Main Street! They'll be serving locally roasted coffee and homemade pastries.",
    timestamp: "2h",
    likes: 42,
  },
  {
    id: 2,
    author: "Mike Rodriguez",
    title: "Weekend Farmers Market Update",
    content:
      "This weekend's farmers market will feature live music from local artists and over 30 vendors! Don't miss out on fresh produce and artisanal goods.",
    timestamp: "5h",
    likes: 28,
  },
  {
    id: 3,
    author: "Emily Watson",
    title: "Community Clean-up Initiative",
    content:
      "Join us this Saturday for our monthly community clean-up event. Meeting point is Central Park at 9 AM. Gloves and bags will be provided!",
    timestamp: "1d",
    likes: 89,
  },
  // Add more mock posts as needed
];

export default function LocalPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold px-3 py-3">Your Local News</h1>

      <div className="">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="py-4 px-4 border-t border-border/50 hover:shadow-lg transition-shadow"
          >
            <div className="">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-base">{post.title}</h2>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>

              <p className="text-gray-400">{post.content}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <UserAvatar className="h-7 w-7" />
                  <span className="text-sm font-medium">{post.author}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
