import { Home } from "@/features/Home/Home";

export default function HomePage() {
  return (
    <div className="min-h-svh">
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Home />
        </div>
      </div>
    </div>
  );
}
