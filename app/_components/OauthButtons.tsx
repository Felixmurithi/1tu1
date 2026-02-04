"use client";

import { oauthSignin } from "@/app/_lib/actions/auth";
import { OAUTH_PROVIDERS } from "@/app/_lib/constants/auth";

function OauthButtons() {
  return (
    <div className="flex flex-col gap-4">
      {OAUTH_PROVIDERS.map((provider) => {
        return (
          <button
            onClick={() => oauthSignin(provider)}
            key={provider}
            className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
          >
            <img
              src="https://authjs.dev/img/providers/google.svg"
              alt={`${provider} logo`}
              height="24"
              width="24"
            />
            <span>
              Continue with{" "}
              {provider.charAt(0).toUpperCase() + provider.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default OauthButtons;
