"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Baby, Sparkles, Gift } from "lucide-react";
import Image from "next/image";

const CustomLoader = () => {
  const loadingSteps = [
    { icon: Heart, text: "Bolalar uchun eng yaxshi mahsulotlar tayyorlanmoqda", delay: 0 },
    { icon: Baby, text: "Xavfsiz va sifatli o'yinchoqlar yuklanmoqda", delay: 1 },
    { icon: Sparkles, text: "Bolangiz uchun maxsus takliflar sozlanmoqda", delay: 2 },
    { icon: Gift, text: "Deyarli tayyor!", delay: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute top-1/2 left-10 w-16 h-16 bg-blue-300 rounded-full"
        />
      </div>

      {/* Main loading content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-pink-500 rounded-full opacity-20"
            />
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-pink-100 inline-block">
              <Image
                src="/logo.png"
                alt="Inbola"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full mx-auto"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 w-16 h-16 border-4 border-pink-100 rounded-full mx-auto"
            />
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Inbola'ga xush kelibsiz
          </h2>
          <p className="text-gray-600">
            Bolalar uchun eng yaxshi mahsulotlar tayyorlanmoqda
          </p>
        </motion.div>

        {/* Loading steps */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + step.delay * 0.2 }}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-pink-100"
            >
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <step.icon className="w-4 h-4 text-pink-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {step.text}
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1 + step.delay * 0.2 }}
                className="ml-auto"
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Yuklanish jarayoni
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="text-sm text-pink-600 font-semibold"
              >
                85%
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 1.5 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomLoader;
