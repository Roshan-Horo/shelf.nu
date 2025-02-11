import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { NODE_ENV } from "~/utils/env";
import { ErrorContent } from "./content";

export interface ErrorContentProps {
  title?: string;
  message?: string | JSX.Element;
  showReload?: boolean;
}

export const ErrorBoundryComponent = ({
  title,
  message,
}: ErrorContentProps) => {
  const error = useRouteError();
  /** 404 ERROR */
  if (isRouteErrorResponse(error))
    switch (error.status) {
      case 404:
        return (
          <ErrorContent
            title={title ? title : "Sorry, this page doesnt exist"}
            message={
              message
                ? message
                : "It may have been (re)moved or the URL you’ve entered is incorrect."
            }
            showReload={false}
          />
        );
      case 403:
        return (
          <ErrorContent
            title={title ? title : "Unauthorized."}
            message={"You don't have access to this page"}
            showReload={false}
          />
        );
    }

  /** 500 error */
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <ErrorContent
      title={title ? title : "Oops, something went wrong"}
      message={
        NODE_ENV === "development" ? (
          <pre>{errorMessage}</pre>
        ) : message ? (
          message
        ) : (
          "Please try again and if the issue persists, contact support"
        )
      }
    />
  );
};
