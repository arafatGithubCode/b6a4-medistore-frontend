import SigninForm from "@/components/module/auth/signin-form";
import Image from "next/image";

const SigninPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <SigninForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/banner.png"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="p-6 md:p-10">
        <h3>Demo Accounts</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Admin Account:</p>
            <p>Email: admin@medistore.com</p>
            <p>Password: Admin@1234</p>
          </div>
          <div>
            <p className="font-semibold">Customer Account:</p>
            <p>Email: customer@medistore.com</p>
            <p>Password: password1234</p>
          </div>
          <div>
            <p className="font-semibold">Seller Account:</p>
            <p>Email: seller@medistore.com</p>
            <p>Password: password1234</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninPage;
