"use client";
import { useForm } from "react-hook-form";
import Input from "@/app/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainLayout from "@/app/components/templates/MainLayout";
import { Loader2 } from "lucide-react";
import { useSignInMutation } from "@/app/store/apis/AuthApi";
import GoogleIcon from "@/app/assets/icons/google.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import TwitterIcon from "@/app/assets/icons/twitter.png";
import Image from "next/image";
import { AUTH_API_BASE_URL } from "@/app/lib/constants/config";
import { useTranslations } from 'next-intl';

interface InputForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [signIn, { error, isLoading }] = useSignInMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: InputForm) => {
    try {
      await signIn(formData).unwrap();
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    console.log("Using AUTH API URL:", AUTH_API_BASE_URL);
    window.location.href = `${AUTH_API_BASE_URL}/auth/${provider}`;
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Inbola"
              width={60}
              height={60}
              className="h-15 w-auto"
            />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            {t('sign_in')}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 text-center text-sm p-3 rounded mb-4">
              {(error as any)?.data?.message || "Email yoki parol noto'g'ri"}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder={t('email')}
              control={control}
              validation={{ 
                required: "Email majburiy",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Noto'g'ri email format"
                }
              }}
              error={errors.email?.message}
              className="py-2.5 text-sm"
            />

            <Input
              name="password"
              type="password"
              placeholder={t('password')}
              control={control}
              validation={{
                required: "Parol majburiy",
                minLength: {
                  value: 6,
                  message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                },
              }}
              error={errors.password?.message}
              className="py-2.5 text-sm"
            />

            <Link
              href="/password-reset"
              className="block text-sm text-indigo-600 hover:underline mb-4"
            >
              {t('forgot_password')}
            </Link>

            <button
              type="submit"
              className={`w-full py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                isLoading ? "cursor-not-allowed bg-gray-400" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                t('sign_in')
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            {t('dont_have_account')}{" "}
            <Link href="/sign-up" className="text-indigo-600 hover:underline">
              {t('sign_up')}
            </Link>
          </div>

          {/* Testing Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              🧪 Testing Accounts
            </h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div>
                <strong>Superadmin:</strong> superadmin@example.com /
                password123
              </div>
              <div>
                <strong>Admin:</strong> admin@example.com / password123
              </div>
              <div>
                <strong>User:</strong> user@example.com / password123
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              These accounts have different permissions for testing various
              features.
            </p>
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
                label: "Google bilan kirish",
              },
              {
                provider: "facebook",
                icon: FacebookIcon,
                label: "Facebook bilan kirish",
              },
              {
                provider: "twitter",
                icon: TwitterIcon,
                label: "X bilan kirish",
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

export default SignIn;
