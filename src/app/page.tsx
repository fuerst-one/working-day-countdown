import { DateSelector } from "../components/DateSelector";
import { LegalLinks } from "../components/LegalLinks";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 sm:p-16 md:p-24">
      <h1 className="mt-auto text-6xl font-bold">Working Day Countdown</h1>
      <DateSelector />
      <LegalLinks className="mt-auto mb-0" />
    </main>
  );
}
