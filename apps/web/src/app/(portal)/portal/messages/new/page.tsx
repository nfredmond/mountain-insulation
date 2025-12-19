import { NewMessageForm } from "./ui";

export const metadata = {
  title: "New message",
};

export default function NewMessagePage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight text-primary">
        New message
      </h1>
      <p className="mt-2 text-sm text-primary/70">
        Send a message to the team. We’ll reply here in the portal.
      </p>
      <div className="mt-8 max-w-2xl">
        <NewMessageForm />
      </div>
    </div>
  );
}

