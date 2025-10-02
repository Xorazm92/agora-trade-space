"use client";
import { useForm } from "react-hook-form";
import Input from "@/app/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PasswordField from "@/app/components/molecules/PasswordField";
import { z } from "zod";
import MainLayout from "@/app/components/templates/MainLayout";
import { useSignupMutation } from "@/app/store/apis/AuthApi";
import GoogleIcon from "@/app/assets/icons/google.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import TwitterIcon from "@/app/assets/icons/twitter.png";
import Image from "next/image";
import { useTranslations } from 'next-intl';

interface InputForm {
  name: string;
  email: string;
  password: string;
}

const nameSchema = (value: string) => {
  const result = z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .safeParse(value);
  return result.success || result.error.errors[0].message;
};

const emailSchema = (value: string) => {
  const result = z.string().email("Invalid email address").safeParse(value);
  return result.success || result.error.errors[0].message;
};

const Signup = () => {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [signUp, { isLoading, error }] = useSignupMutation();
  const router = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: InputForm) => {
    try {
      await signUp(formData).unwrap();
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}`;
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            {t('sign_up')}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 text-center text-sm p-3 rounded mb-4">
              Kutilmagan xatolik yuz berdi
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder={t('full_name')}
              control={control}
              validation={{
                required: "Ism majburiy",
                validate: nameSchema,
              }}
              error={errors.name?.message}
              className="py-2.5 text-sm"
            />

            <Input
              name="email"
              type="text"
              placeholder={t('email')}
              control={control}
              validation={{
                required: "Email majburiy",
                validate: emailSchema,
              }}
              error={errors.email?.message}
              className="py-2.5 text-sm"
            />

            <PasswordField register={register} watch={watch} errors={errors} />

            <button
              type="submit"
              className={`w-full py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                isLoading ? "cursor-not-allowed bg-gray-400" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                "Hisob yaratish"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            {t('already_have_account')}{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">
              {t('sign_in')}
            </Link>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('or')}</span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              {
                provider: "google",
                icon: GoogleIcon,
                label: "Google bilan ro'yxatdan o'tish",
              },
              {
                provider: "facebook",
                icon: FacebookIcon,
                label: "Facebook bilan ro'yxatdan o'tish",
              },
              {
                provider: "twitter",
                icon: TwitterIcon,
                label: "X bilan ro'yxatdan o'tish",
              },
            ].map(({ provider, icon, label }) => (
              <button
                key={provider}
                onClick={() => handleOAuthLogin(provider)}
                className="w-full py-3 border-2 border-gray-100 bg-transparent text-black rounded-md font-medium hover:bg-gray-50
                 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Image width={20} height={20} src={icon} alt={provider} />
                {label}
              </button>
            ))}
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default Signup;
