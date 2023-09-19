const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-700">
      <main className="flex min-h-full justify-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
