
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-[#AFA3FF] to-[#FFFFFF]">{children}</div>
    </>
  );
}
