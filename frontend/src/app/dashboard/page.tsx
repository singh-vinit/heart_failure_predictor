"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LogoutButton from "@/components/LogoutButton";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import MedicalForm from "@/components/MedicalForm";
import { CircleUser } from "lucide-react";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/signin");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-100">
      <div className="flex items-center justify-between bg-white px-6 py-4">
        <div className="flex items-center space-x-2">
          <CircleUser className="h-6 w-6 text-rose-500" />
          <h1 className="text-[1rem] font-medium text-rose-500">{user.email}</h1>
        </div>
        <LogoutButton />
      </div>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-rose-500 to-red-500 p-6 rounded-full shadow-2xl"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Heart Failure
              <span className="bg-gradient-to-r from-rose-500 to-red-500 bg-clip-text text-transparent">
                {" "}
                Risk Predictor
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto capitalize"
            >
              Enter your medical information below to assess your cardiovascular
              health risk. All data is processed securely and confidentially.
            </motion.p>
          </motion.div>
        </motion.div>
        {/* Medical Form Section */}
        <MedicalForm userId={user.id} />
      </div>
    </div>
  );
}
