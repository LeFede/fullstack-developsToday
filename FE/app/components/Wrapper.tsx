import { ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full flex p-4 py-10 min-h-screen">
      <div className="container mx-auto relative max-w-[1100px]">
        {children}
      </div>
    </section>
  );
};
