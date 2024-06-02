import React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";

const LoadingButton = ({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
}) => {
  return (
    <Button disabled={isLoading} type="submit" className="w-full">
      {isLoading && <Loader2 className="animate-spin mr-2" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
