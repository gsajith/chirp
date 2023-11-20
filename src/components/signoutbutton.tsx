import { SignOutButton, useUser } from "@clerk/nextjs";

export const SignOut = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded || !isSignedIn) return <></>;

  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, padding: "1rem" }}>
      <SignOutButton />
    </div>
  );
};
