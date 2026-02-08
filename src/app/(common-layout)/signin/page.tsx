import SigninForm from "@/components/module/auth/signin-form";
import Image from "next/image";

const SigninPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative">
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
      <div className="p-6 md:p-10 absolute bottom-0 left-0 w-full bg-linear-to-t from-background via-background/95 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Demo Accounts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <p className="font-bold text-lg text-primary">Admin</p>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs break-all">
                    admin@medistore.com
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Password</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs">
                    Admin@1234
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                  Customer
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs break-all">
                    customer@medistore.com
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Password</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs">
                    password1234
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-xl">🏪</span>
                </div>
                <p className="font-bold text-lg text-green-600 dark:text-green-400">
                  Seller
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs break-all">
                    seller@medistore.com
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Password</p>
                  <p className="font-mono bg-muted/50 px-3 py-1.5 rounded text-xs">
                    password1234
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninPage;
