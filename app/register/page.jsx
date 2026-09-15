import Register from "@/app/_components/Register";
import RegisterHero from "@/app/_components/Register/hero";

export default function RegistrationPage() {
  const registrationClosed = process.env.NEXT_PUBLIC_REGISTRATION_CLOSED === "true";

  return (
    <main>
      <RegisterHero />
      <div className={registrationClosed ? "relative pointer-events-none select-none" : ""}>
        <Register />
        {registrationClosed && (
          <>
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-sm" />
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
              <div className="rounded-2xl bg-white/90 px-6 py-4 text-center shadow-lg">
                <p className="text-base font-semibold text-gray-800">
                  Registrations are now closed.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
