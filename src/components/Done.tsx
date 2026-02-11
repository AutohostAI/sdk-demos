/**
 * Done — Registration Completion Screen
 *
 * Shown after the guest finishes all verification steps (personal info,
 * usage agreement, and IDV). Displays a simple success message.
 */
import { MountainIcon } from "./ui/MountainIcon";

export function Done() {
  return (
    <div className="mx-4 my-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
      <MountainIcon className="h-36 w-36 text-gray-900 dark:text-gray-50" />
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
          Congratulations!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          You have successfully completed guest registration. We can't wait to
          see you!
        </p>
      </div>
    </div>
  );
}
