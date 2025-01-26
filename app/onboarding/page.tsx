"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";
import { createClient } from "@/lib/supabase/client";

const steps = [
  {
    id: "username",
    title: "Choose your username",
    description: "This is how others will find you on Lcly",
    icon: Icons.user,
  },
  {
    id: "name",
    title: "What's your name?",
    description: "Let others know who you are",
    icon: Icons.userCircle,
  },
  {
    id: "avatar",
    title: "Add a photo",
    description: "Upload a profile picture",
    icon: Icons.userCircle,
  },
  {
    id: "postcode",
    title: "Where are you based?",
    description: "Enter your postcode to find your local community",
    icon: Icons.mapPin,
  },
  {
    id: "dob",
    title: "When's your birthday?",
    description: "Help us personalize your experience",
    icon: Icons.calendar,
  },
  {
    id: "invite",
    title: "Invite others",
    description: "Share Lcly with your friends and family",
    icon: Icons.users,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    display_name: "",
    bio: "",
    postcode: "",
    dob: "",
  });

  const router = useRouter();
  const supabase = createClient();
  const { profile, updateProfile, uploadAvatar } = useProfile();

  // Initialize form data from profile
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        postcode: profile.postcode || "",
        dob: profile.dob || "",
      });

      // If username exists, mark it as available since it's the user's own
      if (profile.username) {
        setUsernameAvailable(true);
      }
    }
  }, [profile]);

  const checkUsername = useDebouncedCallback(async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // If username is unchanged from profile data, it's available
    if (profile?.username === username) {
      setUsernameAvailable(true);
      return;
    }

    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
        .single();

      if (error && error.code === "PGRST116") {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }, 500);

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      setLoading(true);
      try {
        // Upload avatar if there is one
        if (avatarFile) {
          await uploadAvatar(avatarFile);
        }

        // Check if any fields have changed
        const updates: Partial<typeof formData> = {};
        (Object.keys(formData) as Array<keyof typeof formData>).forEach(
          (key) => {
            if (formData[key] !== profile?.[key]) {
              updates[key] = formData[key];
            }
          }
        );

        // Only update if there are changes
        if (Object.keys(updates).length > 0) {
          await updateProfile(updates);
        }

        router.push("/profile");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    const step = steps[currentStep].id;

    // If the value is unchanged from profile data, allow proceeding
    if (
      profile &&
      formData[step as keyof typeof formData] ===
        profile[step as keyof typeof profile]
    ) {
      return true;
    }

    switch (step) {
      case "username":
        return formData.username.length >= 3 && usernameAvailable === true;
      case "name":
        return formData.display_name.length >= 2;
      case "avatar":
        return true; // Avatar is optional
      case "postcode":
        return formData.postcode.length >= 5;
      case "dob":
        return formData.dob.length >= 8;
      case "invite":
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "username":
        return (
          <div className="space-y-4">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, username: value });
                  checkUsername(value);
                }}
                placeholder="Enter your username"
                className={
                  usernameAvailable === true
                    ? "pr-10 border-green-500"
                    : usernameAvailable === false
                    ? "pr-10 border-red-500"
                    : ""
                }
              />
              {checkingUsername && (
                <Icons.spinner className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {!checkingUsername && usernameAvailable === true && (
                <span className="absolute right-3 top-3 text-sm text-green-500">
                  {profile?.username === formData.username
                    ? "Current username"
                    : "Available"}
                </span>
              )}
              {!checkingUsername && usernameAvailable === false && (
                <span className="absolute right-3 top-3 text-sm text-red-500">
                  Taken
                </span>
              )}
            </div>
          </div>
        );
      case "name":
        return (
          <div className="space-y-4">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={formData.display_name}
              onChange={(e) =>
                setFormData({ ...formData, display_name: e.target.value })
              }
              placeholder="Enter your display name"
            />
          </div>
        );
      case "avatar":
        return (
          <div className="space-y-4">
            <Label htmlFor="avatar">Profile Picture</Label>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} className="object-cover" />
                ) : profile?.avatar ? (
                  <AvatarImage src={profile.avatar} className="object-cover" />
                ) : (
                  <AvatarFallback>
                    {formData.display_name?.[0] || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatarFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAvatarPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="max-w-[250px]"
              />
            </div>
          </div>
        );
      case "postcode":
        return (
          <div className="space-y-4">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              placeholder="Enter your postcode"
            />
          </div>
        );
      case "dob":
        return (
          <div className="space-y-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </div>
        );
      case "invite":
        return (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Share this link with your friends and family:
            </p>
            <Input
              readOnly
              value={`${window.location.origin}/invite/${formData.username}`}
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const Icon = steps[currentStep].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Lcly
          </h1>
          <p className="text-sm text-muted-foreground">
            Let's get your profile set up
          </p>
        </div>

        <div className="relative mt-8">
          <div className="w-full">
            <div className="h-1 bg-muted">
              <div
                className="h-1 bg-primary transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-8 space-y-8"
            >
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg font-medium text-center">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {steps[currentStep].description}
                </p>
              </div>

              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between space-x-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1"
            >
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
