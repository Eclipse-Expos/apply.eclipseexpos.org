/**
 * Success Message for the input section
 * @returns JSX.Element
 */
export default function SuccessMessage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
      <h1 className="text-4xl font-black tracking-wide text-primary">
        Thanks for registering!
      </h1>
      <p className="mt-1 text-primary">Let&#39;s break some records.</p>
    </div>
  );
}
